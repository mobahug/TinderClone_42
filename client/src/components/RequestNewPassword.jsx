import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import matcha from "../apis/Matcha";
import Header from "../components/Header";
const RequestNewPassword = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    username: "",
  });

  const { email, username } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await matcha.post("/users/requestpw", {
        username,
        email,
      });
      //   console.log(response.data);
      //     const parseRes = await response.json();
      //   console.log(response.data.jwtToken);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Header />
      {/* <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        {...otherPropsFromToastConfigure}
      /> */}
      <h1 className="mt-5 text-center">Request new pw</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="username"
          value={username}
          placeholder="username"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">login</Link>
    </Fragment>
  );
};

export default RequestNewPassword;
