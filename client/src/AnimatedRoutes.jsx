import React from 'react';

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Explore from './components/Explore';
import ExploreSingle from './components/ExploreSingle';
import Login from './components/Login';
import Location from './components/subcomponents/Location';
import Logout from './components/subcomponents/Logout';
import Register from './components/Register';
import Profile from './components/Profile';
import Requestpw from './components/RequestNewPassword';
import Changepw from './components/ChangePassword';
import UploadPhoto from './components/subcomponents/UploadPhoto';
import ViewSingle from './components/ViewSingle';
import GetNextMatch from './components/GetNextMatch';
import Chat from './components/chat/Chat';
import NavBarTop from './components/subcomponents/NavBarTop';
import ChatList from './components/chat/ChatList';
import NavBarBottom from './components/subcomponents/NavBarBottom';
import Notifications from './components/Notifications';
import Tags from './components/subcomponents/Tags';
import RequireAuth from './components/subcomponents/RequireAuth';

import ActivateUser from './components/subcomponents/ActivateUser';
import Footer from './components/subcomponents/Footer';
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/privacy_policy.html" element={<Footer />} />
          <Route exact path="/users/activate/:id/:activation_key" element={<ActivateUser />} />

          <Route exact path="/requestpw" element={<Requestpw />} />

          <Route
            exact
            path="/navbartop"
            element={
              <RequireAuth>
                <NavBarTop />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/navbarbottom"
            element={
              <RequireAuth>
                <NavBarBottom />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/match"
            element={
              <RequireAuth>
                <GetNextMatch />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/notifications"
            element={
              <RequireAuth>
                <Notifications />
              </RequireAuth>
            }
          />
          <Route exact path="/logout" element={<Logout />} />
          <Route
            exact
            path="/explore"
            element={
              <RequireAuth>
                <Explore />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route exact path="/changepw" element={<Changepw />} />
          <Route
            exact
            path="/explore/:id"
            element={
              <RequireAuth>
                <ExploreSingle />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/viewsingle/:id"
            element={
              <RequireAuth>
                <ViewSingle />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/chat/Chat/:id"
            element={
              <RequireAuth>
                <Chat />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/chat/ChatList"
            element={
              <RequireAuth>
                <ChatList />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/location"
            element={
              <RequireAuth>
                <Location />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/upload"
            element={
              <RequireAuth>
                <UploadPhoto />
              </RequireAuth>
            }
          />
          <Route
            exact
            path="/tags"
            element={
              <RequireAuth>
                <Tags />
              </RequireAuth>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default AnimatedRoutes;
