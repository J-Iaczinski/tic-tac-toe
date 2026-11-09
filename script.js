const gameboard = (function () {
  let board = []; // reset the board

  // create the board array to store the markers
  const createBoard = (size = 9) => {
    board = [];
    for (let i = 0; i < size; i++) {
      board.push(' ');
    }
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

  // get the most recent board
  const getBoard = () => board;

  return { getBoard, createBoard, printBoard };
})();

gameboard.createBoard();

console.log(gameboard.getBoard());
gameboard.printBoard();

const Player = (function () {
  let players = [];
  const createPlayer = (name) => {
    if (players.length >= 2) {
      throw new Error('the maximum number of players are 2');
    }

    const marker = players.length === 0 ? 'x' : 'O';

    const newPlayer = { name, marker };

    players.push(newPlayer);

    return newPlayer;
  };

  const getPlayers = () => players;

  return { createPlayer, getPlayers };
})();

const p1 = Player.createPlayer('josh');
const p2 = Player.createPlayer('miguel');

console.log({ p1 });

console.log(Player.getPlayers());
