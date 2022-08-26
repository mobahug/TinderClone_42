import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Users from "./components/UsersList";
import Filter from "./components/Filter";
import NotificationsList from "./components/NotificationsList";
// import Dropzone from "./components/MyDropzone";
import AddDetails from "./components/AddDetails";
import Login from "./routes/Login";
// import SignUp from "./routes/SignUp";
import Register from "./routes/Register";
import MatchProfile from "./components/MatchProfile";
import Profile from "./components/Profile";
import Requestpw from "./components/RequestNewPassword";
import Changepw from "./components/ChangePassword";
import Conversations from "./components/Conversations";
import BrowseMatches from "./components/BrowseMatches";
import ViewSingle from "./components/ViewSingle";
import Chat from "./components/chat/Chat";
// import matcha from "./apis/Matcha";
// import { toast } from "react-toastify";
// import { UsersContextProvider } from "./context/UsersContext";
// import { PhotoContextProvider } from "./context/PhotoContext";
// toast.configure();
//import { AuthContext } from "./context/AuthContext";

const App = () => {
  //const { user } = useContext(AuthContext);
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/filter" element={<Filter />} />
          <Route exact path="/match" element={<MatchProfile />} />
          {/* <Route exact path="/browsematches" element={<BrowseMatches />} /> */}
          <Route exact path="/profile" element={<Profile />} />
          {/* <Route exact path="/dropzone" element={<Dropzone />} /> */}
          <Route exact path="/notifications" element={<NotificationsList />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/requestpw" element={<Requestpw />} />
          <Route exact path="/changepw" element={<Changepw />} />
          <Route exact path="/add_details" element={<AddDetails />} />
          <Route exact path="/conversations" element={<Conversations />} />
          <Route exact path="/viewsingle/:id" element={<ViewSingle />} />
          <Route exact path="/chat/:id" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
