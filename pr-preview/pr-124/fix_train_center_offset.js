const fs = require('fs');

// We also need to fix the train orbit.
// Train center was: Train center: (-0.000, 0.003, 0.000)
// Wait! If the train's local position is at (0, 0, 0) and its bounding box center is at (0, 0, 0),
// then duplicating the train and adding it to a pivot at (0, 0, 0) will mean all 8 trains are stacked at the center of the hub!
// The original train was probably NOT at the origin, but let's re-verify.
