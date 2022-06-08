// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageGeneric} from "../hooks/useLocalStorageGeneric";

type Squares = string[]

function Board() {

    const [squares,setSquares] = useLocalStorageGeneric<string>('tic', Array(9).fill(null))
    const [winner,setWinner] = React.useState( '' )
    const [nextValue,setNextValue] = React.useState( () => Math.floor(Math.random()*100) % 2 ? 'O' : 'X' )

    const selectSquare = (square:number):void => {
        if(winner){
            return
        }
        const clonedSquares = [...squares];
        if(!clonedSquares[square]){
            clonedSquares[square] = calculateNextValue(clonedSquares);
        }
        setSquares(clonedSquares);

    }

    React.useEffect(() => {

        const winner = calculateWinner(squares);
        if( winner ){
            setWinner(winner);

        }
    },[squares])

    const restart = () => {
        setSquares( Array(9).fill(null) );
        setWinner('');
    }

    const renderSquare = (i:number) => {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
    }

    // eslint-disable-next-line no-unused-vars
    const calculateNextValue = (squares:Squares) => {
        // return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'

        setNextValue((prev) => {
            return prev === 'X' ? 'O' : 'X';
        })

        return nextValue;

    }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="status">{calculateStatus(winner,squares,nextValue)}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner:string, squares:Squares, nextValue:string) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}



// eslint-disable-next-line no-unused-vars
function calculateWinner(squares:Squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
