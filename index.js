console.log(`This is my game's js code`);

const Eat = new Audio("music/Eating.wav");
const gameOver = new Audio("music/Explosion2.wav");
const movement = new Audio("music/move1.wav");
let gamemusic = new Audio("music/Music2.wav");
let initial_direction = { x: 0, y: 0 };
let snakebody = [{ x: 12, y: 8 }];
let snakefood = { x: 2, y: 12 };
let lastPaintTime = 0;
let speed = 22;
let score = 0;

// function for fps of game
function fps(ctime) {
  window.requestAnimationFrame(fps);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  } else {
    lastPaintTime = ctime;
  }
  Game();
  gamemusic.play();
}
window.requestAnimationFrame(fps); //Game loop

// snake collide on wall or itself
function isCollide(snake) {
  // if snake eat itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // if snake bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

// game elements
function Game() {
  // if snake eat itself
  if (isCollide(snakebody)) {
    gameOver.play();
    gamemusic.pause();
    alert(`Oops... Gameover!, Press Enter to play again`);
    initial_direction = { x: 0, y: 0 };
    snakebody = [{ x: 12, y: 8 }];
    score = 0;
  }

  // if snake eaten the food update the food and increasing the length of snake
  if (snakebody[0].x === snakefood.x && snakebody[0].y === snakefood.y) {
    score += 1;
    let scoreBoard = document.querySelector(".scoreBoard");
    scoreBoard.innerHTML = "Score:" + score;
    Eat.play();
    snakebody.unshift({
      x: snakebody[0].x + initial_direction.x,
      y: snakebody[0].y + initial_direction.y,
    });
    // updating the food
    let a = 2;
    let b = 16;
    snakefood = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  let i;
  for (i = snakebody.length - 2; i >= 0; i--) {
    // const element = array[i];
    snakebody[i + 1] = { ...snakebody[i] };
  }

  snakebody[0].x += initial_direction.x;
  snakebody[0].y += initial_direction.y;

  let board = document.getElementById("board");
  board.innerHTML = "";
  // function for displaying snake and food
  // Displying snake
  snakebody.forEach((e, index) => {
    let snake_elem = document.createElement("div");
    snake_elem.style.gridRowStart = e.y;
    snake_elem.style.gridColumnStart = e.x;
    if (index === 0) {
      snake_elem.classList.add("Head");
    } else {
      snake_elem.classList.add("Body");
    }
    board.appendChild(snake_elem);
  });

  // Displaying food
  let food_elem = document.createElement("div");
  food_elem.style.gridRowStart = snakefood.y;
  food_elem.style.gridColumnStart = snakefood.x;
  food_elem.classList.add("Food");
  board.appendChild(food_elem);
}

// logic for snake movement
window.addEventListener("keydown", (e) => {
  initial_direction = { x: 0, y: -1 };
  movement.play();
  switch (e.key) {
    case "ArrowUp": //for arrowup movement
      initial_direction.x = 0;
      initial_direction.y = -1;
      break;

    case "ArrowDown": //
      initial_direction.x = 0;
      initial_direction.y = 1;
      break;

    case "ArrowLeft": //for arrowleft movement
      initial_direction.x = -1;
      initial_direction.y = 0;
      break;

    case "ArrowRight": //for arrowright movement
      initial_direction.x = 1;
      initial_direction.y = 0;
      break;

    default:
      break;
  }
});
