import throwError from './throwError.js';
import { INVALID_MONTHLY } from '../constants/error.js';

export function validateMonthly(input) {
  const parsedInput = input.split(',').map((item) => item.trim());

  if (parsedInput.length !== 2) throwError(INVALID_MONTHLY);

  const [month, day] = parsedInput;
  if (!validateMonth(month) || !validateDay(day)) throwError(INVALID_MONTHLY);

  return [Number(month), day];
}

function validateMonth(month) {
  if (isNaN(month)) return false;

  const number = Number(month);
  const integer = parseInt(month);
  if (number !== integer) return false;

  if (number < 1 || number > 12) return false;

  return true;
}

function validateDay(day) {
  const dayList = ['월', '화', '수', '목', '금', '토', '일'];
  if (dayList.includes(day)) return true;
  return false;
}
