import re

with open('store/about-3d.js', 'r') as f:
    content = f.read()

# Remove the appended broken code
content = content.split('// --- Phase 2: Interactive Hover Wave ---')[0]

# Replace animate function and add Phase 2 code properly
replacement = """
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
  const waveRadius = 15;
  const maxLift = 3;

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
      firstBody.getWorldPosition(pos);

      const dx = pos.x - hoverPoint.x;
      const dz = pos.z - hoverPoint.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < waveRadius) {
        // Bell curve wave
        const lift = Math.pow(Math.cos((dist / waveRadius) * (Math.PI / 2)), 2) * maxLift;
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
        const lift = Math.pow(Math.cos((dist / waveRadius) * (Math.PI / 2)), 2) * maxLift;
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
"""

content = content.replace("""function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();""", replacement)

with open('store/about-3d.js', 'w') as f:
    f.write(content)

print("Phase 2 interactive wave added")
