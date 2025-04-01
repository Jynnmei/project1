const gameDiv = document.getElementById("snowfield");
const ply1Div = document.getElementById("player1");

document.addEventListener("keydown", handleKeys);

let ply1LeftAdd = 500;
let plyTopAdd = -60;

function handleKeys(e) {
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
    plyTopAdd -= 2;
    ply1Div.style.top = plyTopAdd + "px";
    if (plyTopAdd <= -200) {
      plyTopAdd += 2;
    }
  }

  if (keyPress === "ArrowDown") {
    console.log("down arrow pressed");
    plyTopAdd += 2;
    ply1Div.style.top = plyTopAdd + "px";
    if (plyTopAdd >= -60) {
      plyTopAdd -= 2;
    }
  }
}
