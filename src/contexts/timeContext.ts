import { createContext } from "react"

type TimerContextType = {
  isRunning: boolean
  setIsRunning: (isRunning: boolean) => void
}

// タイマーの動作状況を管理
const TimerContext = createContext<TimerContextType>({
  isRunning: false,
  setIsRunning: () => {},
})

export default TimerContext
