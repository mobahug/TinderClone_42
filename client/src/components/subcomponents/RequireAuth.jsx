import { Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
  let authed = false;
  const user = localStorage.getItem('token');

  if (user) {
    authed = true;
  }

  return authed === true ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;
