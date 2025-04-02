const gameDiv = document.getElementById("snowfield");
const ply1Div = document.getElementById("player1");
const ply2Div = document.getElementById("player2");
const startBtn = document.getElementById("playBtn");
const restartBtn = document.getElementById("restartBtn");

document.addEventListener("keydown", handleKeys);
playBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

function startGame() {
  gameStarted = true;
  playBtn.disabled = true;
  restartBtn.disabled = false;
  gameLoop();
}

function restartGame() {
  gameStarted = false;
  playBtn.disabled = false;
  restartBtn.disabled = true;

  cancelAnimationFrame(gameLoopId);

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
}

// Player 1
let ply1LeftAdd = 500;
let ply1TopAdd = -140;

// Computer Player 
let ply2LeftAdd = 700;
let ply2TopAdd = -130;
let ply2Direction = 1; 
let ply2VerticalDirection = -1; 

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

// Game loop for computer player
function gameLoop() {
  moveComputerPlayer();
  gameLoopId = requestAnimationFrame(gameLoop);
}

function moveComputerPlayer() {
  ply2LeftAdd += ply2Direction * 1;
  ply2Div.style.left = ply2LeftAdd + "px";

  if (ply2LeftAdd >= 710) {
    ply2Direction = -1;
  } else if (ply2LeftAdd <= 500) {
    ply2Direction = 1;
  }

  ply2TopAdd += ply2VerticalDirection * 0.7;
  ply2Div.style.top = ply2TopAdd + "px";

  if (ply2TopAdd <= -200 || ply2TopAdd >= -60 || Math.random() < 0.01) {
    ply2VerticalDirection *= -1;
  }
}
