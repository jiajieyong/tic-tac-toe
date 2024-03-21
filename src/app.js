import "./styles.css";
import { useState } from "react";

function Square({value, onSquareClick}) {
    return <button className="square" onClick={onSquareClick}>{value}</button>
}

function Board({ xIsTurn, squares, onPlay }) {
    let winner = calculateWinner(squares);

    let currentTurn = xIsTurn ? "X" : "0"
    let status = winner ?  "Winner is " + winner : "current turn is " + currentTurn;

    function calculateWinner(squares) {
        const winningCon = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let i=0; i < winningCon.length; i++) {
            const [a, b ,c] = winningCon[i];

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    function handleClick(i) {
        if(squares[i] || calculateWinner(squares)) {
            return;
        }

        let token = '0';
        if (xIsTurn) {
            token = 'X';
        } else {
            token = '0';
        }

        const selectedSquares = squares.slice();
        selectedSquares[i] = token;
        onPlay(selectedSquares);
    }

    return (
        <>
        <div className="status">{status}</div>
        <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
            <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
            <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </div>
        <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
            <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
            <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>
        <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
            <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
            <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
        </>
    );
  }

  export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currStep, setCurrentStep] = useState(0);
    const xIsTurn = currStep % 2 === 0;
    const currSquares = history[currStep];

    function handlePlay(squares) {
        const nextHistory = [...history.slice(0, currStep + 1), squares];
        setHistory(nextHistory);
        setCurrentStep(nextHistory.length - 1);
    }

    function jumpTo(move) {
        setCurrentStep(move);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = "Go to move #" + move;
        } else {
            description = "Go to game start";
        }
        return <li key={move}><button onClick={() => jumpTo(move)}>{description}</button></li>
    });
    

    return (
        <div className="game">
            <div className="game-board">
            <Board xIsTurn={xIsTurn} squares={currSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
            <ol>{moves}</ol>
            </div>
        </div>
    );
  }