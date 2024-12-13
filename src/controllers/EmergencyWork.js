import Input from '../views/Input.js';
import Output from '../views/Output.js';
import WorkerList from '../models/WorkerList.js';
import { getNumberOfDays, getPublicHolidayDate, getDayType } from '../utils/calender.js';
import retryOnError from '../utils/retryOnError.js';

class EmergencyWork {
  #days;
  #startDay;
  #month;
  #publicHoliday;
  #workerListModel;
  #schedule = [0];

  constructor() {}

  async setupScheduleInfo() {
    await retryOnError(this.#setupMonthly.bind(this));
    await retryOnError(this.#setupWorkerList.bind(this));
  }

  startMakingSchedule() {
    let worker;
    for (let date = 1; date <= this.#days; date++) {
      worker = this.#findTodayWorker(date);
      const lastWorker = this.#schedule[this.#schedule.length - 1];
      //if (worker === lastWorker)
      this.#schedule.push(worker);
    }
  }

  printSchedule() {
    Output.schedule(this.#month, this.#days, this.#startDay, this.#schedule, this.#publicHoliday);
  }

  async #setupMonthly() {
    const [month, day] = await Input.monthly();
    this.#month = month;
    this.#startDay = day;
    this.#days = getNumberOfDays(month);
    this.#publicHoliday = getPublicHolidayDate(month);
  }

  async #setupWorkerList() {
    const weekdaysList = await Input.weekdaysWorker();
    const holidayList = await Input.holidayWorker();
    this.#workerListModel = new WorkerList(weekdaysList, holidayList);
  }

  #findTodayWorker(date) {
    let worker;
    if (this.#publicHoliday.includes(date)) {
      worker = this.#workerListModel.findTodayWorker('휴일');
      return this.#checkLastWorker('휴일', worker);
    }

    const dayType = getDayType(date, this.#startDay);
    worker = this.#workerListModel.findTodayWorker(dayType);
    return this.#checkLastWorker(dayType, worker);
  }

  #checkLastWorker(dayType, worker) {
    const lastWorker = this.#schedule[this.#schedule.length - 1];
    if (worker === lastWorker) worker = this.#workerListModel.changeWorker(dayType, worker);
    return worker;
  }
}

export default EmergencyWork;
