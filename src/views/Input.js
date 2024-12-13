import { Console } from '@woowacourse/mission-utils';
import { validateMonthly, validateWorkerList } from '../utils/validator.js';

const MONTHLY = '비상 근무를 배정할 월과 시작 요일을 입력하세요> ';
const WEEKDAYS_WORKERS = '평일 비상 근무 순번대로 사원 닉네임을 입력하세요> ';
const HOLIDAYS_WORKERS = '휴일 비상 근무 순번대로 사원 닉네임을 입력하세요> ';

const Input = {
  async monthly() {
    const input = await this.getUserInput(MONTHLY);
    return validateMonthly(input);
  },

  async weekdaysWorker() {
    const input = await this.getUserInput(WEEKDAYS_WORKERS);
    return validateWorkerList(input);
  },

  async holidayWorker() {
    const input = await this.getUserInput(HOLIDAYS_WORKERS);
    return validateWorkerList(input);
  },

  async getUserInput(caption) {
    const input = await Console.readLineAsync(caption);
    return input;
  },
};

export default Input;
