// Gameboard Module
const Gameboard = (() => {
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    const getBoard = () => gameBoard;
    const updateBoard = (index, mark) => {
        if (gameBoard[index] === "") {
            gameBoard[index] = mark;
            return true;
        }
        return false;
    };
    const resetBoard = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
    };
    return { getBoard, updateBoard, resetBoard };
})();

// Player Factory
function createPlayer(name, mark) {
    return { name, mark };
}

// Game Module
const gameFlow = (() => {
    const player1 = createPlayer('X', 'X');
    const player2 = createPlayer('O', 'O');
    const display = document.querySelector('#display');
    display.textContent = `${player1.name} starts!`;
    let currentPlayer = player1;
    let gameOver = false;
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWin = (currentPlayerMark) => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            const board = Gameboard.getBoard();
            if (board[a] === currentPlayerMark &&
                board[b] === currentPlayerMark &&
                board[c] === currentPlayerMark) {
                return true;
            }
        }
        return false;
    };

    const playRound = (index) => {
        if (gameOver) { return };

        if (Gameboard.updateBoard(index, currentPlayer.mark)) {
            if (checkWin(currentPlayer.mark)) {
                display.textContent = `${currentPlayer.name} Wins!`;
                gameOver = true;
                return;
            } else if (Gameboard.getBoard().every(spot => spot !== '')) {
                display.textContent = `It's a Tie!`;
                gameOver = true;
                return;
            }
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
            display.textContent = `It's ${currentPlayer.name}'s turn`;
        } else {
            display.textContent = 'Spot taken! Choose another one.';
        }

    };

    const resetGame = () => {
        Gameboard.resetBoard();
        currentPlayer = player1;
        display.textContent = `${player1.name} starts!`;
        gameOver = false;
    };

    return { playRound, resetGame };
})();

// DOM Handler
const handleUI = (() => {
    const boardBtn = document.querySelectorAll('.boardBtn');
    const actionBtn = document.querySelector('.actionBtn');

    const updateActionBtn = () => {
        if (Gameboard.getBoard()) {
            const isBoardEmpty = Gameboard.getBoard().every(spot => spot === '');
            if (isBoardEmpty) {
                actionBtn.textContent = 'Start';
            } else {
                actionBtn.textContent = 'Restart';
            }
        };
    };

    boardBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            gameFlow.playRound(btn.id);
            btn.textContent = Gameboard.getBoard()[btn.id];
            updateActionBtn();
        });
    });

    actionBtn.addEventListener('click', () => {
        gameFlow.resetGame();
        boardBtn.forEach((btn) => {
            btn.textContent = '';
        });
        updateActionBtn();
    });

    updateActionBtn();
    return {};
})();