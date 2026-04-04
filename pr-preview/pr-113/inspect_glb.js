import * as fs from 'fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// Since we are in node, we need to mock or use a node-compatible GLTF loader.
// Alternatively, I can just write a quick python script using trimesh or just use playwright to run a script in the browser that logs the hierarchy.
