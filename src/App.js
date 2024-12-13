import EmergencyWork from './controllers/EmergencyWork.js';

class App {
  async run() {
    const emergencyWork = new EmergencyWork();
    await emergencyWork.startMakeSchedule();
    console.log('end');
  }
}

export default App;
