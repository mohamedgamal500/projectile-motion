const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 200;
canvas.height = window.innerHeight - 130;
let offset = 0;
let prevTime = 0;
let duration = 0;
let animationSpeed = 55;
const x0 = 30;
const y0 = canvas.height - 30;
const angle = document.getElementById("angle");
const speed = document.getElementById("speed");
const g = 0.06;
const start = document.getElementById("start");

let x = x0;
let y = y0;
let begin = false;

let flag = false;

const update = () => {
  if (begin && flag) {
    offset = offset + animationSpeed * duration;
    x = speed.value * Math.cos((-angle.value * Math.PI) / 180) * offset + x0;
    y =
      0.5 * g * offset * offset +
      speed.value * Math.sin((-angle.value * Math.PI) / 180) * offset +
      y0;
    if (x > canvas.width) {
      flag = false;
    }
    if (y > canvas.height) {
      flag = false;
    }
  }
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillText(`Angle : ${angle.value}`, 30, 50);
  ctx.fillText(`Speed : ${speed.value}`, 30, 65);
  ctx.fillText(`X0 : ${x0}`, 30, 80);
  ctx.fillText(`Y0 : ${y0}`, 30, 95);
  ctx.fillText(`X : ${x}`, 30, 110);
  ctx.fillText(`Y : ${y}`, 30, 125);
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
  angle.value = 45;
  speed.value = 5;
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
  flag = true;
});

window.onload = init();
