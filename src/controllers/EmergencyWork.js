import Input from '../views/Input.js';
import WorkerList from '../models/WorkerList.js';
import { getNumberOfDays, getPublicHolidayDate } from '../utils/calender.js';
import retryOnError from '../utils/retryOnError.js';

class EmergencyWork {
  #days;
  #publicHoliday;
  #workerListModel;

  constructor() {}

  async startMakeSchedule() {
    await retryOnError(this.#setupMonthly.bind(this));
    await retryOnError(this.#setupWorkerList.bind(this));
  }

  async #setupMonthly() {
    const [month, day] = await Input.monthly();
    this.#days = getNumberOfDays(month);
    this.#publicHoliday = getPublicHolidayDate(month);
  }

  async #setupWorkerList() {
    const weekdaysList = await Input.weekdaysWorker();
    const holidayList = await Input.holidayWorker();
    this.#workerListModel = new WorkerList(weekdaysList, holidayList);
  }
}

export default EmergencyWork;
