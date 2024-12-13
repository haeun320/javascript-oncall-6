import EmergencyWork from './controllers/EmergencyWork.js';

class App {
  async run() {
    const emergencyWork = new EmergencyWork();
    await emergencyWork.setupScheduleInfo();
    emergencyWork.startMakingSchedule();
    emergencyWork.printSchedule();
  }
}

export default App;
