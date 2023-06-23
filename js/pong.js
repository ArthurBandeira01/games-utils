// Configuração do canvas
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

// Objeto dos jogadores
const player1 = {
  name: "",
  x: 0,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  color: "#00FF00",
  score: 0,
  upPressed: false,
  downPressed: false,
};

const player2 = {
  name: "",
  x: canvas.width - 10,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  color: "#FF0000",
  score: 0,
  upPressed: false,
  downPressed: false,
};

// Objeto da bola
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 4,
  velocityX: 4,
  velocityY: 4,
  color: "#FFFFFF",
};

// Variáveis do jogo
let gameOver = false;

// Função para desenhar retângulos
function drawRect(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

// Função para desenhar a bola
function drawCircle(x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

// Função para desenhar o texto
function drawText(text, x, y, color) {
  context.fillStyle = color;
  context.font = "45px fantasy";
  context.fillText(text, x, y);
}

// Função para desenhar a rede
function drawNet() {
  for (let i = 0; i <= canvas.height; i += 15) {
    drawRect(canvas.width / 2 - 1, i, 2, 10, "#FFFFFF");
  }
}

// Função para desenhar os elementos do jogo
function render() {
  // Limpar o canvas
  drawRect(0, 0, canvas.width, canvas.height, "#000000");

  // Desenhar a pontuação
  drawText(player1.name + ": " + player1.score, 100, 50, "#FFFFFF");
  drawText(player2.name + ": " + player2.score, canvas.width - 250, 50, "#FFFFFF");

  // Desenhar a rede
  drawNet();

  // Desenhar os jogadores
  drawRect(player1.x, player1.y, player1.width, player1.height, player1.color);
  drawRect(player2.x, player2.y, player2.width, player2.height, player2.color);

  // Desenhar a bola
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// Função para controlar os movimentos dos jogadores
function movePaddles() {
  if (player1.upPressed && player1.y > 0) {
    player1.y -= 5;
  } else if (player1.downPressed && player1.y + player1.height < canvas.height) {
    player1.y += 5;
  }

  if (player2.upPressed && player2.y > 0) {
    player2.y -= 5;
  } else if (player2.downPressed && player2.y + player2.height < canvas.height) {
    player2.y += 5;
  }
}

// Função para atualizar as posições dos elementos
function update() {
  if (!gameOver) {
    // Movimentar a bola
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Lógica de colisão com as bordas verticais
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      ball.velocityY = -ball.velocityY;
    }

    // Lógica de colisão com os jogadores
    if (
      ball.x - ball.radius < player1.x + player1.width &&
      ball.y - ball.radius < player1.y + player1.height &&
      ball.y + ball.radius > player1.y
    ) {
      ball.velocityX = -ball.velocityX;
    }

    if (
      ball.x + ball.radius > player2.x &&
      ball.y - ball.radius < player2.y + player2.height &&
      ball.y + ball.radius > player2.y
    ) {
      ball.velocityX = -ball.velocityX;
    }

    // Verificar se a bola saiu da tela para atualizar a pontuação
    if (ball.x - ball.radius < 0) {
      player2.score++;
      reset();
    }

    if (ball.x + ball.radius > canvas.width) {
      player1.score++;
      reset();
    }
  }
}

// Função para reiniciar o jogo
function reset() {
  if (player1.score >= 5 || player2.score >= 5) {
    gameOver = true;
    document.getElementById("gameOverText").textContent = "Fim de Jogo!";
  } else {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 4;
  }
}

// Função para iniciar o jogo
function startGame() {
  const player1Name = prompt("Digite o nome do Jogador 1:");
  const player2Name = prompt("Digite o nome do Jogador 2:");

  player1.name = player1Name || "Jogador 1";
  player2.name = player2Name || "Jogador 2";

  // Eventos para controlar o movimento dos jogadores
  document.addEventListener("keydown", function(event) {
    if (event.key === "w") {
      player1.upPressed = true;
    } else if (event.key === "s") {
      player1.downPressed = true;
    } else if (event.key === "ArrowUp") {
      player2.upPressed = true;
    } else if (event.key === "ArrowDown") {
      player2.downPressed = true;
    }
  });

  document.addEventListener("keyup", function(event) {
    if (event.key === "w") {
      player1.upPressed = false;
    } else if (event.key === "s") {
      player1.downPressed = false;
    } else if (event.key === "ArrowUp") {
      player2.upPressed = false;
    } else if (event.key === "ArrowDown") {
      player2.downPressed = false;
    }
  });

  // Reiniciar o jogo ao clicar no botão
  document.getElementById("restartButton").addEventListener("click", function() {
    gameOver = false;
    player1.score = 0;
    player2.score = 0;
    startGame();
  });

  // Loop principal do jogo
  function gameLoop() {
    update();
    movePaddles();
    render();
    if (!gameOver) {
      requestAnimationFrame(gameLoop);
    } else {
      document.getElementById("gameOverText").textContent = "Fim de Jogo!";
    }
  }

  gameLoop();
}

startGame();