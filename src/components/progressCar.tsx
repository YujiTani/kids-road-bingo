import { useEffect, useState } from "react"
import { ProgressContainer, ProgressBar, StartButton } from './progressCar.css'

type ProgressCarProps = {
    distance: string
    duration: string
}

function ProgressCar({ distance, duration }: ProgressCarProps) {
const [progressMax, setProgressMax] = useState(0)
const [progressValue, setProgressValue] = useState(0)
const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const timeString = duration
    const minutes = parseInt(timeString);
    const seconds = minutes * 60;
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
  }

  return (
    <div className={ProgressContainer}>
      <progress 
        value={progressValue} 
        max={progressMax}
        className={ProgressBar}
      />
      <button 
        onClick={startProgress}
        className={StartButton}
      >
        スタート
      </button>
    </div>
  )
}

export default ProgressCar