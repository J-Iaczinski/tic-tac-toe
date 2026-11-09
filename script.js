const gameboard = (function () {
  let board = []; // reset the board

  // create the board array to store the markers
  const createBoard = (size = 9) => {
    board = [];
    for (let i = 0; i < size; i++) {
      board.push('');
    }
  };

  const setMarker = (index, marker) => {
    if (board[index] === ' ' && 0 <= index && index < 9) {
      board[index] = marker;
      return true;
    }
    console.error('This move is illegal');
    return false;
  };

  const printBoard = () => {
    console.log(`
      ${board[0]} | ${board[1]} | ${board[2]}
      ---------
      ${board[3]} | ${board[4]} | ${board[5]}
      ---------
      ${board[6]} | ${board[7]} | ${board[8]}
      `);
  };

  const checkTie = () => {
    return board.every((e) => e !== ' ');
  };

  const checkWin = (marker) => {
    // winConditions
    // 0 1 2 || 0 4 8 || 0 3 6
    // 3 4 5 || 2 4 6 || 1 5 8
    // 6 7 8 ||       || 2 5 8
    //
    // if one of those combinations with the same marker = win

    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some((combination) => {
      return combination.every((index) => board[index] === marker);
    });
  };

  // get the most recent board
  const getBoard = () => board;

  return { getBoard, createBoard, printBoard, setMarker, checkWin, checkTie };
})();

const Player = (function () {
  let players = [];
  const createPlayer = (name) => {
    if (players.length >= 2) {
      throw new Error('the maximum number of players are 2');
    }

    const marker = players.length === 0 ? 'X' : 'O';

    const newPlayer = { name, marker };

    players.push(newPlayer);

    return newPlayer;
  };

  const getPlayers = () => players;

  return { createPlayer, getPlayers };
})();

const GameController = (function () {
  const players = Player.getPlayers();

  let activePlayer = 0;

  const getCurrentPlayer = () => players[activePlayer];

  const switchPlayer = () => {
    activePlayer = activePlayer === 0 ? 1 : 0;
  };

  const resetGame = () => {
    gameboard.createBoard();
    activePlayer = 0;
  };

  const playerMove = (index) => {
    // First the game controller need to know what player is playing
    // If its 'player[0]' = X and after the move we need to advance to player[1]
    // after each move checkWin for the X or O depending on who played last.
    let currentPlayer = getCurrentPlayer();

    const wasMarked = gameboard.setMarker(index, currentPlayer.marker);

    if (wasMarked) {
      gameboard.printBoard();
      if (gameboard.checkWin(currentPlayer.marker)) {
        console.log(`Congratulations ${currentPlayer.name} Won the Game!`);
        console.log(`Reseting the board...`);
        GameController.resetGame();
      } else if (gameboard.checkTie()) {
        console.log('The game is tied!');
        console.log('Reseting the board...');
        GameController.resetGame();
      } else {
        switchPlayer();
      }
    }
  };

  return { playerMove, resetGame };
})();

const p1 = Player.createPlayer('josh');
const p2 = Player.createPlayer('miguel');

gameboard.createBoard();
gameboard.printBoard();

GameController.playerMove(0);

GameController.playerMove(1);

GameController.playerMove(2);

GameController.playerMove(4);

GameController.playerMove(3);

GameController.playerMove(5);

GameController.playerMove(7);

GameController.playerMove(6);

GameController.playerMove(8);
