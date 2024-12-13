import Input from '../views/Input.js';
import { getNumberOfDays, getPublicHolidayDate } from '../utils/calender.js';
import retryOnError from '../utils/retryOnError.js';

class EmergencyWork {
  #days;
  #publicHoliday;

  constructor() {}

  async startMakeSchedule() {
    await retryOnError(this.#setupMonthly.bind(this));
  }

  async #setupMonthly() {
    const [month, day] = await Input.monthly();
    this.#days = getNumberOfDays(month);
    this.#publicHoliday = getPublicHolidayDate(month);
  }
}

export default EmergencyWork;
