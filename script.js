// Gameboard Module
const Gameboard = (function () {
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
const gameFlow = (function () {
    const player1 = createPlayer('player 1', 'X');
    const player2 = createPlayer('player 2', 'O');
    let currentPlayer = player1;
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
                Gameboard.resetBoard();
                return true;
            }
        }
        return false;
    };

    const playRound = (index) => {
        if (Gameboard.updateBoard(index, currentPlayer.mark)) {
            if (checkWin(currentPlayer.mark)) {
                console.log(`${currentPlayer.name} wins!`);
                return;
            }
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
        } else {
            console.log("Spot taken! Choose another.");
        }
    };
    return { playRound };
})();