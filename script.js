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

class NPC {
    constructor(x, y, message) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.message = message;
    }

    draw() {
        ctx.fillStyle = "#FFD700"; // Golden NPC color
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    checkInteraction(player) {
        if (Math.abs(player.x - this.x) < 50 && Math.abs(player.y - this.y) < 50) {
            return true;
        }
        return false;
    }
}

const dialogueBox = document.getElementById("dialogueBox");
const dialogueText = document.getElementById("dialogueText");

const player = new Player();
const npc1 = new NPC(300, 250, "Hi there! Welcome to this world!");
const npcs = [npc1];

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        player.isFlipped = !player.isFlipped;
    }
    if (event.code === "KeyE") {
        npcs.forEach(npc => {
            if (npc.checkInteraction(player)) {
                showDialogue(npc.message);
            }
        });
    }
});

function showDialogue(text) {
    dialogueBox.classList.remove("hidden");
    dialogueBox.style.display = "block";
    dialogueText.innerHTML = "";
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            dialogueText.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }
    typeWriter();

    setTimeout(() => {
        dialogueBox.classList.add("hidden");
    }, 3000); // Auto-hide after 3s
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.draw();
    npcs.forEach(npc => npc.draw());
    requestAnimationFrame(gameLoop);
}

gameLoop();
