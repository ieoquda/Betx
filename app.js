let balance = 100;
const balanceEl = document.getElementById('balance');
const messageEl = document.getElementById('message');
const playBtn = document.getElementById('playBtn');
const gameGrid = document.getElementById('gameGrid');

function updateBalance() {
  balanceEl.textContent = balance;
}

function createGameGrid() {
  const grid = document.getElementById('gameGrid');
  grid.innerHTML = '';
  grid.style.display = 'grid';

  // Create 25 tiles
  const tiles = [];
  for (let i = 0; i < 25; i++) {
    const tile = document.createElement('div');
    tile.className = 'grid-tile';
    tile.dataset.index = i;
    tile.addEventListener('click', () => revealTile(tile));
    grid.appendChild(tile);
    tiles.push(tile);
  }

  // Place 5 mines randomly
  const mineIndices = [];
  while (mineIndices.length < 5) {
    const index = Math.floor(Math.random() * 25);
    if (!mineIndices.includes(index)) {
      mineIndices.push(index);
    }
  }

  // Mark mines
  mineIndices.forEach(idx => {
    tiles[idx].dataset.mine = 'true';
  });

  // Reset game state
  messageEl.textContent = "Click a tile to reveal!";
  messageEl.style.color = "#fff";
}

function revealTile(tile) {
  const hasMine = tile.dataset.mine === 'true';

  if (hasMine) {
    tile.classList.add('mine');
    tile.textContent = '💣';
    messageEl.textContent = "💥 You hit a mine! Lost $10.";
    messageEl.style.color = "#ff0000";
    balance -= 10;
    updateBalance();
  } else {
    tile.classList.add('safe');
    tile.textContent = '✅';
    messageEl.textContent = "🎉 Safe! You won $25!";
    messageEl.style.color = "#00ff99";
    balance += 25;
    updateBalance();
  }

  // Disable further clicks after game ends
  document.querySelectorAll('.grid-tile').forEach(t => t.removeEventListener('click', revealTile));
}

playBtn.addEventListener('click', () => {
  if (balance < 10) {
    messageEl.textContent = "❌ Not enough balance!";
    return;
  }

  balance -= 10;
  updateBalance();

  createGameGrid();
});
