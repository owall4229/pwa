const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

class Player {
    constructor() {
        this.x = 100;
        this.y = 300;
        this.width = 40;
        this.height = 40;
        this.velocityY = 0;
        this.gravity = 0.5;
        this.isFlipped = false;
    }

    update() {
        if (!this.isFlipped) {
            this.velocityY += this.gravity;
        } else {
            this.velocityY -= this.gravity;
        }

        this.y += this.velocityY;
        if (this.y + this.height > canvas.height) this.y = canvas.height - this.height;
        if (this.y < 0) this.y = 0;
    }

    draw() {
        ctx.fillStyle = "#ff66b2";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const player = new Player();

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        player.isFlipped = !player.isFlipped;
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
