// game.js
const members = ['bts-member1.png', 'bts-member2.png', 'bts-member3.png', 'bts-member4.png']; // Replace with actual member images
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

// Random member selection
const getRandomMember = () => Math.floor(Math.random() * members.length);

// Show member to hit (appears at the top of the screen)
function showMember() {
  currentMemberIndex = getRandomMember();
  memberToHit.style.backgroundImage = `url(${members[currentMemberIndex]})`;

  // Show the member to hit for 3 seconds
  setTimeout(() => {
    memberToHit.style.backgroundImage = ''; // Hide member after 3 seconds
    animatePipes();  // Start showing members in pipes after 3 seconds
  }, 3000);
}

// Pipe click event logic
pipes.forEach((pipe, index) => {
  pipe.addEventListener('click', function() {
    if (pipe.dataset.memberIndex == currentMemberIndex) {
      score++;
      updateScore();
      showMember(); // Show new member after correct click
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
  showMember(); // Show new member when restarting the game
  resetPipes(); // Reset pipes
});

// Start the game
function startGame() {
  bgMusic.play();
  showMember(); // Start showing member
}

// Animate pipes with members randomly appearing from the pipes
function animatePipes() {
  // Create a random order for the pipes and set members in them
  const randomOrder = [0, 1, 2, 3].sort(() => Math.random() - 0.5); // Random order for pipes
  
  pipes.forEach((pipe, index) => {
    const randomIndex = randomOrder[index]; // Assign random order for pipes
    pipe.dataset.memberIndex = randomIndex;

    // Initially hide the member in the pipe
    pipe.style.backgroundImage = '';
    pipe.style.transition = 'transform 1s ease-out'; // Transition effect for the "pop-up" effect
    pipe.style.transform = 'translateY(100px)'; // Move pipe down initially

    // After a delay, show the member coming out of the pipe
    setTimeout(() => {
      pipe.style.transform = 'translateY(0)';
      pipe.style.backgroundImage = `url(${members[randomIndex]})`;
      pipe.style.backgroundSize = 'cover';
    }, Math.random() * 1500 + 1500);  // Delay random between 1.5s to 3s

    // Hide member and pipe after 3.5 seconds
    setTimeout(() => {
      pipe.style.transform = 'translateY(100px)';
      pipe.style.backgroundImage = ''; // Clear member from pipe
    }, 3500);
  });

  // Show the member for 3 seconds before pipes animate
  showMember();
}

// Reset pipes when restarting the game
function resetPipes() {
  pipes.forEach(pipe => {
    pipe.style.transform = 'translateY(100px)';
    pipe.style.backgroundImage = ''; // Hide the member in pipes
  });
}

startGame(); // Start the game immediately
