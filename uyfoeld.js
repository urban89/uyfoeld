const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const terrainTypes = ['grass', 'water', 'forest', 'mountain'];
const map = [
    ['G', 'G', 'G', 'G'],
    ['G', 'W', 'W', 'G'],
    ['G', 'G', 'G', 'G'],
    ['G', 'W', 'G', 'G']
];


const hexRadius = 30;
const hexHeight = Math.sqrt(3) * hexRadius;
const hexWidth = 2 * hexRadius;
const gridWidth = 10;
const gridHeight = 10;

const tileSize = 50;


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawPlayer();
    requestAnimationFrame(gameLoop);
}




const player = {
    x: 400,
    y: 300,
    size: 20,
    color: 'blue'
};

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp': player.y -= 10; break;
        case 'ArrowDown': player.y += 10; break;
        case 'ArrowLeft': player.x -= 10; break;
        case 'ArrowRight': player.x += 10; break;
    }
});


function drawMap() {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            const tile = map[row][col];
            ctx.fillStyle = tile === 'G' ? 'green' : 'gray';
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }
}

gameLoop();

//creating hexagonal grid

function createHexagonGrid() {
    let hexagons = [];
    for (let row = 0; row < gridHeight; row++) {
        for (let col = 0; col < gridWidth; col++) {
            let x = col * hexWidth * 0.75;
            let y = row * hexHeight + (col % 2) * (hexHeight / 2);
            hexagons.push({ x: x, y: y, terrain: 'grass' });
        }
    }
    return hexagons;
}


function create() {
    let hexagons = createHexagonGrid();
    hexagons.forEach(hex => {
        let graphics = this.add.graphics();
        graphics.fillStyle(0x00ff00, 1);
        drawHexagon(graphics, hex.x, hex.y, hexRadius);
        graphics.fillPath();
    });
}

function drawHexagon(graphics, x, y, radius) {
    const points = [];
    for (let i = 0; i < 6; i++) {
        let angle = Phaser.Math.DegToRad(60 * i);
        points.push({ x: x + radius * Math.cos(angle), y: y + radius * Math.sin(angle) });
    }
    graphics.beginPath();
    graphics.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        graphics.lineTo(points[i].x, points[i].y);
    }
    graphics.lineTo(points[0].x, points[0].y);
    graphics.closePath();
}

function getTerrainColor(terrain) {
    switch (terrain) {
        case 'grass': return 0x00ff00;
        case 'water': return 0x0000ff;
        case 'forest': return 0x006600;
        case 'mountain': return 0x999999;
        default: return 0xffffff;
    }
}
