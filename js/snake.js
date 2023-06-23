 // Configurações do jogo
      const canvas = document.getElementById("gameCanvas");
      const context = canvas.getContext("2d");
      const gridSize = 20;
      const snakeColor = "lime";
      const appleColor = "red";
      const speed = 200;

      // Estado inicial do jogo
let snake = [{ x: 10, y: 10 }];
let apple = { x: 15, y: 15 };
let direction = "right";
let score = 0;
let highScore = 0;
let gameOver = false;

// Função para desenhar a cobra e a maçã
function draw() {
    // Limpa o canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a cobra
    snake.forEach(segment => {
        context.fillStyle = snakeColor;
        context.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Desenha a maçã
    context.fillStyle = appleColor;
    context.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
}

// Função para atualizar o estado do jogo
function update() {
    // Verifica se o jogo já acabou
    if (gameOver) return;

    // Move a cobra
    const head = { x: snake[0].x, y: snake[0].y };
    if (direction === "right") head.x++;
    if (direction === "left") head.x--;
    if (direction === "up") head.y--;
    if (direction === "down") head.y++;
    snake.unshift(head);

    // Verifica se a cobra colidiu com as bordas ou com ela mesma
    if (
        head.x < 0 ||
        head.x >= canvas.width / gridSize ||
        head.y < 0 ||
        head.y >= canvas.height / gridSize ||
        isSnakeCollision()
    ) {
        gameOver = true;
        showGameOver();
        playGameOverSound();
    }

    // Verifica se a cobra comeu a maçã
    if (head.x === apple.x && head.y === apple.y) {
        // Gera uma nova posição para a maçã
        apple.x = Math.floor(Math.random() * (canvas.width / gridSize));
        apple.y = Math.floor(Math.random() * (canvas.height / gridSize));

        // Aumenta a pontuação
        score++;
        updateScore();
        playEatAppleSound();
    } else {
        // Remove o último segmento da cobra
        snake.pop();
    }
}

// Verifica se a cobra colidiu consigo mesma
function isSnakeCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

// Função para lidar com as teclas pressionadas
function handleKeyPress(event) {
    if (event.key === "ArrowRight" && direction !== "left")
        direction = "right";
    else if (event.key === "ArrowLeft" && direction !== "right")
        direction = "left";
    else if (event.key === "ArrowUp" && direction !== "down")
        direction = "up";
    else if (event.key === "ArrowDown" && direction !== "up")
        direction = "down";
    else if (event.key === "d" && direction !== "left")
        direction = "right";
    else if (event.key === "a" && direction !== "right")
        direction = "left";
    else if (event.key === "w" && direction !== "down")
        direction = "up";
    else if (event.key === "s" && direction !== "up")
        direction = "down";

    if (event.key === "Enter" && gameOver)
        restartGame();
}

// Reinicia o jogo
function restartGame() {
    // Atualiza a maior pontuação, se necessário
    if (score > highScore) {
        highScore = score;
        updateHighScore();
    }

    snake = [{ x: 10, y: 10 }];
    apple = { x: 15, y: 15 };
    direction = "right";
    score = 0;
    gameOver = false;
    updateScore();
    hideGameOver();
    playRestartSound();
}

// Exibe a tela de game over
function showGameOver() {
    const scoreContainer = document.getElementById("scoreContainer");
    scoreContainer.innerText = "Game Over. Pontuação final: " + score + ". Pressione Enter para Reiniciar.";
}

// Esconde a tela de game over
function hideGameOver() {
    const scoreContainer = document.getElementById("scoreContainer");
    scoreContainer.innerText = "Pontuação: " + score;
}

// Atualiza a pontuação exibida
function updateScore() {
    const scoreContainer = document.getElementById("scoreContainer");
    scoreContainer.innerText = "Pontuação: " + score;
}

// Atualiza a maior pontuação exibida
function updateHighScore() {
    const highScoreContainer = document.getElementById("highScoreContainer");
    highScoreContainer.innerText = "Maior Pontuação: " + highScore;
}

// Reproduz o som de game over
function playGameOverSound() {
    const gameOverSound = document.getElementById("gameOverSound");
    gameOverSound.pause();
    gameOverSound.currentTime = 0;
    gameOverSound.play();
}

// Reproduz o som ao comer a maçã
function playEatAppleSound() {
    const eatAppleSound = document.getElementById("eatAppleSound");
    eatAppleSound.pause();
    eatAppleSound.currentTime = 0;
    eatAppleSound.play();
}

// Inicia o jogo
function startGame() {
    document.addEventListener("keydown", handleKeyPress);
    setInterval(() => {
        update();
        draw();
    }, speed);
}

startGame();