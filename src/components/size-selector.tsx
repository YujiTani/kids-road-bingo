type SizeSelectorProps = {
  onSelectSize: (size: 3 | 5) => void
}

export function SizeSelector({ onSelectSize }: SizeSelectorProps) {
  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-xl shadow-lg max-w-md w-full">
      <h2 className="text-xl font-bold text-gray-700 mb-2">ビンゴの おおきさを えらんでね</h2>
      <div className="flex gap-4 w-full justify-center flex-wrap sm:flex-nowrap">
        <button
          onClick={() => onSelectSize(3)}
          className="flex-1 p-4 bg-green-500 text-white font-bold rounded-md flex flex-col items-center hover:bg-green-600 transition-all duration-200 min-w-[120px]"
        >
          <span className="text-lg">ミニ</span>
          <span className="text-sm">3×3</span>
        </button>
        <button
          onClick={() => onSelectSize(5)}
          className="flex-1 p-4 bg-blue-500 text-white font-bold rounded-md flex flex-col items-center hover:bg-blue-600 transition-all duration-200 min-w-[120px]"
        >
          <span className="text-lg">ミドル</span>
          <span className="text-sm">5×5</span>
        </button>
      </div>
    </div>
  )
}

