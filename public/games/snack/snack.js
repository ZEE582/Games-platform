// المتغيرات 
let lastRender = 0;
const SNAKE_SPEED = 7;
let snakeBody = [{ x: 11, y: 11 }];
const gameBoard = document.getElementById('game-board');
const gameOverSound = new Audio('/sound/m.mp3');
let newSegments = 0;
let food = randomFoodPosition();
let score = 0;

// متغيرين للتحكم بالحركة
let inputDirection = { x: 0, y: 0 };    // الاتجاه الحالي
let nextDirection = { x: 0, y: 0 };     // الاتجاه القادم من الضغط على الزر

// create score element inside the board
const scoreEl = document.createElement('h1');
scoreEl.id = 'score';
scoreEl.textContent = 'Score';
gameBoard.appendChild(scoreEl);

// ====== game loop ======
function initGame(currTime) {
  window.requestAnimationFrame(initGame);
  const secondsSinceLastRender = (currTime - lastRender) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  lastRender = currTime;

  update();
  draw();
}
window.requestAnimationFrame(initGame);

// ====== update ======
function update() {
  // تحديث الاتجاه الحالي بناء على الضغط الأخير
  inputDirection = nextDirection;

  // زيادة حجم الافعى
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;

  // تحرك الافعى
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  // تحرك الرأس
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;

  // نهاية اللعبة انصدام في الجدار
if ( snakeBody[0].x < 1 || snakeBody[0].x > 20 || snakeBody[0].y < 1 || snakeBody[0].y > 20 ) {
  resetGame();
  return;
}

  // اكل الافعى
  if (onGridEqual(snakeBody[0], food)) {
    newSegments += 1;
    score += 1;
    scoreEl.textContent = 'Score : ' + score;
    food = randomFoodPosition();
  }

  // اصطدام الافعى بنفسه
  for (let i = 1; i < snakeBody.length; i++) {
    if (onGridEqual(snakeBody[0], snakeBody[i])) {
      resetGame();
      break;
    }
  }
}

// الرسم
function draw() {
  gameBoard.innerHTML = '';
  gameBoard.appendChild(scoreEl);

  //  رسم لاكل
  const foodEl = document.createElement('div');
  foodEl.style.gridColumnStart = food.x;
  foodEl.style.gridRowStart = food.y;
  foodEl.classList.add('food');
  gameBoard.appendChild(foodEl);

  // رسم الافعى
  snakeBody.forEach(seg => {
    const el = document.createElement('div');
    el.style.gridColumnStart = seg.x;
    el.style.gridRowStart = seg.y;
    el.classList.add('snake');
    gameBoard.appendChild(el);
  });
}

// حركة
function getInputDirection() { return inputDirection; }
function onGridEqual(p1, p2) { return p1.x === p2.x && p1.y === p2.y; }
function randomFoodPosition() {
  let newPos;
  while (!newPos || snakeBody.some(seg => onGridEqual(seg, newPos))) {
    newPos = { x: Math.floor(Math.random() * 20) + 1, y: Math.floor(Math.random() * 20) + 1 };
  }
  return newPos;
}

// اعادة تشغيل اللعبة
function resetGame() {
  gameOverSound.play();
  snakeBody = [{ x: 11, y: 11 }];
  inputDirection = { x: 0, y: 0 };
  nextDirection = { x: 0, y: 0 };
  newSegments = 0;
  score = 0;
  scoreEl.textContent = 'Score: 0';
  food = randomFoodPosition();
}

// التحكم
window.addEventListener('keydown', e => {
   const c = e.key.toLowerCase();
  if ( c == 'arrowup' && inputDirection.y !== 1) nextDirection = { x: 0, y: -1 };
  else if ( c == 'arrowdown' && inputDirection.y !== -1) nextDirection = { x: 0, y: 1 };
  else if ( c == 'arrowleft' && inputDirection.x !== 1) nextDirection = { x: -1, y: 0 };
  else if ( c == 'arrowright' && inputDirection.x !== -1) nextDirection = { x: 1, y: 0 };
});