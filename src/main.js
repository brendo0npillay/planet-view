import "./style.css";
import * as THREE from "three";
import planets from "./descriptions";

//add scene
const scene = new THREE.Scene();

//add camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//add renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//set camera position
camera.position.set(0, 0, 10);

//get dom planets
const earthButton = document.getElementById("ear");
const mercuryButton = document.getElementById("merc");
const venusButton = document.getElementById("ven");
const marsButton = document.getElementById("ma");
const jupiterButton = document.getElementById("jup");
const saturnButton = document.getElementById("sat");
const uranusButton = document.getElementById("ura");
const neptuneButton = document.getElementById("nep");

//get other dom elements
const title = document.querySelector(".title");
const description = document.querySelector(".desc");

//load planet textures
const loader = new THREE.TextureLoader();
const earthTexture = loader.load("../assets/earth8k.jpg");
const marsTexture = loader.load("../assets/mars.jpg");
const saturnTexture = loader.load("../assets/saturn.jpg");
const ringTexture = loader.load("../assets/saturn_ring.png");
const starFieldTexture = loader.load("../assets/starfield.jpg");
const sunTexture = loader.load("../assets/sun.jpg");
const mercuryTexture = loader.load("../assets/mercury.jpg");
const venusTexture = loader.load("../assets/venus.jpg");
const jupiterTexture = loader.load("../assets/jupiter.jpg");
const uranusTexture = loader.load("../assets/uranus.jpg");
const neptuneTexture = loader.load("../assets/neptune.jpg");

//add starfield background
scene.background = starFieldTexture;

function createPlanet(x, texture){
  const geometry = new THREE.SphereGeometry(x, 64, 64)
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 1,
    metalness: 0
  })
  return new THREE.Mesh(geometry, material)
}

//create planets
const earth = createPlanet(1, earthTexture)
const mars = createPlanet(0.6, marsTexture)
const saturn = createPlanet(3, saturnTexture)
const mercury = createPlanet(0.4, mercuryTexture)
const venus = createPlanet(2, venusTexture)
const jupiter = createPlanet(4, jupiterTexture)
const uranus = createPlanet(1, uranusTexture)
const neptune = createPlanet(0.8, neptuneTexture)

//change planet position
mars.position.set(5, 0, 0);
saturn.position.set(30, 0, 0);
mercury.position.set(-10, 0, 0);
venus.position.set(-5, 0, 0);
jupiter.position.set(15, 0, 0);
uranus.position.set(40, 0, 0);
neptune.position.set(45, 0, 0);

//create and add saturns ring
const ringGeometry = new THREE.RingGeometry(3.5, 5.5, 64);
const ringMaterial = new THREE.MeshStandardMaterial({
  map: ringTexture,
  side: THREE.DoubleSide,
  transparent: true,
});
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.rotation.x = Math.PI / 2;
saturn.add(ring);

//create sun
const sunGeometry = new THREE.SphereGeometry(25, 64, 64);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

//change sun position
sun.position.set(-40, 0, 0);

//create and add cam groups
const earthCamGroup = new THREE.Object3D();
const jupiterCamGroup = new THREE.Object3D();
const mercuryCamGroup = new THREE.Object3D();
const venusCamGroup = new THREE.Object3D();
const marsCamGroup = new THREE.Object3D();
const saturnCamGroup = new THREE.Object3D();
const uranusCamGroup = new THREE.Object3D();
const neptuneCamGroup = new THREE.Object3D();

scene.add(
  earthCamGroup,
  jupiterCamGroup,
  mercuryCamGroup,
  venusCamGroup,
  marsCamGroup,
  saturnCamGroup,
  uranusCamGroup,
  neptuneCamGroup
);

//add planets to scene
scene.add(sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune);

//create and add light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(-15, 3, -2);

const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
scene.add(ambientLight);

scene.add(directionalLight);

//function to switch camera
function changeCam(camGroup, planet, cam) {
  camGroup.rotation.y += 0.0004;
  camGroup.position.copy(planet.position);

  if (!planet.geometry.boundingSphere) {
    planet.geometry.computeBoundingSphere();
  }

  const radius = planet.geometry.boundingSphere.radius;
  const cameraOffset = new THREE.Vector3(0, radius * 1, radius * 1.5);
  cameraOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), camGroup.rotation.y);

  cam.position.lerp(camGroup.position.clone().add(cameraOffset), 0.05);
  cam.lookAt(planet.position);
}

//set current cam values
let currentCamGroup = mercuryCamGroup;
let currentPlanet = mercury;
title.textContent = "Mercury"
description.textContent = planets[0].description;

//event clicks for planet buttons
earthButton.onclick = () => {
  currentCamGroup = earthCamGroup;
  currentPlanet = earth;
  title.textContent = "Earth";
  description.textContent = planets[2].description;
};
venusButton.onclick = () => {
  currentCamGroup = venusCamGroup;
  currentPlanet = venus;
  title.textContent = "Venus";
  description.textContent = planets[1].description;
};
mercuryButton.onclick = () => {
  currentCamGroup = mercuryCamGroup;
  currentPlanet = mercury;
  title.textContent = "Mercury";
  description.textContent = planets[0].description;
};
marsButton.onclick = () => {
  currentCamGroup = marsCamGroup;
  currentPlanet = mars;
  title.textContent = "Mars";
  description.textContent = planets[3].description;
};
jupiterButton.onclick = () => {
  currentCamGroup = jupiterCamGroup;
  currentPlanet = jupiter;
  title.textContent = "Jupiter";
  description.textContent = planets[4].description;
};
saturnButton.onclick = () => {
  currentCamGroup = saturnCamGroup;
  currentPlanet = saturn;
  title.textContent = "Saturn";
  description.textContent = planets[5].description;
};
uranusButton.onclick = () => {
  currentCamGroup = uranusCamGroup;
  currentPlanet = uranus;
  title.textContent = "Uranus";
  description.textContent = planets[6].description;
};
neptuneButton.onclick = () => {
  currentCamGroup = neptuneCamGroup;
  currentPlanet = neptune;
  title.textContent = "Neptune";
  description.textContent = planets[7].description;
};

//animate for updates
function animate() {
  requestAnimationFrame(animate);

  //rotate planets
  earth.rotation.y += 0.004;
  mars.rotation.y += 0.004;
  saturn.rotation.y += 0.004;
  mercury.rotation.y += 0.004;
  venus.rotation.y += 0.004;
  jupiter.rotation.y += 0.004;
  uranus.rotation.y += 0.004;
  neptune.rotation.y += 0.004;

  changeCam(currentCamGroup, currentPlanet, camera);

  renderer.render(scene, camera);
}

animate();
