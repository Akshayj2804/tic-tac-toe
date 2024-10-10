// JavaScript 
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add(currentPlayer.toLowerCase());
        
        if (checkWin()) {
            const winningCells = getWinningCells();
            winningCells.forEach(index => {
                document.querySelector(`[data-index="${index}"]`).classList.add('win-animation');
            });
            endGame(`Player ${currentPlayer} wins!`);
        } else if (gameBoard.every(cell => cell !== '')) {
            endGame("It's a draw!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updatePlayerInfo();
            document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function endGame(message) {
    document.getElementById('status').textContent = message;
    gameActive = false;
    document.getElementById('new-game-btn').style.display = 'block';
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function getWinningCells() {
    for (let combination of winningCombinations) {
        if (combination.every(index => gameBoard[index] === currentPlayer)) {
            return combination;
        }
    }
    return [];
}

function updatePlayerInfo() {
    document.getElementById('player-x').classList.toggle('active-player');
    document.getElementById('player-o').classList.toggle('active-player');
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    document.getElementById('status').textContent = "Player X's turn";
    document.getElementById('player-x').classList.add('active-player');
    document.getElementById('player-o').classList.remove('active-player');
    document.getElementById('new-game-btn').style.display = 'none';
    createBoard();
}

function newGame() {
    resetGame();
}

// Initialize the game
createBoard();