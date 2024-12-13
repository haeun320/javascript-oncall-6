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

    const workerNumber = this.#weekdaysWorkerList.length;
    if (dayType === '평일') {
      const worker = this.#weekdaysWorkerList[this.#currentWeekdaysWorkerIndex % workerNumber];
      this.#currentWeekdaysWorkerIndex += 1;
      return worker;
    }

    const worker = this.#holidayWorkerList[this.#currentHolidayWorkerIndex % workerNumber];
    this.#currentHolidayWorkerIndex += 1;
    return worker;
  }

  changeWorker(dayType, worker) {
    const changedWorker = this.findTodayWorker(dayType);
    this.#changeSchedule[dayType] = worker;
    return changedWorker;
  }
}

export default WorkerList;
