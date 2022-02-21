export const getTrackCurrentTime = (currentTime: number): string => {
  return `${Math.floor(currentTime / 60)}:${currentTime % 60 < 10 ? '0' : ''}${currentTime % 60}`
}
