import useSecondsTimer from "@/hooks/useSecondsTimer"

// 経過時間を表示するコンポーネント
function ElapsedTimeDisplay() {
  const { elapsedTime } = useSecondsTimer()
  const formatTime = () => {
    const minutes = Math.floor(elapsedTime / 60) 
    const seconds = elapsedTime % 60
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return <>はしったじかん: {formatTime()}</>
}

export default ElapsedTimeDisplay
