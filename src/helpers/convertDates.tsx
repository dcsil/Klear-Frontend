export const translateTime = (date: string) => {
  const dateJs = new Date(date) // UTC time
  dateJs.setHours(dateJs.getHours() + 4) // EST time for mvp
  const hour = dateJs.getHours()
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const min = dateJs.getMinutes()
  return `${Math.abs(hour - 12)}:${min} ${ampm} ${dateJs.toDateString()}`
}
