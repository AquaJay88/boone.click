const fs = require('fs');

let code = fs.readFileSync('store/about-3d.js', 'utf8');

// The train is at 0,0,0 relative to its pivot!
// But its vertices are NOT at 0,0,0! Let's check where the train vertices are.
// Actually, earlier we printed the train's center, and it was (-0.000, 0.003, 0.000).
// Wait! If the center of the bounding box of the train mesh is at (0, 0, 0), it means the train is at the center of the hub!
// If the train is at the center of the hub, and we duplicate it and rotate it... all 8 trains will just be stacked in the center!
// They need to be offset so they sit on the rails.
// Let's look at the rails' bounding box.
