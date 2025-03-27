const startButton = document.querySelector("#startGame");
const resetButton = document.querySelector("#resetGame");

//Rendering the board after Start the Game is Clicked
startButton.addEventListener("click", () => {
  let board = gameboard.getBoard();

  if (!board.includes("")) {
    gameControl.start();
  } else {
    alert("Game already started! Please reset to start a new game.");
  }
});

resetButton.addEventListener("click", () => {
  gameControl.resetBoard();
});

const gameboard = (function () {
  let board = [];

  const initializeBoard = (size = 9) => {
    board = Array(size).fill("");
  };

  const render = () => {
    let boardHTML = "";
    board.forEach((square, index) => {
      boardHTML += `<div class='square' id='square-${index}'>${square}</div>`;
    });
    document.querySelector(".gameboard").innerHTML = boardHTML;

    let square = document.querySelectorAll(".square");

    square.forEach((square) => {
      square.addEventListener("click", gameControl.handleClick);
    });
  };

  const getBoard = () => board;

  const update = (index, marker) => {
    board[index] = marker;
    render();
  };

  return {
    initializeBoard,
    render,
    getBoard,
    update,
  };
})();

function createPlayer(name, marker) {
  return {
    name,
    marker,
  };
}

const gameControl = (function () {
  let players = [];
  let currentPlayer;
  let gameOver = false;

  const handleClick = (event) => {
    let index = event.target.id.split("-")[1];

    if (gameboard.getBoard()[index] !== "" || gameOver === true) {
      return;
    }

    gameboard.update(index, players[currentPlayer].marker);

    if (gameControl.winControl()) {
      alert(`Player ${players[currentPlayer].name} Wins!`);
      gameOver = true;
    } else if (gameControl.isDraw()) {
      gameOver = true;
      alert(`IS A DRAW, LETS RESET THE GAMEBOARD`);
      gameControl.resetBoard();
    } else {
      gameControl.switchPlayer();
    }
  };

  const switchPlayer = () => {
    if (currentPlayer == 0) {
      currentPlayer = 1;
    } else {
      currentPlayer = 0;
    }
  };

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];
    currentPlayer = 0;
    gameOver = false;

    gameboard.initializeBoard();
    gameboard.render();
  };

  const isDraw = () => {
    let board = gameboard.getBoard();

    return !board.includes("") && !gameControl.winControl();
  };

  const winControl = () => {
    let board = gameboard.getBoard();
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winPatterns.some((pattern) => {
      return pattern.every(
        (index) => board[index] === players[currentPlayer].marker
      );
    });
  };

  const resetBoard = () => {
    gameboard.initializeBoard();
    gameboard.render();
    currentPlayer = 0;
    gameOver = false;
  };

  return {
    start,
    handleClick,
    switchPlayer,
    winControl,
    isDraw,
    resetBoard,
    gameOver,
  };
})();
