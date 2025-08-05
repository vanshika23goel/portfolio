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

// Three.js Hero Sphere
const heroScene = new THREE.Scene();
const heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
const heroRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById('hero-canvas'), alpha: true });
heroRenderer.setSize(window.innerWidth > 600 ? 600 : window.innerWidth, 400);

const heroGeometry = new THREE.SphereGeometry(1, 32, 32);
const heroTexture = new THREE.TextureLoader().load('https://via.placeholder.com/150?text=Vanshika'); // Replace with your image
const heroMaterial = new THREE.MeshBasicMaterial({ map: heroTexture });
const heroSphere = new THREE.Mesh(heroGeometry, heroMaterial);
heroScene.add(heroSphere);
heroCamera.position.z = 3;

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animateHeroSphere() {
  requestAnimationFrame(animateHeroSphere);
  heroSphere.rotation.y += 0.01 + mouseX * 0.05;
  heroSphere.rotation.x += mouseY * 0.05;
  heroRenderer.render(heroScene, heroCamera);
}
animateHeroSphere();

// Three.js Project Spheres
const projectScene = new THREE.Scene();
const projectCamera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
const projectRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById('project-canvas'), alpha: true });
projectRenderer.setSize(window.innerWidth > 600 ? 600 : window.innerWidth, 400);

const projectGeometry = new THREE.SphereGeometry(1, 32, 32);
const projectTexture = new THREE.TextureLoader().load('https://via.placeholder.com/150'); // Replace with project image
const projectMaterial = new THREE.MeshBasicMaterial({ map: projectTexture });
const projectSphere = new THREE.Mesh(projectGeometry, projectMaterial);
projectScene.add(projectSphere);
projectCamera.position.z = 3;

function animateProjectSphere() {
  requestAnimationFrame(animateProjectSphere);
  projectSphere.rotation.y += 0.01 + mouseX * 0.05;
  projectSphere.rotation.x += mouseY * 0.05;
  projectRenderer.render(projectScene, projectCamera);
}
animateProjectSphere();

window.addEventListener('resize', () => {
  const width = window.innerWidth > 600 ? 600 : window.innerWidth;
  heroRenderer.setSize(width, 400);
  heroCamera.aspect = width / 400;
  heroCamera.updateProjectionMatrix();

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

// Typewriter Effect
const typewriter = document.getElementById('typewriter');
const phrases = ['Front-End Developer', '3D Animation Enthusiast', 'Creative Designer'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIndex];
  typewriter.textContent = currentPhrase.substring(0, charIndex);
  gsap.to(typewriter, { opacity: 1, duration: 0.5 });

  if (!isDeleting && charIndex < currentPhrase.length) {
    charIndex++;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
  } else if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(type, 1000);
    return;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }
  setTimeout(type, isDeleting ? 50 : 100);
}
type();

// Vanilla Tilt
VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
  max: 25,
  speed: 400,
  glare: true,
  'max-glare': 0.5
});

// Sidebar Toggle
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const main = document.querySelector('main');
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  main.classList.toggle('shifted');
});

// Custom Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, .project-card, .blog-card, .skill-card, .resume-btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});
