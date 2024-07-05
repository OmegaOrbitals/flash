const heroCanvas = document.querySelector(".hero-canvas");
const heroCtx = heroCanvas.getContext("2d");

let points = [];
let drawnLines = [];
let mousePos = {};
let isMouse = false;

heroCanvas.height = document.body.clientHeight;
heroCanvas.width = document.body.clientWidth;

heroCtx.lineWidth = 1;
heroCtx.fillStyle = "rgba(200, 200, 200, 0.85)";

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function generatePoints() {
  points = [];

  for(let i = 0; i < (document.body.clientHeight * document.body.clientWidth) / 1500; i++) {
    if(Math.floor(Math.random() * 3) == 1) {
      newPoint();
    }
  }
}

function newPoint() {
  points.push({
    x: randomInt(0, document.body.clientWidth),
    y: randomInt(0, document.body.clientHeight),
    speed: {
      x: randomFloat(-0.5, 0.5),
      y: randomFloat(-0.5, 0.5)
    }
  })
}

function drawPoints() {
  points.forEach((point) => {
    heroCtx.fillRect(point.x - 0.75, point.y - 0.75, 1.5, 1.5);
  })
}

generatePoints();
drawPoints();

document.body.addEventListener("mouseenter", (ev) => {
  isMouse = true;
  mousePos.x = ev.clientX;
  mousePos.y = ev.clientY;
})

document.body.addEventListener("mousemove", (ev) => {
  isMouse = true;
  mousePos.x = ev.clientX;
  mousePos.y = ev.clientY;
})

document.body.addEventListener("mouseleave", (ev) => {
  isMouse = false;
})

setInterval(() => {
  heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

  drawnLines = [];

  points.forEach((point, i) => {
    point.x += point.speed.x;
    point.y += point.speed.y;
    if((point.x >= document.body.clientWidth || point.x <= 0) || (point.y >= document.body.clientHeight || point.y <= 0)) {
      points.splice(i, 1);
      return newPoint();
    }
    heroCtx.fillRect(point.x - 0.75, point.y - 0.75, 1.5, 1.5);
    const distance = Math.sqrt((mousePos.x - point.x) ** 2 + (mousePos.y - point.y) ** 2);
    if(distance < 125) {
      drawnLines.push({
        start: {
          x: mousePos.x,
          y: mousePos.y + window.scrollY
        },
        end: {
          x: point.x,
          y: point.y
        },
        distance: distance
      })
    }
  })

  drawnLines.forEach((line) => {
    if(!isMouse) return;
    heroCtx.strokeStyle = `rgba(230, 230, 230, ${1 - line.distance / 125})`;
    heroCtx.beginPath();
    heroCtx.moveTo(line.start.x, line.start.y);
    heroCtx.lineTo(line.end.x, line.end.y);
    heroCtx.stroke();
  })
}, 1)

window.addEventListener("resize", () => {
  heroCanvas.height = document.body.clientHeight;
  heroCanvas.width = document.body.clientWidth;
  heroCtx.lineWidth = 1;
  heroCtx.fillStyle = "white";

  generatePoints();
  drawPoints();
})