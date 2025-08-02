let count = parseInt(localStorage.getItem('watermelons')) || 0;
const counter = document.getElementById('watermelons');
const clicker = document.getElementById('clicker');
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];

counter.textContent = count;

clicker.addEventListener('click', (e) => {
  count++;
  counter.textContent = count;
  localStorage.setItem('watermelons', count);

  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.textContent = '+1';
  particle.style.left = `${e.clientX}px`;
  particle.style.top = `${e.clientY}px`;
  document.body.appendChild(particle);

  setTimeout(() => particle.remove(), 1000);
});

// фон анимация арбузов
const watermelonImage = new Image();
watermelonImage.src = 'bg.png';

let bgWatermelons = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createBgWatermelon() {
  const size = Math.random() * 40 + 20;
  return {
    x: canvas.width + Math.random() * 200,
    y: canvas.height + Math.random() * 100,
    size,
    speedX: -0.3 - Math.random() * 0.2,
    speedY: -0.3 - Math.random() * 0.2
  };
}

// начальное количество арбузов
for (let i = 0; i < 30; i++) {
  bgWatermelons.push(createBgWatermelon());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let wm of bgWatermelons) {
    ctx.drawImage(watermelonImage, wm.x, wm.y, wm.size, wm.size);
    wm.x += wm.speedX;
    wm.y += wm.speedY;

    if (wm.x < -100 || wm.y < -100) {
      Object.assign(wm, createBgWatermelon());
    }
  }

  requestAnimationFrame(animate);
}

watermelonImage.onload = animate;
