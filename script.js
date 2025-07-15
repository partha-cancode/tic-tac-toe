const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6]  // Diagonal
];

function startGame() {
  cells.forEach(cell => {
    cell.innerText = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  currentPlayer = 'X';
  gameActive = true;
  message.innerText = '';
}

function handleClick(e) {
  const cell = e.target;
  if (!gameActive) return;

  cell.innerText = currentPlayer;
  if (checkWin(currentPlayer)) {
    message.innerText = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
  } else if (isDraw()) {
    message.innerText = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].innerText === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.innerText !== '');
}

restartBtn.addEventListener('click', startGame);

startGame(); // Start on page load
