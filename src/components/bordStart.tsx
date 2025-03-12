import { useState } from "react"
import { BingoBoard } from "@/components/bingo-board"
import { SizeSelector } from "@/components/size-selector"

type BordStartProps = {
  handleClick: () => void
}

export type BordSize = "mini" | "middle"

const BordStart = ({ handleClick }: BordStartProps) => {
  const [gameStarted, setGameStarted] = useState(false)
  const [boardSize, setBoardSize] = useState<BordSize>("mini")

  const startGame = (size: BordSize) => {
    setBoardSize(size)
    setGameStarted(true)
  }

  const resetGame = () => {
    setGameStarted(false)
  }

  return (
    <main className="bg-gray-50 p-4 flex flex-col items-center justify-center">
      {!gameStarted ? (
        <SizeSelector onSelectSize={startGame} handleClick={handleClick} />
      ) : (
        <>
          <BingoBoard size={boardSize} />
          <button
            onClick={resetGame}
            className="mt-6 px-6 py-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-all duration-200"
          >
            さいしょから やりなおす
          </button>
        </>
      )}
    </main>
  )
}

export default BordStart
