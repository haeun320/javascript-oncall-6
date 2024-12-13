import { Console } from '@woowacourse/mission-utils';
import { getDay } from '../utils/calender.js';

const Output = {
  schedule(month, days, startDay, schedule, holiday) {
    for (let date = 1; date <= days; date++) {
      const day = getDay(date, startDay);

      if (holiday.includes(date)) {
        Console.print(`${month}월 ${date}일 ${day}(휴일) ${schedule[date]}`);
        continue;
      }

      Console.print(`${month}월 ${date}일 ${day} ${schedule[date]}`);
    }
  },
};

export default Output;
