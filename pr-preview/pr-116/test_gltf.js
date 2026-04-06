const fs = require('fs');
const THREE = require('three');

// Just read the file and extract the train mesh position to see where the offset is.
// Actually, I can't easily parse GLB without GLTFLoader and a canvas.
// Let's just use Puppeteer to print the console logs from the page.
