window.addEventListener("load", function () {
  //(1)获取画布
  const canvas = document.querySelector(".game-canvas");

  //(2)获取画布的能力
  const ctx = canvas.getContext("2d");

  const img1 = new Image();
  img1.src = "/image/sky-background.jpg";
  img1.onload = function () {
    ctx.drawImage(img1, 0, 0);
  };

  const img2 = new Image();
  img2.src = "/image/snow-field.jpg";
  img2.onload = function () {
    ctx.drawImage(
      img2,
      10, // 剪切的 x 坐标
      200, // 剪切的 y 坐标
      50, // 被剪切图像的宽度
      50, // 被剪切图像的高度
      100, // 在画布上放置图像的 x 坐标
      100, // 在画布上放置图像的 y 坐标
      150, // 要使用的图像的宽度。（伸展或缩小图像）
      150 // 要使用的图像的高度。（伸展或缩小图像）
    );
  };

  const x = 1;
  const y = 4.1;
  const img3 = new Image();
  img3.src = "/character/npc1.png";
  img3.onload = function () {
    ctx.drawImage(img3, 0, 0, 32, 32, x * 120, y * 40, 32, 32);
  };

  const a = 1;
  const b = 4.1;
  const img4 = new Image();
  img4.src = "/character/npc3.png";
  img4.onload = function () {
    ctx.drawImage(img4, 0, 0, 32, 32, a * 200, b * 40, 32, 32);
  };
});

// ============================================================================================
window.addEventListener("load", function () {
  const canvas = document.querySelector(".game-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 352;
  canvas.height = 198;

  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener("keydown", (e) => {
        this.game.lastKey = "P" + e.key;
        // console.log(this.game.lastKey);
      });
      window.addEventListener("keyup", (e) => {
        this.game.lastKey = "R" + e.key;
        // console.log(this.game.lastKey);
      });
    }
  }

  // Player1
  class Player1 {
    constructor(game) {
      this.game = game;
      this.spriteWidth = 32;
      this.spriteHeight = 32;
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 3;
      this.frameTimer = 0;
      this.frameInterval = 10; // Adjust this to slow down animation
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.x = 95;
      this.y = 180;
      this.speedX = 0;
      this.speedY = 0;
      this.maxSpeed = 2;
      this.image = new Image();
      this.image.src = "/character/player1.png";
    }
    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    setSpeed(speedX, speedY) {
      this.speedX = speedX;
      this.speedY = speedY;
    }

    update() {
      if (this.game.lastKey == "PArrowLeft") {
        this.setSpeed(-this.maxSpeed, 0);
        this.frameY = 3;
      } else if (this.game.lastKey == "RArrowLeft") {
        this.setSpeed(0, 0);
        this.frameY = 3;
      } else if (this.game.lastKey == "PArrowRight") {
        this.setSpeed(this.maxSpeed, 0);
        this.frameY = 1;
      } else if (this.game.lastKey == "RArrowRight") {
        this.setSpeed(0, 0);
        this.frameY = 1;
      } else if (this.game.lastKey == "PArrowUp") {
        this.setSpeed(0, -this.maxSpeed);
        this.frameY = 2;
      } else if (this.game.lastKey == "RArrowUp") {
        this.setSpeed(0, 0);
        this.frameY = 2;
      } else if (this.game.lastKey == "PArrowDown") {
        this.setSpeed(0, this.maxSpeed);
        this.frameY = 0;
      } else if (this.game.lastKey == "RArrowDown") {
        this.setSpeed(0, 0);
        this.frameY = 0;
      } else {
        this.setSpeed(0, 0);
      }
      this.x += this.speedX;
      this.y += this.speedY;

      // horizontal & vertical walk
      const minX = this.game.leftMargin; // 100 (left boundary)
      const maxX = this.game.width - this.width - this.game.rightMargin; // Correct right boundary
      const minY = this.game.topMargin; // 100 (top boundary)
      const maxY = this.game.height - this.height; // Bottom boundary

      if (this.x < minX) this.x = minX;
      if (this.x > maxX) this.x = maxX;
      if (this.y < minY) this.y = minY;
      if (this.y > maxY) this.y = maxY;

      // sprite animatoion
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    }
  }

  class computerPlayer {
    constructor(game) {
      this.game = game;
      this.spriteWidth = 32;
      this.spriteHeight = 32;
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 3;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.x = 95;
      this.y = 10;
      this.speedX = 0;
      this.speedY = 0;
      this.maxSpeed = 2;
      this.image2 = new Image();
      this.image2.src = "/character/computerPlayer.png";
    }
    draw(context) {
      context.drawImage(
        this.image2,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    setSpeed(speedX, speedY) {
      this.speedX = speedX;
      this.speedY = speedY;
    }

    update() {
      if (this.game.lastKey == "PArrowLeft") {
        this.setSpeed(-this.maxSpeed, 0);
        this.frameY = 3;
      } else if (this.game.lastKey == "RArrowLeft") {
        this.setSpeed(0, 0);
        this.frameY = 3;
      } else if (this.game.lastKey == "PArrowRight") {
        this.setSpeed(this.maxSpeed, 0);
        this.frameY = 1;
      } else if (this.game.lastKey == "RArrowRight") {
        this.setSpeed(0, 0);
        this.frameY = 1;
      } else if (this.game.lastKey == "PArrowUp") {
        this.setSpeed(0, -this.maxSpeed);
        this.frameY = 2;
      } else if (this.game.lastKey == "RArrowUp") {
        this.setSpeed(0, 0);
        this.frameY = 2;
      } else if (this.game.lastKey == "PArrowDown") {
        this.setSpeed(0, this.maxSpeed);
        this.frameY = 0;
      } else if (this.game.lastKey == "RArrowDown") {
        this.setSpeed(0, 0);
        this.frameY = 0;
      } else {
        this.setSpeed(0, 0);
      }
      this.x += this.speedX;
      this.y += this.speedY;

      // horizontal & vertical walk
      const minX = this.game.leftMargin; // 100 (left boundary)
      const maxX = this.game.width - this.width - this.game.rightMargin; // Correct right boundary
      const minY = this.game.topMargin; // 100 (top boundary)
      const maxY = this.game.height - this.height; // Bottom boundary

      if (this.x < minX) this.x = minX;
      if (this.x > maxX) this.x = maxX;
      if (this.y < minY) this.y = minY;
      if (this.y > maxY) this.y = maxY;

      // sprite animatoion
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    }
  }

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.topMargin = 85;
      this.leftMargin = 92;
      this.rightMargin = 92;
      this.lastKey = undefined;
      this.input = new InputHandler(this);
      this.player1 = new Player1(this);
      this.computerPlayer = new computerPlayer(this);
      this.backgroundImg1 = new Image();
      this.backgroundImg1.onload = () => {
        this.render(ctx); 
      };
      this.backgroundImg1.src = "/image/sky-background.jpg";

      this.backgroundImg2 = new Image();
      this.backgroundImg2.onload = () => {
        this.render(ctx);
      };
      this.backgroundImg2.src = "/image/snow-field.jpg";
    }
    render(context) {
      context.drawImage(this.backgroundImg1, 0, 0);

      context.drawImage(
        this.backgroundImg2,
        10, 
        200, 
        50, 
        50, 
        100, 
        100, 
        150, 
        150 
      );

      this.player1.update();
      this.player1.draw(context);

      this.computerPlayer.update();
      this.computerPlayer.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx);
    requestAnimationFrame(animate);
  }
  animate();
});

