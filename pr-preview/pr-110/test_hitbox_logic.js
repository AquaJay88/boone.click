import * as THREE from 'three';
console.log('Testing hitbox math');
const hubBox = new THREE.Box3(new THREE.Vector3(-10, -5, -10), new THREE.Vector3(10, 0, 10));
const trainBox = new THREE.Box3(new THREE.Vector3(-5, 5, -5), new THREE.Vector3(5, 10, 5));

const localMinY = hubBox.min.y / 1000;
const localMaxY = trainBox.max.y / 1000;

const hitBoxHeight = localMaxY - localMinY;
const hitBoxCenterY = (localMaxY + localMinY) / 2;

console.log('Height:', hitBoxHeight);
console.log('CenterY:', hitBoxCenterY);
