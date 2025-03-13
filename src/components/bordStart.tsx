import { useContext, useState } from "react"
import { BingoBoard } from "@/components/bingo-board"
import { SizeSelector } from "@/components/size-selector"
import TimerContext from "@/contexts/timeContext"

type BordStartProps = {
  handleClick: () => void
}

export type BordSize = "mini" | "middle"

const BordStart = ({ handleClick }: BordStartProps) => {
  const { isRunning, setIsRunning } = useContext(TimerContext)
  const [boardSize, setBoardSize] = useState<BordSize>("mini")

  const startGame = (size: BordSize) => {
    setBoardSize(size)
    setIsRunning(true)
  }

  const resetGame = () => {
    setIsRunning(false)
  }

  return (
    <main className="flex flex-col items-center justify-center">
      {!isRunning ? (
        <SizeSelector onSelectSize={startGame} handleClick={handleClick} />
      ) : (
        <>
          <BingoBoard size={boardSize} />
          <button
            type="button"
            onClick={resetGame}
            className="mt-6 mb-4 px-6 py-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-all duration-200"
          >
            やりなおす
          </button>
        </>
      )}
    </main>
  )
}

export default BordStart
