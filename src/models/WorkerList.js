import { ALL_WORKER_INCLUDE } from '../constants/error.js';
import throwError from '../utils/throwError.js';
import { isSetSame } from '../utils/validator.js';

class WorkerList {
  #weekdaysWorkerList;
  #holidayWorkerList;
  #currentWeekdaysWorkerIndex = 0;
  #currentHolidayWorkerIndex = 0;
  #changeSchedule = {
    평일: '',
    휴일: '',
  };

  constructor(week, holiday) {
    if (!isSetSame(week, holiday)) throwError(ALL_WORKER_INCLUDE);
    this.#weekdaysWorkerList = week;
    this.#holidayWorkerList = holiday;
  }

  findTodayWorker(dayType) {
    if (this.#changeSchedule[dayType] !== '') {
      const worker = this.#changeSchedule[dayType];
      this.#changeSchedule[dayType] = '';
      return worker;
    }

    if (dayType === '평일') {
      const worker = this.#weekdaysWorkerList[this.#currentWeekdaysWorkerIndex];
      this.#currentWeekdaysWorkerIndex += 1;
      return worker;
    }

    const worker = this.#holidayWorkerList[this.#currentHolidayWorkerIndex];
    this.#currentHolidayWorkerIndex += 1;
    return worker;
  }

  changeWorker(dayType, worker) {
    this.#changeSchedule[dayType] = worker;
    worker = this.findTodayWorker(dayType);
    return worker;
  }
}

export default WorkerList;
