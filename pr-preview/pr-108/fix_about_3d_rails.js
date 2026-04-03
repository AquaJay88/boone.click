const fs = require('fs');
let code = fs.readFileSync('store/about-3d.js', 'utf8');

// Ensure rails are light grey instead of dark grey
code = code.replace(
  `railsMesh.material = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.8, transparent: true, opacity: 0 });`,
  `railsMesh.material = new THREE.MeshStandardMaterial({ color: 0xd3d3d3, roughness: 0.6, transparent: true, opacity: 0 });`
);

fs.writeFileSync('store/about-3d.js', code);
console.log("Updated rails color in store/about-3d.js");
