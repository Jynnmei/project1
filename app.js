const gameDiv = document.getElementById("snowfield");
const ply1Div = document.getElementById("player1");
const ply2Div = document.getElementById("player2");
const startBtn = document.getElementById("playBtn");
const restartBtn = document.getElementById("restartBtn");
const snowball1 = document.getElementById("snowball-1");
const snowball2 = document.getElementById("snowball-2");

let ply1LeftAdd = 500;
let ply1TopAdd = -140;

let ply2LeftAdd = 700;
let ply2TopAdd = -130;
let ply2Direction = 1; // 1 for right, -1 for left
let ply2VerticalDirection = -1; // 1 for down, -1 for up

let gameStarted = false;
let gameLoopId;
let snowballAnimationId;
let ply1HasBall = false;
let ply2HasBall = false;
let snowball1AnimationId = null; // 单独管理雪球1的动画
let snowball2AnimationId = null; // 单独管理雪球2的动画

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

  // Reset positions of the players
  ply1LeftAdd = 500;
  ply1TopAdd = -140;
  ply2LeftAdd = 700;
  ply2TopAdd = -130;

  // Reset player styles to initial positions
  ply1Div.style.left = ply1LeftAdd + "px";
  ply1Div.style.top = ply1TopAdd + "px";
  ply2Div.style.left = ply2LeftAdd + "px";
  ply2Div.style.top = ply2TopAdd + "px";

  // Reset snowball position
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
    ply1LeftAdd += 2;
    ply1Div.style.left = ply1LeftAdd + "px";
    if (ply1LeftAdd >= 710) {
      ply1LeftAdd -= 2;
    }
  }
  if (keyPress === "ArrowLeft") {
    console.log("left arrow pressed");
    ply1LeftAdd -= 2;
    ply1Div.style.left = ply1LeftAdd + "px";
    if (ply1LeftAdd <= 500) {
      ply1LeftAdd += 2;
    }
  }

  if (keyPress === "ArrowUp") {
    console.log("up arrow pressed");
    ply1TopAdd -= 2;
    ply1Div.style.top = ply1TopAdd + "px";
    if (ply1TopAdd <= -200) {
      ply1TopAdd += 2;
    }
  }

  if (keyPress === "ArrowDown") {
    console.log("down arrow pressed");
    ply1TopAdd += 2;
    ply1Div.style.top = ply1TopAdd + "px";
    if (ply1TopAdd >= -60) {
      ply1TopAdd -= 2;
    }
  }
}

function moveComputerPlayer() {
  // Horizontal movement
  ply2LeftAdd += ply2Direction * 1;
  ply2Div.style.left = ply2LeftAdd + "px";

  // Change direction if at boundaries
  if (ply2LeftAdd >= 710) {
    ply2Direction = -1;
  } else if (ply2LeftAdd <= 500) {
    ply2Direction = 1;
  }

  // Vertical movement (more random)
  ply2TopAdd += ply2VerticalDirection * 0.7;
  ply2Div.style.top = ply2TopAdd + "px";

  // Change vertical direction randomly or at boundaries
  if (ply2TopAdd <= -200 || ply2TopAdd >= -60 || Math.random() < 0.01) {
    ply2VerticalDirection *= -1;
  }
}

function attachSnowballToPlayer(ball, player, isPlayer1) {
  // 先取消之前的动画（防止重复）
  if (isPlayer1 && snowball1AnimationId) {
    cancelAnimationFrame(snowball1AnimationId);
  } else if (!isPlayer1 && snowball2AnimationId) {
    cancelAnimationFrame(snowball2AnimationId);
  }

  const offsetX = 200; // 调整雪球相对于玩家的偏移量
  const offsetY = 200;

  function updateSnowballPosition() {
    // 如果玩家不再持有球，则停止更新位置
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

    // 保存动画ID（区分雪球1和雪球2）
    if (isPlayer1) {
      snowball1AnimationId = requestAnimationFrame(updateSnowballPosition);
    } else {
      snowball2AnimationId = requestAnimationFrame(updateSnowballPosition);
    }
  }

  cancelAnimationFrame(snowballAnimationId); // Cancel previous animation to avoid interference
  updateSnowballPosition(); // Start new animation
}

function checkCollisions() {
  const ply1 = ply1Div.getBoundingClientRect();
  const ply2 = ply2Div.getBoundingClientRect();
  const ball1 = snowball1.getBoundingClientRect();
  const ball2 = snowball2.getBoundingClientRect();

  // 玩家1只能拾取雪球1
  if (!ply1HasBall && isColliding(ply1, ball1)) {
    console.log("玩家1拿到了雪球1");
    ply1HasBall = true;
    attachSnowballToPlayer(snowball1, ply1Div, true); // true表示玩家1
    return true;
  }

  // 玩家2只能拾取雪球2
  if (!ply2HasBall && isColliding(ply2, ball2)) {
    console.log("玩家2拿到了雪球2");
    ply2HasBall = true;
    attachSnowballToPlayer(snowball2, ply2Div, false); // false表示玩家2
    return true;
  }

  return false;
}

function isColliding(playerRect, ballRect) {
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
