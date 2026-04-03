const fs = require('fs');
// Let's calculate the expected world units and local units
const localMaxLift = 10.5 / 1000;
console.log('localMaxLift:', localMaxLift);
// If world radius is roughly ~55 (waveRadius = 55 in world space)
// That means the path radius in world space is probably around ~150 to ~200
// So local pathRadius is probably 0.150 to 0.200
// If we want a tube radius of 40 in WORLD space, in local space it should be 40 / 1000 = 0.04
