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

  hubMesh.material = new THREE.MeshPhysicalMaterial({ color: 0x3a3a3a, ...plaSettings }); // Slightly lighter graphite grey
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

  // Calculate local center of the train geometry to ensure accurate distance checks later
  trainMesh.geometry.computeBoundingBox();
  const trainLocalCenter = new THREE.Vector3();
  trainMesh.geometry.boundingBox.getCenter(trainLocalCenter);

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
    trains.push({ pivot, mesh: clonedTrain, localCenter: trainLocalCenter });
  }

  // Create an invisible 3D Cylinder Hit Box to capture hover anywhere over the entire model
  // This bounds the model from the bottom of the black hub to the top of the trains
  const pathRadius = Math.sqrt(trainLocalCenter.x * trainLocalCenter.x + trainLocalCenter.z * trainLocalCenter.z);
  // Cylinder radius should cover the tracks plus some padding.
  // Since model is scaled 1000x, we add padding in local space (e.g. 40 / 1000).
  const hitBoxRadius = pathRadius + (40 / 1000);

  // No proxy hit box is needed! We will directly raycast against all visual meshes.
  // Soft Blueprint Grid using a CanvasTexture
  const canvasTexture = document.createElement('canvas');
  canvasTexture.width = 512;
  canvasTexture.height = 512;
  const ctx = canvasTexture.getContext('2d');

  // Background
  ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // transparent
  ctx.fillRect(0, 0, 512, 512);

  // Draw soft grid lines
  ctx.strokeStyle = 'rgba(100, 200, 255, 0.4)'; // soft blue
  ctx.lineWidth = 2;

  // Create a grid pattern
  const step = 64;
  for (let i = 0; i <= 512; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  const gridTex = new THREE.CanvasTexture(canvasTexture);
  gridTex.wrapS = THREE.RepeatWrapping;
  gridTex.wrapT = THREE.RepeatWrapping;
  gridTex.repeat.set(10, 10);

  const gridGeom = new THREE.PlaneGeometry(2000, 2000);
  const gridMat = new THREE.MeshBasicMaterial({
    map: gridTex,
    transparent: true,
    opacity: 0, // start at 0 for animation
    depthWrite: false
  });

  const softGrid = new THREE.Mesh(gridGeom, gridMat);
  softGrid.rotation.x = -Math.PI / 2;
  softGrid.position.y = -50; // slightly below model
  scene.add(softGrid);

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

  // Direct mesh intersection ensures exact visual accuracy with no dead zones and perfect targeting
  const interactableObjects = allSolidMeshes;
  console.log('Interactable objects length:', interactableObjects.length);
  // Log the number of individual meshes from trains and ties to show we have everything captured logically,
  // even if raycaster now hits the torus.
  console.log('Total train meshes:', trains.length);
  console.log('Total tie bodies:', bodies.length);

  // Expose useful arrays globally for phase 2
  window.animationData = {
    ties,
    trains,
    wireframes,
    allSolidMeshes,
    interactableObjects
  };

  // Phase 1 animation: Staggered Blueprint assembly
  // First fade in the grid smoothly, then hold, then run the assembly
  gsap.to(softGrid.material, { opacity: 1, duration: 1, ease: 'power1.inOut' });

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
    tl.to(softGrid.material, { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, 2.5);

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

const hoverPoint = new THREE.Vector3();

let isHovering = false;
const initialY = new Map();

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  if (window.animationData) {
    // We map the user's 2D screen coordinates directly to a flat, top-down 3D representation
    // of the model, bypassing all 3D camera raycasting and perspective skew.

    // 1. Determine the true visual boundaries of the 3D model on the 2D screen.
    // Because the camera is looking down at a 45-degree angle, a flat plane projection (y=0)
    // cuts off the bottom half of the 3D base and the tall tops of the back trains.
    // We must project the absolute lowest front edge (the bottom of the hub) to get the true Y radius!
    const modelRadius = 55;

    // The hub geometry's lowest local Y point is approx -20.65.
    // We project the absolute front-bottom corner of the model to get the screen's bottom boundary.
    const rightPoint = new THREE.Vector3(modelRadius, 0, 0).project(camera);
    const frontBottomPoint = new THREE.Vector3(0, -21, modelRadius).project(camera);

    const radiusX = Math.abs(rightPoint.x);
    // Use the extreme front-bottom point to stretch the 2D screen oval over the entire visible height of the base.
    const radiusY = Math.abs(frontBottomPoint.y);

    // 2. Calculate how far the mouse is from the center (0,0) in percentage terms
    const pctX = mouse.x / radiusX;
    // Invert pctY: in NDC, negative Y is the bottom of the screen (which visually maps to the front of the model).
    // In 3D space, the front of the model is positive Z.
    const pctY = -mouse.y / radiusY;

    // 3. Determine if the mouse is inside the ellipse boundary (x^2 + y^2 <= 1.0)
    // We use 1.05 to give a 5% margin of leniency for clicking the very edges.
    const normalizedDist = Math.sqrt(pctX * pctX + pctY * pctY);

    if (normalizedDist <= 1.05) {
      isHovering = true;
      // 4. Translate the 2D percentage DIRECTLY into 3D world space!
      // This completely ignores the actual visual height/perspective, treating the screen oval
      // as a perfect 1:1 map of the flat Y=0 top-down plane.
      hoverPoint.set(pctX * modelRadius, 0, pctY * modelRadius);
    } else {
      isHovering = false;
    }

    // Attach to window so we can easily test the coordinates in verification scripts
    window._debugHover = { pctX, pctY, normalizedDist, hoverPoint: {x: hoverPoint.x, y: hoverPoint.y, z: hoverPoint.z}, isHovering };
  }
});

canvas.addEventListener('mouseleave', () => {
  isHovering = false;
});

function updateWave() {
  if (!modelLoaded || !window.animationData) return;

  const { ties, trains } = window.animationData;
  // Reduce wave radius to strictly cover the hovered train + ~3 items left/right
  const waveRadius = 65;

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
      // Calculate world position accurately by updating matrixWorld
      firstBody.updateMatrixWorld(true);
      const e = firstBody.matrixWorld.elements;
      const wx = e[12];
      const wz = e[14];

      const dx = wx - hoverPoint.x;
      const dz = wz - hoverPoint.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < waveRadius) {
        // Smooth interpolation using linear taper as requested
        const lift = Math.max(0, 1 - dist / waveRadius) * localMaxLift;
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
      // Calculate world position based on the geometry's local visual center,
      // because the mesh's origin is 0,0,0 (pivot center).
      const pos = t.localCenter.clone();
      mesh.localToWorld(pos);

      const dx = pos.x - hoverPoint.x;
      const dz = pos.z - hoverPoint.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < waveRadius) {
        // Smooth interpolation using linear taper as requested
        const lift = Math.max(0, 1 - dist / waveRadius) * localMaxLift;
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
