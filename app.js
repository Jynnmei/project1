const gameArea = document.getElementById("snowfield");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const startBtn = document.getElementById("playBtn");
const restartBtn = document.getElementById("restartBtn");
const message = document.getElementById("message");
const snowball1 = document.getElementById("snowball-1");
const snowball2 = document.getElementById("snowball-2");
const bgMusic = document.getElementById("bgMusic");
const winSound = document.getElementById("winSound");

let snowball1AnimationId = null;
let snowball2AnimationId = null;

const player1Start = { x: 500, y: 340 };
const player2Start = { x: 700, y: 340 };

let gameState = {
  started: false,
  player1: {
    x: player1Start.x, 
    y: player1Start.y,
    hasBall: false,
  },
  player2: {
    x: player2Start.x,
    y: player2Start.y,
    hasBall: false,
    dirX: 1,
    dirY: -1,
  },
  snowballs: [
    { id: snowball1, x: 300, y: 300, heldBy: null },
    { id: snowball2, x: 320, y: 300, heldBy: null },
  ],
};

const boundaries = {
  snowfield: { minX: 500, maxX: 710, minY: 270, maxY: 410 },
  bridge1: { minX: 516, maxX: 538, minY: 100, maxY: 270 },
  bridge2: { minX: 676, maxX: 692, minY: 100, maxY: 270 },
};

function initGame() {
  gameState.player1 = {
    x: player1Start.x,
    y: player1Start.y,
    hasBall: false,
  };

  gameState.player2 = {
    x: player2Start.x,
    y: player2Start.y,
    hasBall: false,
    dirX: 1,
    dirY: -1,
  };

  gameState.snowballs[0].heldBy = null;
  gameState.snowballs[1].heldBy = null;

  updatePlayerPosition(player1, gameState.player1);
  updatePlayerPosition(player2, gameState.player2);
  updateSnowballPosition(snowball1, gameState.snowballs[0]);
  updateSnowballPosition(snowball2, gameState.snowballs[1]);

  message.textContent = "";
}

function startGame() {
  if (gameState.started) return;

  gameState.started = true;
  playBtn.disabled = true;
  restartBtn.disabled = false;

  bgMusic.volume = 0.5;
  bgMusic.currentTime = 0;
  bgMusic.play();

  gameLoop();
}

function restartGame() {
  gameState.started = false;

  if (snowball1AnimationId) cancelAnimationFrame(snowball1AnimationId);
  if (snowball2AnimationId) cancelAnimationFrame(snowball2AnimationId);
  snowball1AnimationId = null;
  snowball2AnimationId = null;

  initGame();

  playBtn.disabled = false;
  restartBtn.disabled = true;

  message.textContent = "Ready to Play";
}

function updatePlayerPosition(element, player) {
  element.style.left = player.x + "px";
  element.style.top = player.y + "px";
}

function updateSnowballPosition(element, snowball) {
  if (!snowball.heldBy) {
    element.style.left = snowball.x + "px";
    element.style.top = snowball.y + "px";
  }
}

function handleKeys(e) {
  if (!gameState.started) return;

  const key = e.code;
  const player = gameState.player1;
  const baseSpeed = 5;
  let newX = player.x;
  let newY = player.y;

  if (key === "ArrowRight") newX += baseSpeed;
  if (key === "ArrowLeft") newX -= baseSpeed;
  if (key === "ArrowUp") newY -= baseSpeed;
  if (key === "ArrowDown") newY += baseSpeed;

  if (canMoveTo(newX, newY, player.hasBall)) {
    player.x = newX;
    player.y = newY;
    updatePlayerPosition(player1, player);

    console.log("player.y:", player.y);
    console.log("player.x:", player.x);

    if (player.hasBall && isOnBridge2(player)) {
      endGame("player1");
    }
  }
}

function canMoveTo(x, y, hasBall) {
  if (
    x >= boundaries.snowfield.minX &&
    x <= boundaries.snowfield.maxX &&
    y >= boundaries.snowfield.minY &&
    y <= boundaries.snowfield.maxY
  ) {
    return true;
  }

  if (hasBall) {
    if (
      x >= boundaries.bridge2.minX &&
      x <= boundaries.bridge2.maxX &&
      y >= boundaries.bridge2.minY &&
      y <= boundaries.bridge2.maxY
    ) {
      return true;
    }
  }

  return false;
}

function isOnBridge2(player) {
  return (
    player.x >= boundaries.bridge2.minX &&
    player.x <= boundaries.bridge2.maxX &&
    player.y <= boundaries.bridge2.minY
  );
}

function moveComputerPlayer() {
  const computer = gameState.player2;
  const baseSpeed = 1;
  const maxSpeed = 1.5; 

  if (!computer.hasBall) {
    computer.x += clampSpeed(computer.dirX, maxSpeed);
    computer.y += clampSpeed(computer.dirY, maxSpeed);

    if (computer.x > boundaries.snowfield.maxX) computer.dirX = -baseSpeed;
    if (computer.x < boundaries.snowfield.minX) computer.dirX = baseSpeed;
    if (
      computer.y > boundaries.snowfield.maxY ||
      computer.y < boundaries.snowfield.minY
    ) {
      computer.dirY *= -1;
    }

    if (Math.random() < 0.01) {
      computer.dirX += (Math.random() - 0.5) * 0.2;
      computer.dirY += (Math.random() - 0.5) * 0.2;
    }

    computer.x = clamp(
      computer.x,
      boundaries.snowfield.minX,
      boundaries.snowfield.maxX
    );
    computer.y = clamp(
      computer.y,
      boundaries.snowfield.minY,
      boundaries.snowfield.maxY
    );
  } else {
    computer.y -= baseSpeed;

    if (computer.y <= boundaries.bridge1.maxY) {
      computer.x = (boundaries.bridge1.minX + boundaries.bridge1.maxX) / 2;
    }

    if (computer.y <= boundaries.bridge1.minY) {
      computer.y = boundaries.bridge1.minY;
      endGame("player2");
    }
  }

  updatePlayerPosition(player2, computer);
}

function clampSpeed(speed, max) {
  return Math.min(Math.abs(speed), max) * Math.sign(speed);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function checkCollisions() {
  if (!gameState.player1.hasBall && checkOverlap(player1, snowball1)) {
    gameState.player1.hasBall = true;
    gameState.snowballs[0].heldBy = "player1";
    attachSnowballToPlayer(snowball1, player1, true);
    return true;
  }

  if (!gameState.player2.hasBall && checkOverlap(player2, snowball2)) {
    gameState.player2.hasBall = true;
    gameState.snowballs[1].heldBy = "player2";
    attachSnowballToPlayer(snowball2, player2, false);
    return true;
  }
  return false;
}

function checkOverlap(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

function attachSnowballToPlayer(ball, player, isPlayer1) {
  if (isPlayer1 && snowball1AnimationId) {
    cancelAnimationFrame(snowball1AnimationId);
    snowball1AnimationId = null; 
  } else if (!isPlayer1 && snowball2AnimationId) {
    cancelAnimationFrame(snowball2AnimationId);
    snowball2AnimationId = null; 
  }

  const offsetX = 200;
  const offsetY = 200;

  function updateSnowballPosition() {
    if (
      (isPlayer1 && !gameState.player1.hasBall) ||
      (!isPlayer1 && !gameState.player2.hasBall)
    ) {
      return;
    }

    const playerRect = player.getBoundingClientRect();
    const gameRect = gameArea.getBoundingClientRect();

    ball.style.left = playerRect.left - gameRect.left + offsetX + "px";
    ball.style.top = playerRect.top - gameRect.top + offsetY + "px";

    if (isPlayer1) {
      snowball1AnimationId = requestAnimationFrame(updateSnowballPosition);
    } else {
      snowball2AnimationId = requestAnimationFrame(updateSnowballPosition);
    }
  }

  updateSnowballPosition();
}

function endGame(winner) {
  gameState.started = false;

  if (snowball1AnimationId) {
    cancelAnimationFrame(snowball1AnimationId);
    snowball1AnimationId = null;
  }
  if (snowball2AnimationId) {
    cancelAnimationFrame(snowball2AnimationId);
    snowball2AnimationId = null;
  }

  bgMusic.pause();
  bgMusic.currentTime = 0;

  winSound.volume = 1.0;
  winSound.play();

  if (winner === "player1") {
    message.textContent = "Player's Win!";
  } else if (winner === "player2") {
    message.textContent = "Computer Player's Win!";
  }

  restartBtn.disabled = false;
  playBtn.disabled = true;
}

function gameLoop() {
  if (!gameState.started) return;
  moveComputerPlayer();
  checkCollisions();

  if (gameState.player1.hasBall && isOnBridge2(gameState.player1)) {
    endGame("player1");
    return; 
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", handleKeys);
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

initGame();
