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
// newscript

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

  class npc1 {
    constructor(game) {
      this.game = game;
      this.width = 32;
      this.height = 32;
      this.x = 150;
      this.y = 150;
      this.speedX = 0;
      this.speedY = 0;
      this.maxSpeed = 1;
    }
    draw(context) {
      context.fillStyle = "red";
      context.fillRect(this.x, this.y, this.width, this.height);
    }
    setSpeed(speedX, speedY) {
      this.speedX = speedX;
      this.speedY = speedY;
    }

    update() {
      if (this.game.lastKey == "PArrowLeft") {
        this.setSpeed(-this.maxSpeed, 0);
      } else if (this.game.lastKey == "PArrowRight") {
        this.setSpeed(this.maxSpeed, 0);
      } else if (this.game.lastKey == "PArrowUp") {
        this.setSpeed(0, -this.maxSpeed);
      } else if (this.game.lastKey == "PArrowDown") {
        this.setSpeed(0, this.maxSpeed);
      } else {
        this.setSpeed(0, 0);
      }
      this.x += this.speedX;
      this.y += this.speedY;

      //   horizontal
        if (this.x < 0) {
          this.x = 0;
        } else if (this.x > this.game.width - this.width) {
          this.x = this.game.width - this.width;
        }
      //   vertical
      if (this.y < this.game.topMargin) {
        this.y = this.game.topMargin;
      }
    }
  }

  class npc3 {}

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.topMargin = 150;
      this.lastKey = undefined;
      this.input = new InputHandler(this);
      this.npc1 = new npc1(this);
      this.backgroundImg1 = new Image();
      this.backgroundImg1.onload = () => {
        this.render(ctx); // 图片加载完成后再渲染
      };
      this.backgroundImg1.src = "/image/sky-background.jpg";

      this.backgroundImg2 = new Image();
      this.backgroundImg2.onload = () => {
        this.render(ctx); // 图片加载完成后再渲染
      };
      this.backgroundImg2.src = "/image/snow-field.jpg";
    }
    render(context) {
      context.drawImage(this.backgroundImg1, 0, 0);
      context.drawImage(
        this.backgroundImg2,
        10, // 剪切的 x 坐标
        200, // 剪切的 y 坐标
        50, // 被剪切图像的宽度
        50, // 被剪切图像的高度
        100, // 在画布上放置图像的 x 坐标
        100, // 在画布上放置图像的 y 坐标
        150, // 要使用的图像的宽度。（伸展或缩小图像）
        150 // 要使用的图像的高度。（伸展或缩小图像）
      );

      this.npc1.update();
      this.npc1.draw(context);
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

