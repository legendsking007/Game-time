// game.js
const members = ['bts-member1.png', 'bts-member2.png', 'bts-member3.png', 'bts-member4.png']; // Replace with actual images
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

// Pipe click event logic
pipes.forEach((pipe, index) => {
  pipe.addEventListener('click', function() {
    if (pipe.dataset.memberIndex == currentMemberIndex) {
      score++;
      showMember();
      updateScore();
    } else {
      lives--;
      updateScore();
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
  resetPipes();
});

// Start the game
function startGame() {
  bgMusic.play();
  showMember();
  animatePipes(); // Start pipe animations
}

// Animate pipes by showing members in random pipes
function animatePipes() {
  pipes.forEach((pipe, index) => {
    // Add member index to each pipe
    pipe.dataset.memberIndex = getRandomMember();
    // Initially hide the members in the pipes
    pipe.style.backgroundImage = '';
    pipe.style.backgroundSize = 'cover';
    
    // Show member after a random interval
    setTimeout(() => {
      pipe.style.backgroundImage = `url(${members[pipe.dataset.memberIndex]})`;
      pipe.style.transition = 'background-image 0.5s ease-in-out';
    }, Math.random() * 2000 + 1000);  // Random delay between 1-3 seconds
  });
}

// Reset pipes when restarting the game
function resetPipes() {
  pipes.forEach(pipe => {
    pipe.style.backgroundImage = '';
  });
}

startGame();
