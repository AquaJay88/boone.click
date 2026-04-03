const fs = require('fs');

let code = fs.readFileSync('store/about-3d.js', 'utf8');

code = code.replace(
  `  const trainColors = [0xff0000, 0x0000ff, 0xffff00, 0x008000, 0x800080, 0xffa500, 0x008080, 0x00008b];`,
  `  // Solid colors matching domino trains
  const trainColors = [
    0xe60000, // Red
    0x0033cc, // Blue
    0xffcc00, // Yellow
    0x009933, // Green
    0x800080, // Purple
    0xff6600, // Orange
    0x008080, // Teal
    0x000080  // Dark Blue
  ];`
);

fs.writeFileSync('store/about-3d.js', code);
console.log("Updated colors in store/about-3d.js");
