window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'YOUR_GA_ID');

// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('project-canvas'), alpha: true });
renderer.setSize(window.innerWidth > 600 ? 600 : window.innerWidth, 400);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const texture = new THREE.TextureLoader().load('https://via.placeholder.com/150'); // Replace with project image
const material = new THREE.MeshBasicMaterial({ map: texture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 3;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  const width = window.innerWidth > 600 ? 600 : window.innerWidth;
  renderer.setSize(width, 400);
  camera.aspect = width / 400;
  camera.updateProjectionMatrix();
});

// GSAP Scroll Animations
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

// EmailJS Contact Form
emailjs.init('YOUR_EMAILJS_USER_ID');

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
    from_name: document.getElementById('name').value,
    from_email: document.getElementById('email').value,
    message: document.getElementById('message').value
  }).then(() => {
    alert('Message sent successfully!');
    document.getElementById('contact-form').reset();
    gtag('event', 'contact_form_submission', { event_category: 'engagement' });
  }, () => {
    alert('Failed to send message. Please try again.');
  });
});
