"use client";

import { BingoBoard } from "@/components/bingo-board";
import { SizeSelector } from "@/components/size-selector";
import { useState } from "react";

const BordStart = () => {
	const [gameStarted, setGameStarted] = useState(false);
	const [boardSize, setBoardSize] = useState<3 | 5>(3);

	const startGame = (size: 3 | 5) => {
		setBoardSize(size);
		setGameStarted(true);
	};

	const resetGame = () => {
		setGameStarted(false);
	};

	return (
		<main className="bg-gray-50 p-4 flex flex-col items-center justify-center">
			{!gameStarted ? (
				<SizeSelector onSelectSize={startGame} />
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
	);
};

export default BordStart;
