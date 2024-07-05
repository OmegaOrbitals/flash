const heroCanvas = document.querySelector(".hero-canvas");
const heroCtx = heroCanvas.getContext("2d");

let points = [];
let drawnLines = [];
let mousePos = {};

heroCanvas.height = document.body.clientHeight;
heroCanvas.width = document.body.clientWidth;

heroCtx.strokeStyle = "rgba(200, 200, 200, 0.65";
heroCtx.lineWidth = 1;
heroCtx.fillStyle = "white";

function generatePoints() {
  points = [];

  for(let i = 0; i < (document.body.clientHeight * document.body.clientWidth) * 0.0001; i++) {
    newPoint();
  }
}

function newPoint() {
  points.push({
    x: 0,
    y: Math.floor(Math.random() * document.body.clientHeight),
    speed: {
      x: Math.random() * 1
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

document.addEventListener("mousemove", (ev) => {
  mousePos.x = ev.clientX;
  mousePos.y = document.body.scrollTop + ev.clientY;
})

setInterval(() => {
  heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
  drawnLines = [];

  points.forEach((point, i) => {
    point.x += point.speed.x;
    if(point.x > document.body.clientWidth) {
      points.splice(i, 1);
      return newPoint();
    }
    heroCtx.fillRect(point.x - 0.75, point.y - 0.75, 1.5, 1.5);
    const distance = Math.sqrt((mousePos.x - point.x) ** 2 + (mousePos.y - point.y) ** 2);
    if(distance < 150) {
      drawnLines.push({
        start: {
          x: mousePos.x,
          y: mousePos.y
        },
        end: {
          x: point.x,
          y: point.y
        }
      })
    }
  })

  drawnLines.forEach((line) => {
    heroCtx.beginPath();
    heroCtx.moveTo(line.start.x, line.start.y);
    heroCtx.lineTo(line.end.x, line.end.y);
    heroCtx.stroke();
  })
}, 1)

window.addEventListener("resize", () => {
  heroCanvas.height = document.body.clientHeight;
  heroCanvas.width = document.body.clientWidth;
  heroCtx.strokeStyle = "white";
  heroCtx.lineWidth = 1;
  heroCtx.fillStyle = "white";

  generatePoints();
  drawPoints();
})