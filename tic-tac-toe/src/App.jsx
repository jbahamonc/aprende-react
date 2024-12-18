import { useState } from 'react'

const TURNS = {
  X: 'x',
  O: 'o'
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export default function App () {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] !== null || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // TODO: Arreglar cuando el board este lleno, no se puede ganar
    // check si alguien gano
    WINNER_COMBOS.forEach(([a, b, c], _) => {
      // console.log('pos a:' + a, newBoard[a])
      // console.log('pos b: ' + b, newBoard[b])
      // console.log('pos c:' + c, newBoard[c])

      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(turn)
      }
    })

    // check si se lleno el tablero y nadie gano
    const endGame = newBoard.every(position => position)
    if (endGame) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className='board'>
      <ul className='game'>
        {
        board.map((cell, index) => {
          return <li className='square' key={index} onClick={() => updateBoard(index)}> {cell} </li>
        })
      }
      </ul>
      <section>
        {
          winner !== null && (
            <section className='winner'>
              <div className='text'>
                <h2>{winner === false ? 'Empate' : 'Gano: '}</h2>

                <header className='win'>
                  {winner}
                </header>

                <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
              </div>
            </section>
          )
        }
      </section>
      <section className='turn'>
        <div className={`square ${turn === TURNS.X ? 'is-selected' : ''}`}>
          {TURNS.X}
        </div>
        <div className={`square ${turn === TURNS.O ? 'is-selected' : ''}`}>
          {TURNS.O}
        </div>
      </section>
    </main>
  )
}
