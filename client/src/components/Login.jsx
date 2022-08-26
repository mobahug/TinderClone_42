import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import matcha from "../apis/Matcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";

const Login = ({ props }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState({ auth: false, username: "" });

  const [ipLatitude, setIpLatitude] = useState(null);
  const [ipLongitude, setIpLongitude] = useState(null);
  const { username, password } = inputs;
  // const navigate = useNavigate();

  // useEffect(() => {
  //   setSocket(io("http://localhost:3001"));
  // }, []);

  async function location() {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIpLatitude(res.data.latitude);
    setIpLongitude(res.data.longitude);
  }

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await location();
      const response = await matcha.post("/login", {
        username,
        password,
        ipLatitude,
        ipLongitude,
      });
      console.log(response.data);
      if (response.data.jwtToken) {
        localStorage.setItem("token", response.data.jwtToken);
        matcha.defaults.headers.common["Authorization"] =
          "Bearer" + response.data.token;
        setUser({ auth: true, username: response.data.username });
        toast.success("Logged in Successfully");
        // navigate("/profile");
      } else {
        toast.error(response.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Header />
      <h1 className="mt-5 text-center">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/register">register</Link>
      <Link to="/requestpw">Request new password</Link>
      <ToastContainer />
    </Fragment>
  );
};

export default Login;
