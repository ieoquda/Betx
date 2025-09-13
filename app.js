let balance = 100;
const balanceEl = document.getElementById('balance');
const messageEl = document.getElementById('message');
const playBtn = document.getElementById('playBtn');

function updateBalance() {
  balanceEl.textContent = balance;
}

// Simple Mines Game: 50% chance to win 2.5x
function playGame() {
  if (balance < 10) {
    messageEl.textContent = "❌ Not enough balance!";
    return;
  }

  balance -= 10;
  updateBalance();

  const won = Math.random() > 0.5;

  if (won) {
    balance += 25; // Win $25 (2.5x)
    messageEl.textContent = "🎉 YOU WON $25!";
    messageEl.style.color = "#00ff99";
  } else {
    messageEl.textContent = "💥 You hit a mine! Lost $10.";
    messageEl.style.color = "#ff0000";
  }
}

playBtn.addEventListener('click', playGame);
