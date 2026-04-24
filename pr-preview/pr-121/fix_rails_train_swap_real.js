const fs = require('fs');

let code = fs.readFileSync('store/about-3d.js', 'utf8');

code = code.replace(
  `  // Model parts mapping (based on material/geometry analysis)
  // 0: Ties (Chocolate Brown, 1408 verts)
  // 1: Rails (Light Grey, 246368 verts)
  // 2: Train (Almost Grey, 2670 verts)
  // 3: Hub (Black, 13557 verts)
  const tiesMesh = model.children[0];
  const railsMesh = model.children[1];
  let trainMesh = model.children[2];
  const hubMesh = model.children[3];`,
  `  // Model parts mapping (based on material/geometry analysis)
  // 0: Ties (Chocolate Brown, 1408 verts)
  // 1: Train (Detailed, 246368 verts)
  // 2: Rails (Simple track, 2670 verts)
  // 3: Hub (Black, 13557 verts)
  const tiesMesh = model.children[0];
  let trainMesh = model.children[1];
  const railsMesh = model.children[2];
  const hubMesh = model.children[3];`
);

fs.writeFileSync('store/about-3d.js', code);
console.log("Fixed mesh assignments in store/about-3d.js to REAL correct order");
