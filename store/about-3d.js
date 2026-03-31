import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

const canvas = document.getElementById('hero-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 2000);
camera.position.set(0, 125, 250); // Moved camera closer by ~20% (150->125, 300->250)
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

const rgbeLoader = new RGBELoader();
rgbeLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/equirectangular/royal_esplanade_1k.hdr', function(texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
});

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// Object holders
let modelLoaded = false;

gltfLoader.load('images/Train Case & Hub Animation.glb', (gltf) => {
  const model = gltf.scene;
  model.scale.set(1000, 1000, 1000);
  model.updateMatrixWorld(true);

  // Center and scale model
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);


  // Model parts mapping (based on material/geometry analysis)
  // 0: Ties (Chocolate Brown, 1408 verts)
  // 1: Train (Detailed, 246368 verts)
  // 2: Rails (Simple track, 2670 verts)
  // 3: Hub (Black, 13557 verts)
  const tiesMesh = model.children[0];
  let trainMesh = model.children[1];
  const railsMesh = model.children[2];
  const hubMesh = model.children[3];

  // Helper to split a merged mesh into separate component meshes
  function splitMeshIntoSeparateMeshes(mesh) {
    const geom = mesh.geometry;
    const positions = geom.attributes.position.array;
    const normals = geom.attributes.normal ? geom.attributes.normal.array : null;
    const indices = geom.index.array;

    const numVerts = geom.attributes.position.count;
    const adj = new Array(numVerts).fill(null).map(() => []);

    for(let i=0; i<indices.length; i+=3) {
       const a = indices[i], b = indices[i+1], c = indices[i+2];
       adj[a].push(b, c); adj[b].push(a, c); adj[c].push(a, b);
    }

    const visited = new Uint8Array(numVerts);
    const components = [];

    for(let i=0; i<numVerts; i++) {
       if(!visited[i]) {
          const compVerts = new Set([i]);
          const q = [i];
          visited[i] = 1;

          while(q.length > 0) {
             const curr = q.pop();
             const neighbors = adj[curr];
             for(let j=0; j<neighbors.length; j++) {
                const n = neighbors[j];
                if(!visited[n]) {
                   visited[n] = 1;
                   compVerts.add(n);
                   q.push(n);
                }
             }
          }
          components.push(compVerts);
       }
    }

    const meshes = [];
    components.forEach(comp => {
        const vMap = new Map();
        const newPos = [];
        const newNorm = [];
        let newIdxCounter = 0;

        comp.forEach(oldIdx => {
            vMap.set(oldIdx, newIdxCounter++);
            newPos.push(positions[oldIdx*3], positions[oldIdx*3+1], positions[oldIdx*3+2]);
            if (normals) newNorm.push(normals[oldIdx*3], normals[oldIdx*3+1], normals[oldIdx*3+2]);
        });

        const newIndices = [];
        for(let i=0; i<indices.length; i+=3) {
            const a = indices[i], b = indices[i+1], c = indices[i+2];
            if(comp.has(a)) {
                newIndices.push(vMap.get(a), vMap.get(b), vMap.get(c));
            }
        }

        const newGeom = new THREE.BufferGeometry();
        newGeom.setAttribute('position', new THREE.Float32BufferAttribute(newPos, 3));
        if (normals) newGeom.setAttribute('normal', new THREE.Float32BufferAttribute(newNorm, 3));
        newGeom.setIndex(newIndices);

        const newMesh = new THREE.Mesh(newGeom, mesh.material.clone());

        newGeom.computeBoundingBox();
        const center = newGeom.boundingBox.getCenter(new THREE.Vector3());
        newGeom.translate(-center.x, -center.y, -center.z);
        newMesh.position.copy(center);
        // The new position is relative to its current local space (which is attached to model)

        meshes.push(newMesh);
    });
    return meshes;
  }

  // Split the ties mesh into 288 individual bodies
  const bodies = splitMeshIntoSeparateMeshes(tiesMesh);
  tiesMesh.removeFromParent();
  tiesMesh.geometry.dispose();

  // Re-add separated bodies to the model
  bodies.forEach(b => model.add(b));

  // Process Hub & Rails
  // Simulate PLA plastic
  const plaSettings = {
    roughness: 0.4,
    metalness: 0.1,
    clearcoat: 0.1,
    clearcoatRoughness: 0.2,
    transparent: true,
    opacity: 0
  };

  hubMesh.material = new THREE.MeshPhysicalMaterial({ color: 0x2a2a2a, ...plaSettings }); // Graphite grey
  railsMesh.material = new THREE.MeshPhysicalMaterial({ color: 0xcccccc, ...plaSettings });

  // Group ties into clusters of 3
  const ties = [];
  const processedBodyIndices = new Set();

  for (let i = 0; i < bodies.length; i++) {
    if (processedBodyIndices.has(i)) continue;

    const body1 = bodies[i];
    const cluster = [body1];
    processedBodyIndices.add(i);

    // Find 2 closest bodies
    const distances = [];
    for (let j = 0; j < bodies.length; j++) {
      if (processedBodyIndices.has(j)) continue;
      const dist = body1.position.distanceTo(bodies[j].position);
      distances.push({ index: j, dist: dist });
    }

    distances.sort((a, b) => a.dist - b.dist);

    if (distances.length > 0) {
      cluster.push(bodies[distances[0].index]);
      processedBodyIndices.add(distances[0].index);
    }
    if (distances.length > 1) {
      cluster.push(bodies[distances[1].index]);
      processedBodyIndices.add(distances[1].index);
    }

    // Apply material to all
    cluster.forEach(m => {
      m.material = new THREE.MeshPhysicalMaterial({ color: 0x8b4513, ...plaSettings });
    });

    ties.push(cluster);
  }

  // Duplicate train 8 times
  // Hex colors provided in the PR
  const trainColors = [
    0xBB3D43,
    0xF7D959,
    0xFFFFFF,
    0xF99963,
    0xAE96D4,
    0x0078BF,
    0x61C680,
    0x4D3324
  ];
  const trains = [];

  trainMesh.removeFromParent(); // Remove original

  for (let i = 0; i < 8; i++) {
    const clonedTrain = trainMesh.clone();
    clonedTrain.material = new THREE.MeshPhysicalMaterial({ color: trainColors[i], ...plaSettings });

    const pivot = new THREE.Group();
    // Maintain pivot at 0,0,0 relative to the scaled model space.
    // This allows it to orbit the center of the hub
    pivot.position.set(0, 0, 0);
    pivot.rotation.y = (Math.PI / 4) * i;
    pivot.add(clonedTrain);

    model.add(pivot); // Add to model so it inherits 1000x scale and centering
    trains.push({ pivot, mesh: clonedTrain });
  }

  // Add glowing neon-blue GridHelper to the floor
  const gridHelper = new THREE.GridHelper(2000, 100, 0x00ffff, 0x005555);
  gridHelper.position.y = -50; // Position slightly below the model
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 1;
  scene.add(gridHelper);

  // Create wireframes
  const allSolidMeshes = [hubMesh, railsMesh, ...bodies, ...trains.map(t => t.mesh)];
  const wireframes = [];

  allSolidMeshes.forEach(mesh => {
    const wireframeGeom = new THREE.WireframeGeometry(mesh.geometry);
    const wireframeMat = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 1 });
    const wireframe = new THREE.LineSegments(wireframeGeom, wireframeMat);
    mesh.add(wireframe);
    wireframes.push(wireframe);
  });

  scene.add(model);
  modelLoaded = true;

  // Expose useful arrays globally for phase 2
  window.animationData = {
    ties,
    trains,
    wireframes,
    allSolidMeshes
  };

  // Phase 1 animation: Staggered Blueprint assembly
  setTimeout(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Remove wireframes after fade
        wireframes.forEach(wf => {
          wf.removeFromParent();
          wf.geometry.dispose();
          wf.material.dispose();
        });
      }
    });

    // Group 1: Hub and Rails
    const baseMeshes = [hubMesh, railsMesh];
    const baseWireframes = wireframes.filter(wf => baseMeshes.includes(wf.parent));

    // Group 2: Ties
    const tieMeshes = bodies;
    const tieWireframes = wireframes.filter(wf => tieMeshes.includes(wf.parent));

    // Group 3: Trains
    const trainMeshes = trains.map(t => t.mesh);
    const trainWireframes = wireframes.filter(wf => trainMeshes.includes(wf.parent));

    // Stagger 1: Base
    tl.to(baseWireframes.map(w => w.material), { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, 0);
    tl.to(baseMeshes.map(m => m.material), { opacity: 1, duration: 1.5, ease: 'power2.inOut' }, 0);

    // Stagger 2: Ties
    tl.to(tieWireframes.map(w => w.material), { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, 0.5);
    tl.to(tieMeshes.map(m => m.material), { opacity: 1, duration: 1.5, ease: 'power2.inOut' }, 0.5);

    // Stagger 3: Trains
    tl.to(trainWireframes.map(w => w.material), { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, 1.0);
    tl.to(trainMeshes.map(m => m.material), { opacity: 1, duration: 1.5, ease: 'power2.inOut' }, 1.0);

    // Fade out GridHelper after all solid-color animations complete
    tl.to(gridHelper.material, { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, 2.5);

  }, 1000); // 1s delay before starting fade


}, undefined, (error) => {
  console.error('Error loading model:', error);
});

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
});


// --- Phase 2: Interactive Hover Wave ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(-1000, -1000); // Start offscreen
const invisiblePlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const hoverPoint = new THREE.Vector3();

let isHovering = false;
const initialY = new Map();

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(invisiblePlane, hoverPoint);
  isHovering = true;
});

canvas.addEventListener('mouseleave', () => {
  isHovering = false;
});

function updateWave() {
  if (!modelLoaded || !window.animationData) return;

  const { ties, trains } = window.animationData;
  // Reduce wave radius to strictly "3 ties out" (roughly 50-60 units in world space depending on scale, tuned visually)
  const waveRadius = 55;

  // maxLift reduced to 35% of 30 (10.5)
  const localMaxLift = 10.5 / 1000;

  // Update ties
  ties.forEach(cluster => {
    const firstBody = cluster[0];

    // Store original Y position if not stored
    if (!initialY.has(firstBody.uuid)) {
      initialY.set(firstBody.uuid, firstBody.position.y);
    }

    const baseY = initialY.get(firstBody.uuid);
    let targetY = baseY;

    if (isHovering) {
      const pos = new THREE.Vector3();
      firstBody.getWorldPosition(pos); // Get world pos for distance calculation

      const dx = pos.x - hoverPoint.x;
      const dz = pos.z - hoverPoint.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < waveRadius) {
        // Bell curve wave in world distance, but calculating local lift
        const lift = Math.pow(Math.cos((dist / waveRadius) * (Math.PI / 2)), 2) * localMaxLift;
        targetY = baseY + lift;
      }
    }

    cluster.forEach(b => {
      b.position.y += (targetY - b.position.y) * 0.15;
    });
  });

  // Update trains
  trains.forEach(t => {
    const mesh = t.mesh;

    // Store original Y position
    if (!initialY.has(mesh.uuid)) {
      initialY.set(mesh.uuid, mesh.position.y);
    }

    const baseY = initialY.get(mesh.uuid);
    let targetY = baseY;

    if (isHovering) {
      const pos = new THREE.Vector3();
      mesh.getWorldPosition(pos);

      const dx = pos.x - hoverPoint.x;
      const dz = pos.z - hoverPoint.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < waveRadius) {
        const lift = Math.pow(Math.cos((dist / waveRadius) * (Math.PI / 2)), 2) * localMaxLift;
        targetY = baseY + lift;
      }
    }

    mesh.position.y += (targetY - mesh.position.y) * 0.15;
  });
}

function animate() {
  requestAnimationFrame(animate);
  updateWave();
  renderer.render(scene, camera);
}
animate();
