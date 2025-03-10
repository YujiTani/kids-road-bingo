import { useEffect, useState } from "react"
import { FaMapMarkerAlt, FaFlag } from 'react-icons/fa';
import * as Cars from '../assets/img/index';
import BordStart from "./bordStart";

const carImages = [
  Cars.CarBlack,
  Cars.CarBlue,
  Cars.CarGray,
  Cars.CarGreen,
  Cars.CarPink,
  Cars.CarRed,
  Cars.CarSkyblue,
  Cars.CarWhite,
  Cars.CarYellow
];

type ProgressCarProps = {
    distance: string
    duration: string
}

function ProgressCar({ distance, duration }: ProgressCarProps) {
  const [progressMax, setProgressMax] = useState(0)
  const [progressValue, setProgressValue] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [carImage, setCarImage] = useState<string | null>(null)

  useEffect(() => {
    const timeString = duration
    const minutes = parseInt(timeString);
    const seconds = minutes * 60;
    const randomIndex = Math.floor(Math.random() * carImages.length);
    setCarImage(carImages[randomIndex]);
    setProgressMax(seconds)
  }, [distance, duration])

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && progressValue < progressMax) {
      interval = setInterval(() => {
        setProgressValue((prev) => {
          if (prev >= progressMax) {
            setIsRunning(false);
            return prev;
          }
          return prev + 1;
        });
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, progressValue, progressMax]);

  function startProgress() {
    setIsRunning(true);
    // スタート時にも車をランダム変更
    const randomIndex = Math.floor(Math.random() * carImages.length);
    setCarImage(carImages[randomIndex]);
  }

  // 経過時間を分:秒形式で表示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // 進捗率を計算
  const progressPercentage = progressMax ? Math.min(100, (progressValue / progressMax) * 100) : 0;

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-sky-300 to-blue-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">ドライブ進行中</h2>
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
        
        {/* かわいい道路のプログレスバー */}
        <div className="relative rounded-full">
          {/* 道路のベース */}
          <div className="h-8 bg-gray-300 rounded-full relative">
            {/* 道路の線 */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white border-dashed border-2 border-white"></div>
            
            {/* 進行済みの道路 */}
            <div 
              className="h-full bg-gray-600 transition-all duration-500 ease-linear"
              style={{ width: `${progressPercentage}%` }}
            >
            </div>
            
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
                  <div className="w-10 h-10 bg-red-500 rounded-full"></div>
                )}
              </div>
            </div>
          </div>
          
          {/* 進捗情報 */}
          <div className="flex justify-between mt-6 text-sm text-gray-700">
            <div>
              <span className="font-medium">出発</span>
            </div>
            <div>
              <span className="font-medium">経過時間: {formatTime(elapsedTime)}</span>
            </div>
            <div>
              <span className="font-medium">到着予定</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <BordStart />
        </div>
        
        {/* スタートボタン */}
        {!isRunning && progressValue < progressMax && (
          <div className="flex justify-center">
            <button 
              onClick={startProgress}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95 flex items-center space-x-2"
            >
              {carImage ? (
                <img src={carImage} alt="car" className="w-6 h-6 mr-2 transform scaleX(-1)" />
              ) : (
                <div className="w-6 h-6 mr-2 bg-white rounded-full"></div>
              )}
              <span>ドライブスタート</span>
            </button>
          </div>
        )}
        
        {/* 完了メッセージ */}
        {progressValue >= progressMax && (
          <div className="text-center bg-green-100 p-4 rounded-lg">
            <p className="text-xl font-bold text-green-700">目的地に到着しました！</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProgressCar