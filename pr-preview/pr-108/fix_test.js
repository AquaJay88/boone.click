const fs = require('fs');
let code = fs.readFileSync('store/about-3d.js', 'utf8');

code = code.replace(
  `  const tiesMesh = model.children[0];
  const railsMesh = model.children[1];
  let trainMesh = model.children[2];
  const hubMesh = model.children[3];`,
  `  const tiesMesh = model.children[0];
  let trainMesh = model.children[1];
  const railsMesh = model.children[2];
  const hubMesh = model.children[3];`
);

fs.writeFileSync('store/about-3d.js', code);
console.log("Fixed mesh assignments via another replace to be sure.");
