import dayjs from 'dayjs'
export const generateExpDate = (): string => {
  const expYear = new Date().getFullYear() + 5
  const year = String(expYear)[2] + String(expYear)[3]
  const month = new Date().getMonth() + 1
  return month < 10 ? `0${month}/${year}` : `${month}/${year}`
}

export const isValidDate = (date: string): boolean => {
  const currentYear = new Date().getFullYear()
  const year = Number(String(currentYear)[2] + String(currentYear)[3])
  const month = new Date().getMonth() + 1

  const arrayDate = date.split('/')
  const expMonth = Number(arrayDate[0])
  const expYear = Number(arrayDate[1])

  if (year > expYear) return false

  if (year === expYear && month > expMonth) return false

  return true
}

export const formatDate = (date: string): string => {
  return dayjs(date).format('DD/MM/YYYY')
}
