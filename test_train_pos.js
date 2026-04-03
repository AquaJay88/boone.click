const fs = require('fs');
const THREE = require('three');
const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader.js');
const { DRACOLoader } = require('three/examples/jsm/loaders/DRACOLoader.js');

// Can't run GLTFLoader easily in Node without full mock.
// I will just use playwright to run a small script on the live page.
