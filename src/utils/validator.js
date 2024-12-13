import throwError from './throwError.js';
import { MAX_NAME_LENGTH, MAX_WORKERS, MIN_WORKERS } from '../constants/numbers.js';
import {
  INVALID_MONTHLY,
  INVALID_WORKER_NUMBER,
  DO_NOT_REPEAT_WORKER,
  OVER_NAME_LENGTH,
} from '../constants/error.js';

export function validateMonthly(input) {
  const parsedInput = input.split(',').map((item) => item.trim());

  if (parsedInput.length !== 2) throwError(INVALID_MONTHLY);

  const [month, day] = parsedInput;
  if (!validateMonth(month) || !validateDay(day)) throwError(INVALID_MONTHLY);

  return [Number(month), day];
}

export function validateWorkerList(input) {
  const workerList = input.split(',');

  if (workerList.length < MIN_WORKERS || workerList.length > MAX_WORKERS)
    throwError(INVALID_WORKER_NUMBER);

  if (isWorkerRepeated(workerList)) throwError(DO_NOT_REPEAT_WORKER);
  if (isNameOverLimit(workerList)) throwError(OVER_NAME_LENGTH);

  return workerList;
}

export function isSetSame(list1, list2) {
  const difference = list1.filter((x) => list2.includes(x));
  if (difference.length === list2.length) return true;
  return false;
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

function isWorkerRepeated(workerList) {
  const workerSet = new Set(workerList);
  if (workerSet.size != workerList.length) return true;
  return false;
}

function isNameOverLimit(workerList) {
  for (let i = 0; i < workerList.length; i++) {
    if (workerList[i].length > MAX_NAME_LENGTH) return true;
  }
  return false;
}
