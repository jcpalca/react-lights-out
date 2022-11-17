import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = .25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    const initialBoard = [...Array(nrows)].map(
      r => [...Array(ncols)].map(
        (c) => Math.random() < chanceLightStartsOn
          ? true
          : false
      )
    );

    return initialBoard;
  }

  /** Check if the player has won */
  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  /** Flip cells on and around a given cell */
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const newBoard = oldBoard.map(row => [...row]);

      flipCell(y, x, newBoard);
      flipCell(y, x + 1, newBoard);
      flipCell(y, x - 1, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y - 1, x, newBoard);

      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if(hasWon()) {
    return <h1>You Won!</h1>
  }

  // make table board

  // for each item in row, for each item in col => render cell(flipCellsAroundMe, isLit )

  return (
    <table className="board">
      <tbody>
      {
        board.map(
          (row, i) =>
            <tr key={i}>
              {row.map(
                (cell, j) => <Cell
                  key={i + '-' + j}
                  isLit={board[i][j]}
                  flipCellsAroundMe={() => flipCellsAround(i + '-' + j)}/>)}
            </tr>)
      }
      </tbody>
    </table>);
}

export default Board;
