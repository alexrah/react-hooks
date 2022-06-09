// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageGeneric} from "../hooks/useLocalStorageGeneric";
import "../lib/logger"

type Squares = readonly string[]

function Board() {

    const [squares,setSquares] = useLocalStorageGeneric<Squares>('squares', Array(1).fill(Array(9).fill(null)))
    const [winner,setWinner] = React.useState( '' )
    const [nextValue,setNextValue] = React.useState<readonly string[]>( () => Array(1).fill( Math.floor(Math.random()*100) % 2 ? 'O' : 'X' ))


    const currentSquare = ():Squares => {
        return squares[squares.length - 1];
    }

    const selectSquare = (square:number):void => {
        if(winner){
            return
        }

        const lastMoves = [...currentSquare()];
        if(!lastMoves[square]){
            lastMoves[square] = calculateNextValue();
        }
        setSquares([...squares,lastMoves]);

    }

    React.useEffect(() => {

        const winner = calculateWinner(currentSquare());
        if( winner ){
            setWinner(winner);

        }
    },[squares])

    const restart = () => {
        setSquares( Array(1).fill(Array(9).fill(null)) );
        setWinner('');
    }

    const renderSquare = (i:number) => {
        return (
          <button className="square" onClick={() => selectSquare(i)}>
            {currentSquare()[i]}
          </button>
        )
    }

    // eslint-disable-next-line no-unused-vars
    const calculateNextValue = () => {

        setNextValue((prevValues) => {
            const next = prevValues[prevValues.length - 1] === 'X' ? 'O' : 'X'
            return [...prevValues,next];
        })

        return nextValue[nextValue.length -1];

    }

    const changeHistory = (index:number) => {

        if(index === 0){
            return
        }
        const clonedSquares =  [...squares];
        const slicedSquares = clonedSquares.slice(0,index);
        console.log('changeHistory slicedSquares',slicedSquares);
        setSquares(slicedSquares);

        const clonedNextValue = [...nextValue];
        const slicedNextValue = clonedNextValue.slice(0,index)
        setNextValue(slicedNextValue);


    }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="status">{calculateStatus(winner,currentSquare(),nextValue[nextValue.length -1])}</div>
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
        <div className="history-nav">
            {squares.map((square, index) => {
                if (index > 0) {
                    return <button data-index={index} key={'history-' + Math.floor(Math.random() * 10000)}
                            onClick={() => changeHistory(index)}>Step: {index}</button>
                }
            })}
        </div>
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
