const levels = [
  {
    size: 3,
    pattern: [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1]
    ],
    hint: "先尝试点四个角，观察中间区域怎么变化。"
  },
  {
    size: 4,
    pattern: [
      [0, 1, 0, 1],
      [1, 0, 0, 0],
      [0, 0, 1, 0],
      [1, 0, 0, 1]
    ],
    hint: "从边缘开始试，常常更容易看出规律。"
  },
  {
    size: 4,
    pattern: [
      [0, 0, 0, 0],
      [1, 1, 0, 1],
      [0, 1, 0, 0],
      [1, 0, 1, 0]
    ],
    hint: "把棋盘想成十字影响范围，一次只修一行。"
  },
  {
    size: 5,
    pattern: [
      [1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1],
      [1, 0, 0, 0, 0],
      [0, 0, 1, 0, 1],
      [1, 0, 1, 0, 0]
    ],
    hint: "有时先把最亮的一列整理好，后面会顺很多。"
  },
  {
    size: 5,
    pattern: [
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1],
      [0, 0, 0, 0, 0],
      [1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0]
    ],
    hint: "最后一关适合从中心向外整理。"
  }
];

const boardElement = document.getElementById("board");
const levelLabel = document.getElementById("levelLabel");
const moveLabel = document.getElementById("moveLabel");
const bestLabel = document.getElementById("bestLabel");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restartButton");
const hintButton = document.getElementById("hintButton");
const nextButton = document.getElementById("nextButton");

const bestScores = JSON.parse(localStorage.getItem("lights-best-scores") || "{}");

let levelIndex = 0;
let moves = 0;
let board = [];
let solved = false;

function clonePattern(pattern) {
  return pattern.map((row) => row.slice());
}

function toggleCell(row, col) {
  const level = levels[levelIndex];
  const offsets = [
    [0, 0],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  for (const [rowOffset, colOffset] of offsets) {
    const nextRow = row + rowOffset;
    const nextCol = col + colOffset;

    if (nextRow >= 0 && nextRow < level.size && nextCol >= 0 && nextCol < level.size) {
      board[nextRow][nextCol] = board[nextRow][nextCol] ? 0 : 1;
    }
  }
}

function isSolved() {
  return board.every((row) => row.every((cell) => cell === 1));
}

function saveBestScore() {
  const key = `level-${levelIndex}`;
  const previousBest = bestScores[key];

  if (!previousBest || moves < previousBest) {
    bestScores[key] = moves;
    localStorage.setItem("lights-best-scores", JSON.stringify(bestScores));
  }
}

function updateStatus() {
  const best = bestScores[`level-${levelIndex}`];
  levelLabel.textContent = `${levelIndex + 1} / ${levels.length}`;
  moveLabel.textContent = String(moves);
  bestLabel.textContent = best ? `${best} 步` : "-";
  nextButton.disabled = !solved;
}

function updateMessage(text, win = false) {
  messageElement.textContent = text;
  messageElement.classList.toggle("is-win", win);
}

function renderBoard() {
  const level = levels[levelIndex];
  boardElement.innerHTML = "";
  boardElement.style.setProperty("--size", String(level.size));

  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `tile${cell ? " is-on" : ""}`;
      button.setAttribute("role", "gridcell");
      button.setAttribute("aria-label", `第 ${rowIndex + 1} 行，第 ${colIndex + 1} 列，${cell ? "亮着" : "熄灭"}`);
      button.addEventListener("click", () => handleMove(rowIndex, colIndex));
      boardElement.appendChild(button);
    });
  });
}

function resetLevel() {
  const level = levels[levelIndex];
  board = clonePattern(level.pattern);
  moves = 0;
  solved = false;
  updateMessage("让所有灯都亮起来。");
  updateStatus();
  renderBoard();
}

function handleMove(row, col) {
  if (solved) {
    return;
  }

  toggleCell(row, col);
  moves += 1;
  solved = isSolved();

  if (solved) {
    saveBestScore();
    updateMessage(`过关了，你用了 ${moves} 步。继续挑战下一关吧。`, true);
  } else {
    updateMessage("继续尝试，把所有灯点亮。");
  }

  updateStatus();
  renderBoard();
}

restartButton.addEventListener("click", resetLevel);

hintButton.addEventListener("click", () => {
  updateMessage(`提示：${levels[levelIndex].hint}`);
});

nextButton.addEventListener("click", () => {
  if (!solved) {
    return;
  }

  levelIndex = (levelIndex + 1) % levels.length;
  resetLevel();
});

resetLevel();
