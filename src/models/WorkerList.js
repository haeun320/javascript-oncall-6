import { ALL_WORKER_INCLUDE } from '../constants/error.js';
import throwError from '../utils/throwError.js';
import { isSetSame } from '../utils/validator.js';

class WorkerList {
  #weekdaysWorkerList;
  #holidayWorkerList;

  constructor(week, holiday) {
    if (!isSetSame(week, holiday)) throwError(ALL_WORKER_INCLUDE);
    this.#weekdaysWorkerList = week;
    this.#holidayWorkerList = holiday;
  }
}

export default WorkerList;
