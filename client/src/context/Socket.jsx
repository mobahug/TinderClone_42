import { io } from 'socket.io-client';
const socket = {
  _instance: null,
  get instance() {
    if (!this._instance) {
      this._instance = io.connect('http://localhost:3002');
    }
    return this._instance;
  },
};

export default socket;
