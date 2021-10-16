const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 300;
canvas.height = window.innerHeight - 120;
let offset = 0;
let prevTime = 0;
let duration = 0;
let animationSpeed = 300;
const x0 = 0;
const y0 = canvas.height;
const angle = 45;
const speed = 0.7;
const g = 0.0005;

let x = x0;
let y = y0;

const update = () => {
  offset = offset + animationSpeed * duration;
  x = speed * Math.cos((-angle * Math.PI) / 180) * offset + x0;
  y =
    0.5 * g * offset * offset +
    speed * Math.sin((-angle * Math.PI) / 180) * offset +
    y0;
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.fill();
  console.log("offset", offset);
};

const gameLoop = (time) => {
  duration = (time - prevTime) / 1000;
  prevTime = time;
  update();
  draw();
  window.requestAnimationFrame(gameLoop);
};

const init = () => {
  window.requestAnimationFrame(gameLoop);
};

window.onload = init();
