import { useContext, useEffect, useState } from "react"

import { TimerContext } from "@/contexts/timeContext"

// 秒単位のタイマー
function useSecondsTimer() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const { isRunning } = useContext(TimerContext)

  useEffect(() => {
    if (!isRunning) return
  
    const intervalId = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [isRunning])

  return {
    elapsedTime,
  }
}

export default useSecondsTimer
