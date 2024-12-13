import { numberOfDays, publicHolidays, dayType, dayList } from '../constants/calender.js';

export function getNumberOfDays(month) {
  return numberOfDays[month];
}

export function getPublicHolidayDate(month) {
  return publicHolidays[month];
}

export function getDayType(date, startDay) {
  const dayOffset = dayList.indexOf(startDay);
  const today = dayList[(((date - 1) % 7) + dayOffset) % 7];
  return dayType[today];
}
