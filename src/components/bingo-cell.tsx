type BingoCellProps = {
  item: string
  marked: boolean
  onClick: () => void
}

export function BingoCell({ item, marked, onClick }: BingoCellProps) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center aspect-square p-2 ${
        marked ? "bg-green-50" : "bg-white"
      } border border-gray-200 rounded-md text-center text-xs sm:text-sm md:text-md font-medium text-gray-800 transition-all duration-200 hover:${
        marked ? "bg-green-50" : "bg-gray-50"
      } overflow-hidden`}
    >
      {item}

      {marked && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[70%] h-[70%] border-4 border-red-500 rounded-full opacity-70"></div>
        </div>
      )}
    </button>
  )
}
