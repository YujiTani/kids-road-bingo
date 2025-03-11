import { bingoItems } from "@/../data/bingo-items";
import { BingoCell } from "@/components/bingo-cell";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

type BingoBoardProps = {
	size: 3 | 5;
};

type CellState = {
	item: string;
	marked: boolean;
};

export function BingoBoard({ size }: BingoBoardProps) {
	const [board, setBoard] = useState<CellState[][]>([]);
	const [completedLines, setCompletedLines] = useState<number>(0);
	const [allMarked, setAllMarked] = useState<boolean>(false);

	// Initialize board with random items
	useEffect(() => {
		const shuffled = [...bingoItems].sort(() => 0.5 - Math.random());
		const items = shuffled.slice(0, size * size);

		const newBoard: CellState[][] = [];
		for (let i = 0; i < size; i++) {
			const row: CellState[] = [];
			for (let j = 0; j < size; j++) {
				row.push({
					item: items[i * size + j],
					marked: false,
				});
			}
			newBoard.push(row);
		}

		setBoard(newBoard);
		setCompletedLines(0);
		setAllMarked(false);
	}, [size]);

	const toggleCell = (row: number, col: number) => {
		const newBoard = [...board];
		newBoard[row][col].marked = !newBoard[row][col].marked;
		setBoard(newBoard);

		// Check for completed lines and all cells marked
		checkBingo(newBoard);
		checkAllMarked(newBoard);
	};

	const checkBingo = (currentBoard: CellState[][]) => {
		let lines = 0;

		// Check rows
		for (let i = 0; i < size; i++) {
			if (currentBoard[i].every((cell) => cell.marked)) {
				lines++;
			}
		}

		// Check columns
		for (let j = 0; j < size; j++) {
			let columnComplete = true;
			for (let i = 0; i < size; i++) {
				if (!currentBoard[i][j].marked) {
					columnComplete = false;
					break;
				}
			}
			if (columnComplete) lines++;
		}

		// Check diagonals
		let diagonal1Complete = true;
		let diagonal2Complete = true;

		for (let i = 0; i < size; i++) {
			if (!currentBoard[i][i].marked) diagonal1Complete = false;
			if (!currentBoard[i][size - 1 - i].marked) diagonal2Complete = false;
		}

		if (diagonal1Complete) lines++;
		if (diagonal2Complete) lines++;

		// If new bingo lines were completed, trigger confetti
		if (lines > completedLines) {
			triggerConfetti();
		}

		setCompletedLines(lines);
	};

	const checkAllMarked = (currentBoard: CellState[][]) => {
		const allCellsMarked = currentBoard.every((row) =>
			row.every((cell) => cell.marked),
		);
		if (allCellsMarked && !allMarked) {
			setAllMarked(true);
			// Big celebration when all cells are marked
			setTimeout(() => {
				triggerConfetti();
				setTimeout(triggerConfetti, 300);
				setTimeout(triggerConfetti, 600);
			}, 100);
		}
	};

	const triggerConfetti = () => {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
	};

	return (
		<div className="flex flex-col items-center gap-4">
			<div
				className="grid gap-2 bg-white p-4 rounded-lg shadow-md max-w-[90vw] md:max-w-[600px] aspect-square"
				style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
			>
				{board.map((row, rowIndex) =>
					row.map((cell, colIndex) => (
						<BingoCell
							key={`${rowIndex}-${colIndex}`}
							item={cell.item}
							marked={cell.marked}
							onClick={() => toggleCell(rowIndex, colIndex)}
						/>
					)),
				)}
			</div>

			{completedLines > 0 && (
				<div className="mt-4 p-3 bg-yellow-100 text-yellow-800 font-bold rounded-md text-center">
					{allMarked ? (
						<span className="text-xl">ぜんぶ みつけたね！ すごい！！</span>
					) : (
						<span>{completedLines}本 ビンゴ できたよ！</span>
					)}
				</div>
			)}
		</div>
	);
}
