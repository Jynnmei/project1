# Porject 1 - Snowball Game

A game where players race to collect snowballs and reach the bridge first!

## **_Game Concept_**

- Player 1 (human) vs Player 2 (computer-controlled)
- Collect snowballs in the snowfield
- First to carry a snowball to their bridge wins!

## **_How to Play_**

### **Quick Start**

1. Click "Play" to begin

2. Use arrow keys to move (Player 1)

3. Touch a snowball to collect it

4. Reach your bridge while holding a snowball

### **Controls**

| Action          | Key            | Effect                           |
| --------------- | -------------- | -------------------------------- |
| Move Player 1   | ← → ↑ ↓        | Snowfield-only without snowball  |
| Computer Player | Automatic      | Speeds up when carrying snowball |
| Restart Game    | Restart Button | Reset all game states            |

### **Game Rules**

#### 1 - Snowball Collection:

Touch a snowball to pick it up (automatic)

#### 2 - Winning Condition:

- Player 1: Reach the right bridge while holding a snowball

- Player 2 (Computer Player): Automatically tries to reach the left bridge

#### 3 - Movement Limits:

- Without a snowball: Restricted to the snowfield (central area)

- With a snowball: Can access your assigned bridge

## **_Key Functions and Features:_**

### 1 - Game Initialization and Reset:

```
initGame()
```

- Resets player positions and game state.

```
restartGame()
```

- Restarts the game, clearing animations and resetting players.

### 2 - Player Movement:

```
handleKeys(e)
```

- Handles player input for movement (using arrow keys).

```
moveComputerPlayer()
```

- Controls the computer's AI to move randomly when not holding a snowball, and toward a bridge when it holds one.

```
canMoveTo(x, y, hasBall)
```

- Ensures the player can't move outside the defined game area unless they hold a snowball.

### 3 - Snowball Logic:

```
checkCollisions()
```

- Checks if a player collides with a snowball and picks it up.

```
checkOverlap(element1, element2)
```

- Determines if two elements overlap (for collision detection).

```
attachSnowballToPlayer(ball, player, isPlayer1)
```

- Moves the snowball with the player when picked up.

### 4 - End Game Logic:

```
endGame(winner)
```

- Ends the game, displays a winner message, and stops background music while playing the win sound.

### 5 - Game Loop:

```
gameLoop()
```

- The main loop where the computer player moves, checks collisions, and updates the game.

## **_Resources & Attribution_**

### **Audio Assets**

| Resource         | Source                                                                                         | License                                                   |
| ---------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Win Game Sound   | [Freesound: "Win Jingle"](https://freesound.org/people/LittleRobotSoundFactory/sounds/270319/) | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| Background Music | Created with [Suno AI](https://suno.com/create?wid=default)                                    | [Suno Terms](https://suno.com/terms)                      |

### **Visual Assets**

| Resource         | Source                                                                                                                 | License                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Character Design | [YouTube Tutorial](https://www.youtube.com/watch?v=fyi4vfbKEeo)                                                        | Educational Use                                             |
| Sky Background   | [iStock: Blue Sky](https://www.istockphoto.com/vector/blue-sky-with-clouds-background-elegant-gm1455611076-490891776)  | [iStock License](https://www.istockphoto.com/help/licenses) |
| Snowfield Image  | [iStock: Snow Hills](https://www.istockphoto.com/photo/snow-hills-isolated-on-white-background-gm1186875471-335030375) | [iStock License](https://www.istockphoto.com/help/licenses) |
| Button           | [Freepik: GUI Elements](https://www.freepik.com/free-vector/complete-menu-graphical-user-interface-gui_13744641.htm)   | [Freepik License](https://www.freepik.com/free-license)     |

### **Learning Resources**

- [JavaScript Game Movement Tutorial](https://www.youtube.com/watch?v=-kDlv8d6erw)
- [W3Schools Game Movement Guide](https://www.w3schools.com/graphics/game_movement.asp)
- [MDN Game Development Basics](https://developer.mozilla.org/zh-CN/docs/Games/Anatomy)
- [StackOverflow Keyboard Controls](https://stackoverflow.com/questions/72250771/move-player-using-keyboard-in-javascript)
- [Chinese: OSChina Game Loop Guide](https://my.oschina.net/emacs_8734639/blog/17136563)
- [Chinese: 掘金 Game Development](https://juejin.cn/post/7025961194506846244)
- [Chinese: CSDN JavaScript Tutorial](https://blog.csdn.net/m0_70793959/article/details/131584880)
- [Character Animation Tutorial](https://www.youtube.com/watch?v=_MyPLZSGS3s)
