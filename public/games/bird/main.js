/* ===== Elements ===== */
const ho = document.getElementById("ho");
const xr = document.getElementById("xr");
const bird = document.getElementById("bird");
const scoreText = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

/* ===== Sounds ===== */
const clickSound = new Audio("assets/click.wav");
const jumpSound = new Audio("assets/jump.wav");
const hitSound = new Audio("assets/hit.wav");
const gameOverSound = new Audio("assets/gameover.wav");

/* ===== State ===== */
let gameStarted = false;
let isJumping = false;
let canCollide = false;
let s = 0;

/* ====== Pipes + Score ====== */
xr.addEventListener("animationiteration", () => {
    if (!gameStarted) return;

    let rand = Math.floor(Math.random() * (500 - 150));
    ho.style.top = rand + "px";

    s++;
    scoreText.innerText = s;
});

/* ======== Game Loop ======== */
setInterval(() => {
    applyGravity();
    checkCollision();
}, 10);

/* ======== Gravity ======= */
function applyGravity() {
    let birdTop = parseInt(getComputedStyle(bird).getPropertyValue("top"));

    if (gameStarted && !isJumping) {
        bird.style.top = birdTop + 2 + "px";
        bird.style.transform = "rotate(20deg)";
    }
}

/* ======= Collision ======= */
function checkCollision() {
    if (!gameStarted || !canCollide) return;

    let birdTop = parseInt(getComputedStyle(bird).getPropertyValue("top"));
    let xrLeft = parseInt(getComputedStyle(xr).getPropertyValue("left"));
    let hoTop = parseInt(getComputedStyle(ho).getPropertyValue("top"));

    let hitGround = birdTop >= window.innerHeight - bird.offsetHeight;

    let hitPipe =
        xrLeft > 20 && xrLeft < 90 &&
        (birdTop < hoTop || birdTop > hoTop + 150);

    if (hitGround || hitPipe) {
        hitSound.currentTime = 0;
        hitSound.play();
        setTimeout(gameOver, 150);
    }
}

/* =====================
   Click (Start + Jump)
===================== */
document.addEventListener("click", () => {

    if (!gameStarted && gameOverScreen.style.display !== "flex") {
        gameStarted = true;
        clickSound.currentTime = 0;
        clickSound.play();

        setTimeout(() => {
            canCollide = true;
        }, 900);
    }

    if (isJumping || gameOverScreen.style.display === "flex") return;

    jump();
});

/* =====================
   Jump
===================== */
function jump() {
    jumpSound.currentTime = 0;
    jumpSound.play();

    isJumping = true;
    let jumpTimer = 0;

    let jumpInterval = setInterval(() => {
        let birdTop = parseInt(getComputedStyle(bird).getPropertyValue("top"));
        jumpTimer++;

        if (jumpTimer < 15) {
            bird.style.top = birdTop - 6 + "px";
            bird.style.transform = "rotate(-20deg)";
        } else {
            clearInterval(jumpInterval);
            isJumping = false;
        }
    }, 10);
}

/* =====================
   Game Over
===================== */
function gameOver() {
    gameOverSound.currentTime = 0;
    gameOverSound.play();

    finalScore.innerText = s;
    gameOverScreen.style.display = "flex";

    bird.style.top = "235px";
    xr.style.left = "100%";
    ho.style.left = "100%";

    gameStarted = false;
    canCollide = false;
}

/* =====================
   Restart
===================== */
restartBtn.addEventListener("click", () => {
    gameOverScreen.style.display = "none";

    bird.style.top = "235px";
    xr.style.left = "100%";
    ho.style.left = "100%";

    s = 0;
    scoreText.innerText = s;

    gameStarted = false;
    canCollide = false;
});