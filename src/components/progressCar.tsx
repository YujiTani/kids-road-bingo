import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { FaMapMarkerAlt, FaFlag } from "react-icons/fa"

import * as Cars from "@/assets/img/index"
import BordStart from "@/components/bordStart"
import ElapsedTimeDisplay from "@/components/currentTimeDisplay"
import TimerContext from "@/contexts/timeContext"
import useSecondsTimer from "@/hooks/useSecondsTimer"

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
    const formattedDuration = duration.replace('時間', ':').replace('分', '')
    const [hours, minutes] = formattedDuration.split(':').map(Number)
    return hours * 60 * 60 + minutes * 60
  }, [duration])

  const initialCarImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * carImages.length)
    return carImages[randomIndex]
  }, [])

  const [progressMax] = useState(initialProgressMax)
  const [carImage] = useState(initialCarImage)
  const { setIsRunning } = useContext(TimerContext)
  const { elapsedTime } = useSecondsTimer()

  const progressPercentage = useMemo(() => {
    return progressMax ? Math.min(100, (elapsedTime / progressMax) * 100) : 0
  }, [progressMax, elapsedTime])

  const startProgress = useCallback(() => {
    setIsRunning(true)
  }, [setIsRunning])

  useEffect(() => {
    if (elapsedTime >= progressMax) {
      setIsRunning(false)
    }
  }, [elapsedTime, progressMax, setIsRunning])

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-sky-300 to-blue-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 space-y-8">
        <div className="text-center">
          <div className="flex justify-center gap-6 text-gray-600">
            <div className="flex items-center">
              <span className="font-semibold mr-2">きょり:</span>
              <span className="bg-blue-100 px-3 py-1 rounded-full">{distance}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">じかん:</span>
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
          <div className="mt-6 text-sm text-center text-gray-700">
            <ElapsedTimeDisplay />
          </div>
        </div>

        <div className="flex justify-center">
          <BordStart handleClick={startProgress} />
        </div>

        {elapsedTime >= progressMax && (
          <div className="text-center bg-green-100 p-4 rounded-lg">
            <p className="text-xl font-bold text-green-700">とうちゃく！</p>
            <small className="text-gray-500 font-bold">がんばったね！</small>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProgressCar
