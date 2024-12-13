import { numberOfDays, publicHolidays } from '../constants/calender.js';

export function getNumberOfDays(month) {
  return numberOfDays[month];
}

export function getPublicHolidayDate(month) {
  return publicHolidays[month];
}
