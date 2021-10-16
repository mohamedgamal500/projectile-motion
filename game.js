const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 300;
canvas.height = window.innerHeight - 120;
let offset = 0;
let prevTime = 0;
let duration = 0;
let animationSpeed = 50;
const x0 = 0;
const y0 = canvas.height;
const angle = document.getElementById("angle");
const speed = document.getElementById("speed");
const g = 0.06;
const start = document.getElementById("start");

let x = x0;
let y = y0;
let begin = false;

const update = () => {
  if (begin) {
    offset = offset + animationSpeed * duration;
    x = speed.value * Math.cos((-angle.value * Math.PI) / 180) * offset + x0;
    y =
      0.5 * g * offset * offset +
      speed.value * Math.sin((-angle.value * Math.PI) / 180) * offset +
      y0;
  }
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
  offset = 0;
  window.requestAnimationFrame(gameLoop);
};

start.addEventListener("click", () => {
  if (!begin) {
    start.value = "restart";
  } else {
    start.value = "start";
    x = x0;
    y = y0;
    offset = 0;
    angle.value = 0;
    speed.value = 0;
  }
  begin = !begin;
});

window.onload = init();
