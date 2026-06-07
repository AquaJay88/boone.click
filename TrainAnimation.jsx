/**
 * Train Animation Component for Lovable
 *
 * Dependencies to install in your Lovable project:
 * npm install three gsap
 *
 * Instructions:
 * 1. Ensure you have the dependencies installed.
 * 2. Copy and paste this file into your Lovable components directory.
 * 3. Import and use it like `<TrainAnimation />`.
 *
 * Note: Ensure that `three` is installed, as it includes the loaders in `three/examples/jsm/...`
 */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import gsap from 'gsap';

export default function TrainAnimation({ className = '' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    const rect = containerRef.current.getBoundingClientRect();
    const camera = new THREE.PerspectiveCamera(45, rect.width / rect.height, 0.1, 2000);
    camera.position.set(0, 125, 250);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    // Use container dimensions
    renderer.setSize(rect.width, rect.height, false);
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

    let modelLoaded = false;
    let animationData = null; // Local reference instead of window
    let animationFrameId;
    let timeoutId;
    let animationTimeline;

    gltfLoader.load('https://wcqndeigdxrbawbfteuj.supabase.co/storage/v1/object/public/store-images/general/Train%20Case%20&%20Hub%20Animation2.compressed.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(1000, 1000, 1000);
      model.updateMatrixWorld(true);

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      const tiesMesh = model.children[0];
      let trainMesh = model.children[1];
      const railsMesh = model.children[2];
      const hubMesh = model.children[3];

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

            meshes.push(newMesh);
        });
        return meshes;
      }

      const bodies = splitMeshIntoSeparateMeshes(tiesMesh);
      tiesMesh.removeFromParent();
      tiesMesh.geometry.dispose();

      bodies.forEach(b => model.add(b));

      const plaSettings = {
        roughness: 0.8,
        metalness: 0.1,
        clearcoat: 0.0,
        clearcoatRoughness: 0.0,
        transparent: true,
        opacity: 0
      };

      hubMesh.material = new THREE.MeshPhysicalMaterial({ color: 0x3a3a3a, ...plaSettings });
      railsMesh.material = new THREE.MeshPhysicalMaterial({ color: 0xcccccc, ...plaSettings });

      const ties = [];
      const processedBodyIndices = new Set();

      for (let i = 0; i < bodies.length; i++) {
        if (processedBodyIndices.has(i)) continue;

        const body1 = bodies[i];
        const cluster = [body1];
        processedBodyIndices.add(i);

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

        cluster.forEach(m => {
          m.material = new THREE.MeshPhysicalMaterial({ color: 0x8b4513, ...plaSettings });
        });

        ties.push(cluster);
      }

      const trainColors = [
        0xBB3D43,
        0xF7D959,
        0xFFFFFF,
        0xF99963,
        0xAE96D4,
        0x0078BF,
        0x61C680,
        0x8b4513
      ];
      const trains = [];

      trainMesh.removeFromParent();

      trainMesh.geometry.computeBoundingBox();
      const trainLocalCenter = new THREE.Vector3();
      trainMesh.geometry.boundingBox.getCenter(trainLocalCenter);

      for (let i = 0; i < 8; i++) {
        const clonedTrain = trainMesh.clone();
        clonedTrain.material = new THREE.MeshPhysicalMaterial({ color: trainColors[i], ...plaSettings });

        const pivot = new THREE.Group();
        pivot.position.set(0, 0, 0);
        pivot.rotation.y = (Math.PI / 4) * i;
        pivot.add(clonedTrain);

        model.add(pivot);
        trains.push({ pivot, mesh: clonedTrain, localCenter: trainLocalCenter });
      }

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

      animationData = {
        ties,
        trains,
        wireframes,
        allSolidMeshes
      };

      timeoutId = setTimeout(() => {
        animationTimeline = gsap.timeline({
          onComplete: () => {
            wireframes.forEach(wf => {
              wf.removeFromParent();
              wf.geometry.dispose();
              wf.material.dispose();
            });
          }
        });

        const baseMeshes = [hubMesh, railsMesh];
        const baseWireframes = wireframes.filter(wf => baseMeshes.includes(wf.parent));

        const tieMeshes = bodies;
        const tieWireframes = wireframes.filter(wf => tieMeshes.includes(wf.parent));

        const trainMeshes = trains.map(t => t.mesh);
        const trainWireframes = wireframes.filter(wf => trainMeshes.includes(wf.parent));

        animationTimeline.to(baseWireframes.map(w => w.material), { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, 0);
        animationTimeline.to(baseMeshes.map(m => m.material), { opacity: 1, duration: 1.5, ease: 'power2.inOut' }, 0);

        animationTimeline.to(tieWireframes.map(w => w.material), { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, 0.5);
        animationTimeline.to(tieMeshes.map(m => m.material), { opacity: 1, duration: 1.5, ease: 'power2.inOut' }, 0.5);

        animationTimeline.to(trainWireframes.map(w => w.material), { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, 1.0);
        animationTimeline.to(trainMeshes.map(m => m.material), { opacity: 1, duration: 1.5, ease: 'power2.inOut' }, 1.0);

      }, 1000);

    }, undefined, (error) => {
      console.error('Error loading model:', error);
    });

    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height, false);
    };
    window.addEventListener('resize', handleResize);

    const mouse = new THREE.Vector2(-1000, -1000);
    let isHovering = false;
    const initialY = new Map();

    const handleMouseMove = (event) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isOverCanvas = (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      );

      if (isOverCanvas) {
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        isHovering = true;
      } else {
        isHovering = false;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    function checkWaveTrigger(xNDC, yNDC) {
      if (!modelLoaded || !animationData) return false;

      const { ties, trains } = animationData;
      const waveRadiusNDC = 0.2;
      const tempPos = new THREE.Vector3();

      for (let i = 0; i < ties.length; i++) {
        const firstBody = ties[i][0];
        firstBody.updateMatrixWorld(true);
        const e = firstBody.matrixWorld.elements;
        tempPos.set(e[12], e[13], e[14]);
        tempPos.project(camera);

        const dx = tempPos.x - xNDC;
        const dy = tempPos.y - yNDC;
        if (Math.sqrt(dx * dx + dy * dy) < waveRadiusNDC) {
          return true;
        }
      }

      for (let i = 0; i < trains.length; i++) {
        const t = trains[i];
        t.mesh.updateMatrixWorld(true);
        tempPos.copy(t.localCenter);
        t.mesh.localToWorld(tempPos);
        tempPos.project(camera);

        const dx = tempPos.x - xNDC;
        const dy = tempPos.y - yNDC;
        if (Math.sqrt(dx * dx + dy * dy) < waveRadiusNDC) {
          return true;
        }
      }

      return false;
    }

    const handleTouch = (event) => {
      if (!containerRef.current) return;
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = containerRef.current.getBoundingClientRect();

        const isOverCanvas = (
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right &&
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom
        );

        if (isOverCanvas) {
          const xNDC = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
          const yNDC = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

          if (checkWaveTrigger(xNDC, yNDC)) {
            if (event.cancelable) {
              event.preventDefault();
            }
          }

          mouse.x = xNDC;
          mouse.y = yNDC;
          isHovering = true;
        } else {
          isHovering = false;
        }
      }
    };

    const handleTouchEndCancel = (event) => {
      if (event.touches.length === 0) {
        isHovering = false;
      }
    };

    window.addEventListener('touchstart', handleTouch, { passive: false });
    window.addEventListener('touchmove', handleTouch, { passive: false });
    window.addEventListener('touchend', handleTouchEndCancel);
    window.addEventListener('touchcancel', handleTouchEndCancel);

    const handleClick = (event) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isOverCanvas = (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      );

      if (isOverCanvas) {
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        isHovering = true;
      } else {
        isHovering = false;
      }
    };
    window.addEventListener('click', handleClick);

    function updateWave() {
      if (!modelLoaded || !animationData) return;

      const { ties, trains } = animationData;
      const waveRadiusNDC = 0.2;
      const localMaxLift = 10.5 / 1000;
      const tempPos = new THREE.Vector3();

      ties.forEach(cluster => {
        const firstBody = cluster[0];

        if (!initialY.has(firstBody.uuid)) {
          initialY.set(firstBody.uuid, firstBody.position.y);
        }

        const baseY = initialY.get(firstBody.uuid);
        let targetY = baseY;

        if (isHovering) {
          firstBody.updateMatrixWorld(true);
          const e = firstBody.matrixWorld.elements;
          tempPos.set(e[12], e[13], e[14]);
          tempPos.project(camera);

          const dx = tempPos.x - mouse.x;
          const dy = tempPos.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < waveRadiusNDC) {
            const lift = Math.max(0, 1 - dist / waveRadiusNDC) * localMaxLift;
            targetY = baseY + lift;
          }
        }

        cluster.forEach(b => {
          b.position.y += (targetY - b.position.y) * 0.15;
        });
      });

      trains.forEach(t => {
        const mesh = t.mesh;

        if (!initialY.has(mesh.uuid)) {
          initialY.set(mesh.uuid, mesh.position.y);
        }

        const baseY = initialY.get(mesh.uuid);
        let targetY = baseY;

        if (isHovering) {
          tempPos.copy(t.localCenter);
          mesh.localToWorld(tempPos);
          tempPos.project(camera);

          const dx = tempPos.x - mouse.x;
          const dy = tempPos.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < waveRadiusNDC) {
            const lift = Math.max(0, 1 - dist / waveRadiusNDC) * localMaxLift;
            targetY = baseY + lift;
          }
        }

        mesh.position.y += (targetY - mesh.position.y) * 0.15;
      });
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      updateWave();
      renderer.render(scene, camera);
    }
    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
      if (animationTimeline) {
        animationTimeline.kill();
      }

      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchend', handleTouchEndCancel);
      window.removeEventListener('touchcancel', handleTouchEndCancel);
      window.removeEventListener('click', handleClick);

      // Dispose three.js resources
      renderer.dispose();
      if (scene.environment) scene.environment.dispose();

      scene.traverse((object) => {
        if (!object.isMesh) return;
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(mat => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      dracoLoader.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[600px] ${className}`}
      style={{ minHeight: '400px' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-pointer outline-none"
      />
    </div>
  );
}
