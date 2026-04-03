const fs = require('fs');

// We know the train has bounding box center at (0, 0, 0).
// BUT we also saw earlier:
// Child 2: name='mesh_2', verts=2670, size=0.094,0.003,0.094
// That is HUGE compared to the rails size!
// Wait. 0.094x0.094 is exactly the diameter of the circular track!
// If the train mesh has size 0.094x0.094, it might contain all 8 trains already?
// Let's look at the vertex count: 2670.
// Is 2670 vertices enough for 8 trains, or is it just 1 train whose vertices are distributed across the circle?
// Oh! If the train geometry contains ONLY 1 train, but its size is 0.094, then the train is situated at the edge of the circle!
// And its origin is at 0,0,0!
// YES! If its origin is at 0,0,0, and the geometry contains one train at the edge of the track...
// Then rotating the mesh around Y-axis will perfectly sweep it along the track!
// Let's test this hypothesis! If so, we just need to rotate the trains!
