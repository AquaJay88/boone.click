import re

with open('store/about-3d.js', 'r') as f:
    content = f.read()

replacement = """
  const meshes = [];
  model.traverse((child) => {
    if (child.isMesh) {
      meshes.push(child);
    }
  });

  // Group meshes by name for processing
  const bodies = [];
  let trainMesh = null;
  const otherMeshes = [];

  meshes.forEach(mesh => {
    if (mesh.name === 'train') {
      trainMesh = mesh;
    } else if (mesh.name === 'Body') {
      bodies.push(mesh);
    } else {
      otherMeshes.push(mesh);
    }
  });

  // Process other meshes (hub, rails, etc.)
  otherMeshes.forEach(mesh => {
    if (mesh.name === 'hub') {
      mesh.material = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8, transparent: true, opacity: 0 });
    } else if (mesh.name === 'stations & rails' || mesh.name === 'stations_&_rails') {
      mesh.material = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.8, transparent: true, opacity: 0 });
    } else {
      mesh.material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.8, transparent: true, opacity: 0 });
    }
  });

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
      m.material = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.9, transparent: true, opacity: 0 });
    });

    ties.push(cluster);
  }

  // Duplicate train 8 times
  const trainColors = [0xff0000, 0x0000ff, 0xffff00, 0x008000, 0x800080, 0xffa500, 0x008080, 0x00008b];
  const trains = [];

  if (trainMesh) {
    const parent = trainMesh.parent;
    trainMesh.removeFromParent(); // Remove original

    for (let i = 0; i < 8; i++) {
      const clonedTrain = trainMesh.clone();
      clonedTrain.material = new THREE.MeshStandardMaterial({ color: trainColors[i], roughness: 0.6, transparent: true, opacity: 0 });

      const pivot = new THREE.Group();
      pivot.position.set(0, 0, 0);
      pivot.rotation.y = (Math.PI / 4) * i;
      pivot.add(clonedTrain);

      scene.add(pivot);
      trains.push({ pivot, mesh: clonedTrain });
    }
  }

  // Create wireframes
  const allSolidMeshes = [...otherMeshes, ...bodies, ...trains.map(t => t.mesh)];
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

  // Phase 1 animation: Blueprint crossfade
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

    tl.to(wireframes.map(w => w.material), {
      opacity: 0,
      duration: 2.5,
      ease: 'power2.inOut'
    }, 0);

    tl.to(allSolidMeshes.map(m => m.material), {
      opacity: 1,
      duration: 2.5,
      ease: 'power2.inOut'
    }, 0);
  }, 1000); // 1s delay before starting fade
"""

old_str = """  // Instead of modifying within traverse, collect meshes first
  model.traverse((child) => {
    if (child.isMesh) {
      meshes.push(child);
    }
  });

  scene.add(model);
  modelLoaded = true;"""

content = content.replace(old_str, replacement)

with open('store/about-3d.js', 'w') as f:
    f.write(content)

print("Phase 1 logic applied")
