const fs = require('fs');
let code = fs.readFileSync('store/about-3d.js', 'utf8');

// The original rails color we changed was for the wrong mesh.
code = code.replace(
  `hubMesh.material = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8, transparent: true, opacity: 0 });
  railsMesh.material = new THREE.MeshStandardMaterial({ color: 0xd3d3d3, roughness: 0.6, transparent: true, opacity: 0 });`,
  `hubMesh.material = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8, transparent: true, opacity: 0 });
  railsMesh.material = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.8, transparent: true, opacity: 0 });`
);

fs.writeFileSync('store/about-3d.js', code);
console.log("Updated rails color back to original in store/about-3d.js");
