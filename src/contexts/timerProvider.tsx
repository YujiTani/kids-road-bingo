import { useState } from "react"

import TimerContext from "@/contexts/timeContext"

// タイマーの動作状況を管理
const TimerProvider = ({ children }: { children: React.ReactNode }) => {
    const [isRunning, setIsRunning] = useState(false)
  
    return (
      <TimerContext.Provider value={{ isRunning, setIsRunning }}>
        {children}
      </TimerContext.Provider>
    )
}

export default TimerProvider
