const radius = 250;
const dist = 50;

const lift1 = Math.pow(Math.cos((dist / radius) * (Math.PI / 2)), 2);
const lift2 = Math.max(0, 1 - dist / radius);

console.log("Cosine squared:", lift1);
console.log("Linear:", lift2);

// Evaluate what happens for maxLift and targetY in the code:
// const lift = Math.max(0, 1 - dist / waveRadius) * localMaxLift;
