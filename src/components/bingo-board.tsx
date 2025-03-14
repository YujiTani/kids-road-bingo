import { useState, useEffect } from "react"
import { BingoCell } from "@/components/bingo-cell"
import { bingoItems } from "@/../data/bingo-items"
import confetti from "canvas-confetti"
import type { BordSize } from "./bordStart"

type CellState = {
  item: string
  image: string
  marked: boolean
}

type BingoBoardProps = {
  size: BordSize
}

export function BingoBoard({ size }: BingoBoardProps) {
  const [board, setBoard] = useState<CellState[][]>([])
  const [completedLines, setCompletedLines] = useState<number>(0)
  const [allMarked, setAllMarked] = useState<boolean>(false)
  const [boardSize] = useState<number>(size === "mini" ? 3 : 4)

  // Initialize board with random items
  useEffect(() => {
    const shuffled = [...bingoItems].sort(() => 0.5 - Math.random())
    const items = shuffled.slice(0, size === "mini" ? 9 : 16)

    const newBoard: CellState[][] = []
    for (let i = 0; i < boardSize; i++) {
      const row: CellState[] = []
      for (let j = 0; j < boardSize; j++) {
        row.push({
          item: items[i * boardSize + j].name,
          image: items[i * boardSize + j].image,
          marked: false,
        })
      }
      newBoard.push(row)
    }

    setBoard(newBoard)
    setCompletedLines(0)
    setAllMarked(false)
  }, [size, boardSize])

  const toggleCell = (row: number, col: number) => {
    const newBoard = [...board]
    newBoard[row][col].marked = !newBoard[row][col].marked
    setBoard(newBoard)

    // Check for completed lines and all cells marked
    checkBingo(newBoard)
    checkAllMarked(newBoard)
  }

  const checkBingo = (currentBoard: CellState[][]) => {
    let lines = 0

    // Check rows
    for (let i = 0; i < boardSize; i++) {
      if (currentBoard[i].every((cell) => cell.marked)) {
        lines++
      }
    }

    // Check columns
    for (let j = 0; j < boardSize; j++) {
      let columnComplete = true
      for (let i = 0; i < boardSize; i++) {
        if (!currentBoard[i][j].marked) {
          columnComplete = false
          break
        }
      }
      if (columnComplete) lines++
    }

    // Check diagonals
    let diagonal1Complete = true
    let diagonal2Complete = true

    for (let i = 0; i < boardSize; i++) {
      if (!currentBoard[i][i].marked) diagonal1Complete = false
      if (!currentBoard[i][boardSize - 1 - i].marked) diagonal2Complete = false
    }

    if (diagonal1Complete) lines++
    if (diagonal2Complete) lines++

    // If new bingo lines were completed, trigger confetti
    if (lines > completedLines) {
      triggerConfetti()
    }

    setCompletedLines(lines)
  }

  const checkAllMarked = (currentBoard: CellState[][]) => {
    const allCellsMarked = currentBoard.every((row) => row.every((cell) => cell.marked))
    if (allCellsMarked && !allMarked) {
      setAllMarked(true)
      // Big celebration when all cells are marked
      setTimeout(() => {
        triggerConfetti()
        setTimeout(triggerConfetti, 300)
        setTimeout(triggerConfetti, 600)
      }, 100)
    }
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="grid gap-1 bg-white max-w-[90vw] md:max-w-[600px] aspect-square"
        style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <BingoCell
              key={`cell-${cell.item}`}
              item={cell.item}
              image={cell.image}
              marked={cell.marked}
              onClick={() => toggleCell(rowIndex, colIndex)}
            />
          )),
        )}
      </div>

      {completedLines > 0 && (
        <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 font-bold rounded-md text-center">
          {allMarked ? (
            <span className="text-base">ぜんぶ みつけたよ！！☺️</span>
          ) : (
            <span className="text-base">すごい！ {completedLines}つ そろったよ！</span>
          )}
        </div>
      )}
    </div>
  )
}
