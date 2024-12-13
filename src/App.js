import EmergencyWork from './controllers/EmergencyWork.js';

class App {
  async run() {
    const emergencyWork = new EmergencyWork();
    await emergencyWork.setupScheduleInfo();
    console.log('end');
  }
}

export default App;
