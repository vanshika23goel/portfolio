// Three.js Particle Background
const particleScene = new THREE.Scene();
const particleCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const particleRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById('particle-canvas'), alpha: true });
particleRenderer.setSize(window.innerWidth, window.innerHeight);

const particles = new THREE.BufferGeometry();
const particleCount = 1000;
const posArray = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 10;
}
particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particleMaterial = new THREE.PointsMaterial({ color: 0xf5f5dc, size: 0.02 });
const particleMesh = new THREE.Points(particles, particleMaterial);
particleScene.add(particleMesh);
particleCamera.position.z = 5;

function animateParticles() {
  requestAnimationFrame(animateParticles);
  particleMesh.rotation.y += 0.001;
  particleRenderer.render(particleScene, particleCamera);
}
animateParticles();

// Three.js Project Spheres
const projectScene = new THREE.Scene();
const projectCamera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
const projectRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById('project-canvas'), alpha: true });
projectRenderer.setSize(window.innerWidth > 600 ? 600 : window.innerWidth, 400);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const texture = new THREE.TextureLoader().load('https://via.placeholder.com/150'); // Replace with project image
const material = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);
projectScene.add(sphere);
projectCamera.position.z = 3;

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animateSphere() {
  requestAnimationFrame(animateSphere);
  sphere.rotation.y += 0.01 + mouseX * 0.05;
  sphere.rotation.x += mouseY * 0.05;
  projectRenderer.render(projectScene, projectCamera);
}
animateSphere();

window.addEventListener('resize', () => {
  const width = window.innerWidth > 600 ? 600 : window.innerWidth;
  projectRenderer.setSize(width, 400);
  projectCamera.aspect = width / 400;
  projectCamera.updateProjectionMatrix();

  particleRenderer.setSize(window.innerWidth, window.innerHeight);
  particleCamera.aspect = window.innerWidth / window.innerHeight;
  particleCamera.updateProjectionMatrix();
});

// GSAP Animations
gsap.utils.toArray('section').forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
});

gsap.from('#home h1 span', {
  opacity: 0,
  y: 20,
  stagger: 0.1,
  duration: 0.5,
  delay: 0.5
});

// Vanilla Tilt
VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
  max: 25,
  speed: 400,
  glare: true,
  'max-glare': 0.5
});

// Custom Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, .project-card, .blog-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});
