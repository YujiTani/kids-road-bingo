type RouteInfoProps = {
  handleClosePopup: () => void
  handleShowProgressBar: () => void
  distance: string
  duration: string
}

function RouteInfo({ handleClosePopup, handleShowProgressBar, distance, duration }: RouteInfoProps) {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-72 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex justify-between items-center bg-blue-600 text-white p-3">
        <h3 className="font-bold text-lg">ルート情報</h3>
        <button
          type="button"
          onClick={handleClosePopup}
          className="text-white hover:bg-blue-700 rounded-full h-8 w-8 flex items-center justify-center transition-colors"
        >
          ×
        </button>
      </div>

      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2 p-2 bg-gray-50 rounded-lg">
          <div className="text-gray-600 font-medium">距離</div>
          <div className="text-blue-700 font-bold text-right">{distance}</div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2 bg-gray-50 rounded-lg">
          <div className="text-gray-600 font-medium">時間</div>
          <div className="text-blue-700 font-bold text-right">{duration}</div>
        </div>
      </div>

      <div className="flex justify-between p-4 bg-gray-50 border-t border-gray-200">
        <button
          type="button"
          onClick={handleShowProgressBar}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
        >
          スタート
        </button>
        <button
          type="button"
          onClick={handleClosePopup}
          className="border border-gray-300 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-full transition-colors"
        >
          キャンセル
        </button>
      </div>
    </div>
  )
}

export default RouteInfo
