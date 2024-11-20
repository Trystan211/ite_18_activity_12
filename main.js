import * as THREE from "https://esm.sh/three";
import { OrbitControls } from "https://esm.sh/three/addons/controls/OrbitControls.js";
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.20/+esm';
import { FontLoader } from "https://esm.sh/three/addons/loaders/FontLoader.js";
import { TextGeometry } from "https://esm.sh/three/addons/geometries/TextGeometry.js";

// Function to generate random neon colors
const getRandomNeonColor = () => {
  const neonColors = [
    0x00ff00, // Neon Green
    0x00ffff, // Neon Blue
    0xff00ff, // Neon Pink
    0xffff00, // Neon Yellow
    0xff5733, // Neon Orange
    0x8b00ff, // Neon Purple
    0xff1493, // Neon Deep Pink
    0x00ff7f, // Neon Spring Green
  ];
  return neonColors[Math.floor(Math.random() * neonColors.length)];
};

// Function to generate a random size for the torus
const getRandomSize = () => Math.random() * (0.9 - 0.3) + 0.3;

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add OrbitControls for zooming and orbiting
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.minDistance = 5;
controls.maxDistance = 20;

// Lighting
const ambientLight = new THREE.AmbientLight(0xaaaaaa, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Create toruses with random sizes and neon colors
const toruses = [];
for (let i = 0; i < 50; i++) {
  const neonMaterial = new THREE.MeshStandardMaterial({
    color: getRandomNeonColor(),
    emissive: getRandomNeonColor(),
    emissiveIntensity: 1.5,
    roughness: 0.2,
    metalness: 0.8,
  });

  const torusGeometry = new THREE.TorusKnotGeometry(getRandomSize(), 0.1, 100, 16);
  const torus = new THREE.Mesh(torusGeometry, neonMaterial);
  torus.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10
  );
  scene.add(torus);
  toruses.push(torus);
}

// Add text
const loader = new FontLoader();
loader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  (font) => {
    const textGeometry = new TextGeometry("PENASO - ACT 1.6-1.12", {
      font: font,
      size: 0.5,
      height: 0.2,
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-3, 0, 0);
    scene.add(textMesh);
  }
);

// Animation
const animate = () => {
  requestAnimationFrame(animate);
  toruses.forEach((torus) => {
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
  });
  controls.update();
  renderer.render(scene, camera);
};
animate();

// Handle window resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
