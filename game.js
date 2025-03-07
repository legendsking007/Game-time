// game.js
const members = ['bts-member1.png', 'bts-member2.png', 'bts-member3.png', 'bts-member4.png']; // Add more member images here.
let score = 0;
let lives = 3;
let currentMemberIndex;
let memberToHit = document.getElementById("member-to-hit");
let scoreBoard = document.getElementById("score-board");
let gameOverScreen = document.getElementById("game-over");
let finalScore = document.getElementById("final-score");
let restartButton = document.getElementById("restart-button");
let bgMusic = document.getElementById("bg-music");
let pipes = document.querySelectorAll('.pipe');

const getRandomMember = () => Math.floor(Math.random() * members.length);

// Show member to hit
function showMember() {
  currentMemberIndex = getRandomMember();
  memberToHit.style.backgroundImage = `url(${members[currentMemberIndex]})`;
}

// Handle tapping on pipes
pipes.forEach(pipe => {
  pipe.addEventListener('click', function() {
    if (pipe.dataset.memberIndex == currentMemberIndex) {
      score++;
      showMember();
      updateScore();
    } else {
      lives--;
      if (lives <= 0) {
        endGame();
      }
    }
  });
});

// Update score display
function updateScore() {
  scoreBoard.textContent = `Score: ${score} | Lives: ${lives}`;
}

// End the game
function endGame() {
  bgMusic.pause();
  finalScore.textContent = score;
  gameOverScreen.style.display = 'block';
}

// Restart game
restartButton.addEventListener('click', function() {
  score = 0;
  lives = 3;
  gameOverScreen.style.display = 'none';
  bgMusic.play();
  updateScore();
  showMember();
});

// Start the game
function startGame() {
  bgMusic.play();
  showMember();
}

startGame();
