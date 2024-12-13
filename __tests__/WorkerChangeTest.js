import WorkerList from '../src/models/WorkerList.js';

describe('WorkerList', () => {
  let workerList;

  beforeEach(() => {
    // 기본 테스트 데이터 설정
    const weekdayWorkers = ['A', 'B', 'C', 'D', 'E'];
    const holidayWorkers = ['A', 'B', 'C', 'D', 'E'];
    workerList = new WorkerList(weekdayWorkers, holidayWorkers);
  });

  describe('연속 근무자 변경 테스트', () => {
    test('평일 연속 근무시 다음 순번의 근무자로 변경된다', () => {
      // Given: 첫번째 근무자 배정
      const firstWorker = workerList.findTodayWorker('평일');

      // When: 같은 근무자가 배정될 상황에서 변경 요청
      const changedWorker = workerList.changeWorker('평일', firstWorker);

      // Then: 다음 순번의 근무자가 배정되어야 함
      expect(changedWorker).not.toBe(firstWorker);
    });

    test('휴일 연속 근무시 다음 순번의 근무자로 변경된다', () => {
      // Given: 첫번째 근무자 배정
      const firstWorker = workerList.findTodayWorker('휴일');

      // When: 같은 근무자가 배정될 상황에서 변경 요청
      const changedWorker = workerList.changeWorker('휴일', firstWorker);

      // Then: 다음 순번의 근무자가 배정되어야 함
      expect(changedWorker).not.toBe(firstWorker);
    });

    test('변경된 근무자는 다음 findTodayWorker 호출시 원래 배정되었어야 할 근무자가 된다', () => {
      // Given: 첫번째 근무자와 변경된 근무자 확인
      const firstWorker = workerList.findTodayWorker('평일');
      const changedWorker = workerList.changeWorker('평일', firstWorker);

      // When: 다음 근무자 확인
      const nextWorker = workerList.findTodayWorker('평일');

      // Then: 원래 첫번째 근무자가 다음 근무로 배정되어야 함
      expect(nextWorker).toBe(firstWorker);
    });

    test('평일과 휴일의 근무자 변경이 서로 독립적으로 동작한다', () => {
      // Given: 평일, 휴일 각각의 첫번째 근무자
      const weekdayWorker = workerList.findTodayWorker('평일');
      const holidayWorker = workerList.findTodayWorker('휴일');

      // When: 평일 근무자만 변경
      workerList.changeWorker('평일', weekdayWorker);

      // Then: 휴일 근무자 배정은 영향받지 않아야 함
      const nextHolidayWorker = workerList.findTodayWorker('휴일');
      expect(nextHolidayWorker).not.toBe(holidayWorker);
    });
  });
});
