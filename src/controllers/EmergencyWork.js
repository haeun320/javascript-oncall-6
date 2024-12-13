import Input from '../views/Input.js';
import WorkerList from '../models/WorkerList.js';
import { getNumberOfDays, getPublicHolidayDate, getDayType } from '../utils/calender.js';
import retryOnError from '../utils/retryOnError.js';

class EmergencyWork {
  #days;
  #publicHoliday;
  #workerListModel;
  #schedule = [];

  constructor() {}

  async setupScheduleInfo() {
    await retryOnError(this.#setupMonthly.bind(this));
    await retryOnError(this.#setupWorkerList.bind(this));
  }

  startMakingSchedule() {
    let worker;
    for (let date = 1; date <= this.#days; date++) {
      worker = this.#findTodayWorker(date);
    }

    const lastWorker = this.#schedule[this.#schedule.length - 1];
    //if (worker === lastWorker)
    this.#schedule.push(worker);
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

  #findTodayWorker(date) {
    if (this.#publicHoliday.includes(date)) {
      return this.#workerListModel.findTodayWorker('휴일');
    }

    return this.#workerListModel.findTodayWorker(getDayType(date, startDay));
  }
}

export default EmergencyWork;
