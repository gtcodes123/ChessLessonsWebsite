// Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.display = "none";
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
menuToggle.addEventListener('click', () => navList.classList.toggle('active'));

// Fade-in sections on scroll
const faders = document.querySelectorAll('.fade');
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold:0.2 });
faders.forEach(fader => appearOnScroll.observe(fader));

// Particle chess pieces
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pieces = ['♙','♘','♗','♖','♕','♔'];
const particlesArray = [];

class Particle {
  constructor(){
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height;
    this.size=Math.random()*24+12;
    this.speedX=Math.random()*1-0.5;
    this.speedY=Math.random()*1-0.5;
    this.char = pieces[Math.floor(Math.random()*pieces.length)];
    this.rotation=Math.random()*360;
    this.opacity = Math.random()*0.8 + 0.2;
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x>canvas.width) this.x=0;
    if(this.x<0) this.x=canvas.width;
    if(this.y>canvas.height) this.y=0;
    if(this.y<0) this.y=canvas.height;
    this.rotation += 0.2;
  }
  draw(){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.rotation*Math.PI/180);
    ctx.globalAlpha = this.opacity;
    ctx.font = `${this.size}px Arial`;
    ctx.fillStyle = 'rgba(244,211,94,0.8)';
    ctx.fillText(this.char, -this.size/2, this.size/2);
    ctx.restore();
  }
}

function init(){
  particlesArray.length = 0;
  for(let i=0;i<50;i++){
    particlesArray.push(new Particle());
  }
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p=>{p.update();p.draw();});
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize',()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});