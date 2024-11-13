const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
const gridSize = canvasSize / box;

class Snake {
    constructor() {
        this.body = [{ x: box * 5, y: box * 5 }];
        this.direction = "RIGHT";
    }

    changeDirection(event) {
        if (event.keyCode === 37 && this.direction !== "RIGHT") {
            this.direction = "LEFT";
        } else if (event.keyCode === 38 && this.direction !== "DOWN") {
            this.direction = "UP";
        } else if (event.keyCode === 39 && this.direction !== "LEFT") {
            this.direction = "RIGHT";
        } else if (event.keyCode === 40 && this.direction !== "UP") {
            this.direction = "DOWN";
        } else if (event.keyCode === 32) { // Spacebar for pause/resume
            game.togglePause();
        }
    }

    move() {
        let head = { ...this.body[0] };

        if (this.direction === "LEFT") head.x -= box;
        if (this.direction === "UP") head.y -= box;
        if (this.direction === "RIGHT") head.x += box;
        if (this.direction === "DOWN") head.y += box;

        this.body.unshift(head);

        if (head.x === game.food.x && head.y === game.food.y) {
            game.score++;
            game.speed -= 5;
            game.food = game.generateFood();
            document.getElementById('scoreBoard').innerText = "Score: " + game.score;
        } else {
            this.body.pop();
        }

        if (this.collided(head)) {
            game.end();
        }
    }

    collided(head) {
        if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
            return true;
        }

        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }

        return false;
    }

    draw() {
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillStyle = i === 0 ? "green" : "lightgreen";
            ctx.fillRect(this.body[i].x, this.body[i].y, box, box);
            ctx.strokeStyle = "darkgreen";
            ctx.strokeRect(this.body[i].x, this.body[i].y, box, box);
        }
    }
}

class Food {
    constructor() {
        this.x = Math.floor(Math.random() * gridSize) * box;
        this.y = Math.floor(Math.random() * gridSize) * box;
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, box, box);
        ctx.strokeStyle = "darkred";
        ctx.strokeRect(this.x, this.y, box, box);
    }
}

class Game {
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.score = 0;
        this.speed = 300;
        this.gamePaused = false;
        this.gameInterval = null;

        document.addEventListener("keydown", (event) => this.snake.changeDirection(event));
    }

    start() {
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('gameOverScreen').style.display = 'none';
        this.gameInterval = setInterval(() => this.draw(), this.speed);
    }

    restart() {
        location.reload();
    }

    togglePause() {
        this.gamePaused = !this.gamePaused;
        if (this.gamePaused) {
            clearInterval(this.gameInterval);
            document.getElementById('pauseScreen').style.display = 'block';
        } else {
            document.getElementById('pauseScreen').style.display = 'none';
            this.gameInterval = setInterval(() => this.draw(), this.speed);
        }
    }

    end() {
        clearInterval(this.gameInterval);
        document.getElementById('finalScore').innerText = "Score: " + this.score;
        document.getElementById('gameOverScreen').style.display = 'block';
    }

    draw() {
        if (this.gamePaused) return;

        ctx.clearRect(0, 0, canvasSize, canvasSize);
        this.drawGrid();
        this.snake.move();
        this.snake.draw();
        this.food.draw();
    }

    drawGrid() {
        ctx.strokeStyle = "#e0e0e0";
        for (let i = 0; i <= gridSize; i++) {
            ctx.beginPath();
            ctx.moveTo(i * box, 0);
            ctx.lineTo(i * box, canvasSize);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * box);
            ctx.lineTo(canvasSize, i * box);
            ctx.stroke();
        }
    }

    generateFood() {
        return new Food();
    }
}

const game = new Game();