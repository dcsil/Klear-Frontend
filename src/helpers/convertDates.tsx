export const translateTime = (date: string) => {
  const dateJs = new Date(date)
  const hour = dateJs.getHours()
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const min = dateJs.getMinutes()
  return `${hour}:${min} ${ampm} ${dateJs.toDateString()}`
}
