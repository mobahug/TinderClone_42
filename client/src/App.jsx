import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AnimatedRoutes from './AnimatedRoutes';
import { SocketContextProvider } from './context/SocketContext';
import SocketReceiver from './components/subcomponents/SocketReceiver';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <SocketContextProvider>
        <SocketReceiver />
        <ToastContainer />
        <AuthProvider>
          <Router>
            <AnimatedRoutes />
          </Router>
        </AuthProvider>
      </SocketContextProvider>
    </div>
  );
};
export default App;
