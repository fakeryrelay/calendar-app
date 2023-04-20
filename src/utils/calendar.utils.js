export const getActualWeek = () => {
  const onejan = new Date(new Date().getFullYear(), 0, 1);
  return Math.ceil((((new Date() - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}


const getFirstMondayDate = () => {
  const onejan = new Date(new Date().getFullYear(), 0, 1);
  for (let i = 0; i < 7; i++) {
    if (onejan.getDay() === 2) {
      return onejan.getDay()
    }
    onejan.setDate(onejan.getDate() + 1)
  }
}


const dayArray = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

export const generateWeekDates = (week) => {
  const startDay = getFirstMondayDate() + 7 * (week - 1)
  const date = new Date(new Date().getFullYear(), 0, startDay)
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    weekDates[i] = {
      name: dayArray[i],
      calendarDate: date.toLocaleDateString('ru-RU')
    }
    date.setDate(date.getDate() + 1)
  }

  return weekDates
}