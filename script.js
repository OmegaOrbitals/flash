const heroCanvas = document.querySelector(".hero-canvas");
const heroCtx = heroCanvas.getContext("2d");

let points = [];
let drawnLines = [];

heroCanvas.height = window.innerHeight;
heroCanvas.width = window.innerWidth;

heroCtx.strokeStyle = "white";
heroCtx.lineWidth = 1;
heroCtx.fillStyle = "white";

function generatePoints() {
  points = [];

  for(let i = 0; i < (window.innerHeight * window.innerWidth) * 0.0001; i++) {
    points.push([Math.floor(Math.random() * window.innerWidth), Math.floor(Math.random() * window.innerHeight)]);
  }
}

function drawPoints() {
  points.forEach((point) => {
    heroCtx.fillRect(point[0] - 0.75, point[1] - 0.75, 1.5, 1.5);
  })
}

generatePoints();
drawPoints();

document.addEventListener("mousemove", (ev) => {
  heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

  drawnLines = [];

  points.forEach((point) => {
    heroCtx.fillRect(point[0] - 0.75, point[1] - 0.75, 1.5, 1.5);
    const distance = Math.sqrt((ev.clientX - point[0]) ** 2 + (ev.clientY - point[1]) ** 2);
    if(distance < 150) {
      drawnLines.push({
        start: [ev.clientX, ev.clientY],
        end: [point[0], point[1]]
      })
    }
  })

  drawnLines.forEach((line) => {
    heroCtx.beginPath();
    heroCtx.moveTo(line.start[0], line.start[1]);
    heroCtx.lineTo(line.end[0], line.end[1]);
    heroCtx.stroke();
  })
})

window.addEventListener("resize", () => {
  heroCanvas.height = window.innerHeight;
  heroCanvas.width = window.innerWidth;
  heroCtx.strokeStyle = "white";
  heroCtx.lineWidth = 1;
  heroCtx.fillStyle = "white";

  generatePoints();
  drawPoints();
})