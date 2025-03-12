import { useCallback, useEffect, useMemo, useState } from "react"
import { FaMapMarkerAlt, FaFlag } from "react-icons/fa"

import * as Cars from "../assets/img/index"
import BordStart from "./bordStart"

const carImages = [
  Cars.CarBlack,
  Cars.CarBlue,
  Cars.CarGray,
  Cars.CarGreen,
  Cars.CarPink,
  Cars.CarRed,
  Cars.CarSkyblue,
  Cars.CarWhite,
  Cars.CarYellow,
]

type ProgressCarProps = {
  distance: string
  duration: string
}

function ProgressCar({ distance, duration }: ProgressCarProps) {
  const initialProgressMax = useMemo(() => {
    const minutes = Number.parseInt(duration)
    return minutes * 60
  }, [duration])
  
  const initialCarImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * carImages.length)
    return carImages[randomIndex]
  }, [])
  
  const [progressMax] = useState(initialProgressMax)
  const [carImage] = useState(initialCarImage)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const formatTime = () => {
    const mins = Math.floor(elapsedTime / 60)
    const secs = elapsedTime % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const progressPercentage = useMemo(() => {
    return progressMax ? Math.min(100, (elapsedTime / progressMax) * 100) : 0
  }, [elapsedTime, progressMax])

  const startProgress = useCallback(() => {
    setIsRunning(true)
  }, [])

  useEffect(() => {
    if (!isRunning) return;
    
    if (elapsedTime >= progressMax) {
      setIsRunning(false);
      return;
    }
    
    const interval = setInterval(() => {
      setElapsedTime(prev => {
        const newValue = prev + 1;
        if (newValue >= progressMax) {
          setIsRunning(false);
        }
        return Math.min(newValue, progressMax);
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRunning, elapsedTime, progressMax]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-sky-300 to-blue-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 space-y-8">
        <div className="text-center">
          <div className="flex justify-center gap-6 text-gray-600">
            <div className="flex items-center">
              <span className="font-semibold mr-2">距離:</span>
              <span className="bg-blue-100 px-3 py-1 rounded-full">{distance}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">予想時間:</span>
              <span className="bg-blue-100 px-3 py-1 rounded-full">{duration}</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-full">
          {/* 道路のベース */}
          <div className="h-8 bg-gray-300 rounded-full relative">
            {/* 道路の線 */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white border-dashed border-2 border-white" />
            {/* 進行済みの道路 */}
            <div
              className="h-full bg-gray-600 transition-all duration-500 ease-linear"
              style={{ width: `${progressPercentage}%` }}
            />

            {/* スタート地点 */}
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 text-green-600">
              <FaMapMarkerAlt size={24} />
            </div>

            {/* ゴール地点 */}
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 text-red-600">
              <FaFlag size={24} />
            </div>

            {/* 車のアイコン */}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-60 transition-all duration-500 ease-linear"
              style={{ left: `${progressPercentage}%` }}
            >
              <div className="animate-bounce">
                {carImage ? (
                  <img src={carImage} alt="car" className="w-10 h-10 transform scaleX(-1)" />
                ) : (
                  <div className="w-10 h-10 bg-red-500 rounded-full" />
                )}
              </div>
            </div>
          </div>

          {/* 進捗情報 */}
          <div className="flex justify-between mt-6 text-sm text-gray-700">
            <span className="font-medium">出発</span>
            <span className="font-medium">経過時間: {formatTime()}</span>
            <span className="font-medium">到着予定</span>
          </div>
        </div>

        <div className="flex justify-center">
          {!isRunning && elapsedTime < progressMax && (
            // ボードサイズを決めたら、ビンゴを始められるに変更する
            <BordStart handleClick={startProgress} />
          )}
        </div>

        {elapsedTime >= progressMax && (
          <div className="text-center bg-green-100 p-4 rounded-lg">
            <p className="text-xl font-bold text-green-700">目的地に到着しました！</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProgressCar
