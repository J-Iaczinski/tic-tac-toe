const gameboard = (function () {
  let board = []; // reset the board

  // create the board array to store the markers
  const createBoard = (size = 9) => {
    board = [];
    for (let i = 0; i < size; i++) {
      board.push(' ');
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
    // console.log(`
    //   ${board[0]} | ${board[1]} | ${board[2]}
    //   ---------
    //   ${board[3]} | ${board[4]} | ${board[5]}
    //   ---------
    //   ${board[6]} | ${board[7]} | ${board[8]}
    //   `);

    //now the print board will print the X or O on the DOM
    const boardCell = document.querySelectorAll('.board-container > div');
    boardCell.forEach((cell) => {
      cell.textContent = board[cell.id];
    });
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
      alert('the maximum number of players are 2');
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
    gameboard.printBoard();
    activePlayer = 0;
  };

  const playerMove = (index) => {
    const currentPlayer = getCurrentPlayer();

    const wasMarked = gameboard.setMarker(index, currentPlayer.marker);

    if (!wasMarked) return;

    gameboard.printBoard();

    if (gameboard.checkWin(currentPlayer.marker)) {
      setTimeout(() => {
        alert(`Congratulations ${currentPlayer.name} Won the Game!`);
        resetGame();
      }, 50);
      return;
    }

    if (gameboard.checkTie()) {
      setTimeout(() => {
        alert('The game is tied!');
        resetGame();
      }, 50);
      return;
    }

    switchPlayer();
  };

  return { playerMove, resetGame };
})();

gameboard.createBoard();
gameboard.printBoard();

const domHandler = (function () {
  const createPlayerDOM = () => {
    const player1 = document.querySelector('#player1');

    const player2 = document.querySelector('#player2');

    const startGame = document.querySelector('#startGame');
    startGame.addEventListener('click', () => {
      //checking if the player 1 and 2 exist
      if (!player2.value || !player1.value) {
        alert('You must enter the name of the players');
        return;
      }
      Player.createPlayer(player1.value);
      Player.createPlayer(player2.value);
      console.log(Player.getPlayers());
    });
  };

  const printMove = () => {
    // first thing is verify if the players array exist
    const boardCell = document.querySelectorAll('.board-container > div');
    boardCell.forEach((cell) => {
      cell.addEventListener('click', () => {
        if (Player.getPlayers().length !== 2) {
          alert(
            'You must insert the name of 2 players to be able to play the game',
          );
          return;
        }

        GameController.playerMove(Number(cell.id));
      });
    });
  };

  return { createPlayerDOM, printMove };
})();

domHandler.createPlayerDOM();
domHandler.printMove();
