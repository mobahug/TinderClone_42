import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import matcha from "../apis/Matcha";
import Header from "../components/Header";
const ChangePassword = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    password: "",
    passwordVerify: "",
  });

  const { password, passwordVerify } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await matcha.post("/users/changepw", {
        password,
        passwordVerify,
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
      <h1 className="mt-5 text-center">Change your password</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="passwordVerify"
          value={passwordVerify}
          placeholder="passwordVerify"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">login</Link>
    </Fragment>
  );
};

export default ChangePassword;
