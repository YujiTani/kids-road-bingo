import useSecondsTimer from "@/hooks/useSecondsTimer"

// 現在の時間を表示するコンポーネント
function CurrentTimeDisplay() {
  const { elapsedTime } = useSecondsTimer()
  const formatTime = () => {
    const minutes = Math.floor(elapsedTime / 60)
    const seconds = elapsedTime % 60
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return <>経過時間: {formatTime()}</>
}

export default CurrentTimeDisplay
