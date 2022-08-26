import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import matcha from "../apis/Matcha";
// import matcha from "../apis/Matcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

const Header = ({ props }) => {
  const [user, setUser] = useState();
  const [message, setMessage] = useState();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("http://localhost:3002"));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        matcha.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("token");
        const response = await matcha.get("/notifications/unread");
        console.log("messages: " + response.data.data.messages);
        setMessage(response.data.data.messages);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user?.id) {
      socket?.emit("addUser", user.id);
    }
  }, [socket, user]);

  useEffect(() => {
    socket?.on("getMessage", (data) => {
      toast.success(data.text + " by " + data.sender);
    });
  }, [socket]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        matcha.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("token");
        const response = await matcha.get("/users/get/profile");
        setUser(response.data.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const logout = () => {
    // setToken(null);
    localStorage.clear();
    // client.resetStore();
  };

  return (
    <Fragment>
      {user && (
        <div id="panel">
          <p>
            <b>{user.username}</b>&nbsp;
            <Link to="/notifications">notifications({message})</Link>
            &nbsp;messages(0)
            <button onClick={logout}>Logout</button>
          </p>
        </div>
      )}
      <Link to="/login">Login</Link>&nbsp;
      <Link to="/register">register</Link>&nbsp;
      <Link to="/add_details">register2</Link>&nbsp;
      <Link to="/requestpw">Request new password</Link>&nbsp;
      <Link to="/changepw">Change password</Link>&nbsp;
      <p>
        <Link to="/match">Get nextmatch</Link>&nbsp;
        <Link to="/browse">Browse matches</Link>&nbsp;
        <Link to="/conversations">View my matches</Link>&nbsp;
        <Link to="/profile">View your profile</Link>&nbsp;
      </p>
      <ToastContainer />
    </Fragment>
  );
};
export default Header;

// const App = () => {
//   const [token, setToken] = useState(null)
//   const [errorMessage, setErrorMessage] = useState(null)
//   const result = useQuery(ALL_PERSONS)
//   const client = useApolloClient()

//   if (result.loading)  {
//     return <div>loading...</div>
//   }

//   if (!token) {
//     return (
//       <>
//         <Notify errorMessage={errorMessage} />
//         <LoginForm setToken={setToken} setError={notify} />
//       </>
//     )
//   }

//   return (
//     <>
//       <Notify errorMessage={errorMessage} />

//       <Persons persons={result.data.allPersons} />
//       <PersonForm setError={notify} />
//       <PhoneForm setError={notify} />
//     </>
//   )
// }
