const gameDiv = document.getElementById("snowfield");
const ply1Div = document.getElementById("player1");
const ply2Div = document.getElementById("player2");
const startBtn = document.getElementById("playBtn");
const restartBtn = document.getElementById("restartBtn");
const snowball1 = document.getElementById("snowball-1");
const snowball2 = document.getElementById("snowball-2");

let ply1X = 200;
let ply1Y = 240;

let ply2X = 380;
let ply2Y = 240;
let ply2DirectionX = 1; // 1 for right, -1 for left
let ply2DirectionY = -1; // 1 for down, -1 for up

let gameStarted = false;
let gameLoopId;
let snowballAnimationId;
let ply1HasBall = false;
let ply2HasBall = false;
let snowball1AnimationId = null; 
let snowball2AnimationId = null; 

document.addEventListener("keydown", handleKeys);
playBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

function startGame() {
  gameStarted = true;
  playBtn.disabled = true;
  restartBtn.disabled = false;
  ply1HasBall = false;
  ply2HasBall = false;
  gameLoop();
}

function restartGame() {
  gameStarted = false;
  playBtn.disabled = false;
  restartBtn.disabled = true;
  ply1HasBall = false;
  ply2HasBall = false;

  cancelAnimationFrame(gameLoopId);
  cancelAnimationFrame(snowball1AnimationId);
  cancelAnimationFrame(snowball2AnimationId);

  ply1X = 200;
  ply1Y = 240;
  ply2X = 380;
  ply2Y = 240;

  ply1Div.style.left = ply1X + "px";
  ply1Div.style.top = ply1Y + "px";
  ply2Div.style.left = ply2X + "px";
  ply2Div.style.top = ply2Y + "px";

  snowball1.style.position = "absolute";
  snowball1.style.left = "300px";
  snowball1.style.top = "300px";
  snowball2.style.left = "250px";
  snowball2.style.top = "300px";
}

function handleKeys(e) {
  if (!gameStarted) return;

  let keyPress = e.code;

  if (keyPress === "ArrowRight") {
    console.log("right arrow pressed");
    ply1X += 2;
    ply1Div.style.left = ply1X + "px";
    if (ply1X >= 400) {
      ply1X -= 2;
    }
  }
  if (keyPress === "ArrowLeft") {
    console.log("left arrow pressed");
    ply1X -= 2;
    ply1Div.style.left = ply1X + "px";
    if (ply1X <= 180) {
      ply1X += 2;
    }
  }

  if (keyPress === "ArrowUp") {
    console.log("up arrow pressed");
    ply1Y -= 2;
    ply1Div.style.top = ply1Y + "px";
    if (ply1Y <= 160) {
      ply1Y += 2;
    }
  }

  if (keyPress === "ArrowDown") {
    console.log("down arrow pressed");
    ply1Y += 2;
    ply1Div.style.top = ply1Y + "px";
    if (ply1Y >= 290) {
      ply1Y -= 2;
    }
  }
}

function moveComputerPlayer() {
  if (!gameStarted) return;

  ply2X += ply2DirectionX * 1;
  ply2Div.style.left = ply2X + "px";

  if (ply2X >= 400) {
    ply2DirectionX = -1; 
  } else if (ply2X <= 180) {
    ply2DirectionX = 1; 
  }

  ply2Y += ply2DirectionY * 0.7;
  ply2Div.style.top = ply2Y + "px";

  if (ply2Y <= 160 || ply2Y >= 290 || Math.random() < 0.01) {
    ply2DirectionY *= -1; 
  }
}

setInterval(moveComputerPlayer, 100);

function attachSnowballToPlayer(ball, player, isPlayer1) {
  if (isPlayer1 && snowball1AnimationId) {
    cancelAnimationFrame(snowball1AnimationId);
  } else if (!isPlayer1 && snowball2AnimationId) {
    cancelAnimationFrame(snowball2AnimationId);
  }

  const offsetX = 200; 
  const offsetY = 200;

  function updateSnowballPosition() {
    if ((isPlayer1 && !ply1HasBall) || (!isPlayer1 && !ply2HasBall)) {
      return;
    }

    const playerRect = player.getBoundingClientRect();
    const gameRect = gameDiv.getBoundingClientRect();

    // Calculate the snowball's position relative to the game container
    const relativeLeft = playerRect.left - gameRect.left + offsetX;
    const relativeTop = playerRect.top - gameRect.top + offsetY;

    // Update snowball position
    ball.style.left = relativeLeft + "px";
    ball.style.top = relativeTop + "px";

    if (isPlayer1) {
      snowball1AnimationId = requestAnimationFrame(updateSnowballPosition);
    } else {
      snowball2AnimationId = requestAnimationFrame(updateSnowballPosition);
    }
  }

  cancelAnimationFrame(snowballAnimationId); 
  updateSnowballPosition();
}

function checkCollisions() {
  const ply1 = ply1Div.getBoundingClientRect();
  const ply2 = ply2Div.getBoundingClientRect();
  const ball1 = snowball1.getBoundingClientRect();
  const ball2 = snowball2.getBoundingClientRect();

  if (!ply1HasBall && checkOverlap(ply1, ball1)) {
    console.log("玩家1拿到了雪球1");
    ply1HasBall = true;
    attachSnowballToPlayer(snowball1, ply1Div, true);
    return true;
  }

  if (!ply2HasBall && checkOverlap(ply2, ball2)) {
    console.log("玩家2拿到了雪球2");
    ply2HasBall = true;
    attachSnowballToPlayer(snowball2, ply2Div, false);
    return true;
  }

  return false;
}

function checkOverlap(playerRect, ballRect) {
  return (
    playerRect.left + playerRect.width >= ballRect.left &&
    playerRect.left <= ballRect.left + ballRect.width &&
    playerRect.top + playerRect.height >= ballRect.top &&
    playerRect.top <= ballRect.top + ballRect.height
  );
}

function gameLoop() {
  moveComputerPlayer();

  // if (!ply1HasBall || !ply2HasBall) {
  checkCollisions();
  // }

  gameLoopId = requestAnimationFrame(gameLoop);
}
