const gameboard = (function () {
  let board = []; // reset the board

  // create the board array to store the markers
  const createBoard = (size = 9) => {
    board = [];
    for (let i = 0; i < size; i++) {
      board.push("x");
    }
  };

  // get the mos recent board
  const getBoard = () => board;

  return { getBoard, createBoard };
})();

gameboard.createBoard();

console.log(gameboard.getBoard());
