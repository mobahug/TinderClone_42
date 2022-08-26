import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import matcha from "../apis/Matcha";
import Header from "../components/Header";

const Profile = ({ setAuth }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        matcha.defaults.headers.common["Authorization"] = "Bearer " + token;
        const response = await matcha.get("/users/get/profile");
        // setInputs({ username: response.data.data.username });
        setUser(response.data.data.users);
        const response3 = await matcha.get(
          "/photo/profile/" + response.data.data.users.id.toString()
        );
        setPhoto(response3.data.data.photo);
        // const response2 = await matcha.get("/users/ip");
        // setUsers(response.data.data.users);

        const response4 = await matcha.get(
          "/users/tags/" + response.data.data.users.id.toString()
        );
        setTags(response4.data.data.tags);
        console.log(response4.data.data.tags);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // const [ip, setIp] = useState();
  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState({});
  const [tags, setTags] = useState([[]]);
  const [inputs, setInputs] = useState({});

  let { email, password, firstname, lastname, username } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await matcha.post("/register", {
        firstname,
        lastname,
        username,
        email,
        password,
      });
      //   console.log(response.data);
      //     const parseRes = await response.json();
      //   console.log(response.data.jwtToken);
      console.log(response.data.jwtToken);
      if (response.data.jwtToken) {
        localStorage.setItem("token", response.data.jwtToken);
        setAuth(true);
        toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(response);
      }
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
      <h1 className="mt-5 text-center">My profile</h1>
      <p>My fame: {user.fame}</p>
      <form onSubmit={onSubmitForm}>
        <p>
          email
          <input
            type="text"
            name="email"
            defaultValue={user.email}
            placeholder="email"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
          new password
          <input
            type="password"
            name="password"
            defaultValue={password}
            placeholder="password"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
          password verify
          <input
            type="password"
            name="password"
            defaultValue={password}
            placeholder="password"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
          firstname
          <input
            type="text"
            name="firstname"
            defaultValue={user.firstname}
            placeholder="firstname"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
          lastname
          <input
            type="text"
            name="lastname"
            defaultValue={user.lastname}
            placeholder="lastname"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
        </p>
        username
        <input
          type="text"
          name="username"
          defaultValue={user.username}
          placeholder="username"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        preference
        <input
          type="text"
          name="preference"
          defaultValue={user.preference}
          placeholder="preference"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        gender
        <input
          type="text"
          name="gender"
          defaultValue={user.gender}
          placeholder="gender"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        latitude
        <input
          type="text"
          name="latitude"
          defaultValue={user.latitude}
          placeholder="latitude"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        longitude
        <input
          type="text"
          name="longitude"
          defaultValue={user.longitude}
          placeholder="longitude"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <p>
          bio
          <input
            type="text"
            name="bio"
            defaultValue={user.bio}
            placeholder="bio"
            maxLength="500"
            size="100"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
          wants_to_be_positioned
          <input
            type="text"
            name="wants_to_be_positioned"
            defaultValue={user.wants_to_be_positioned}
            placeholder="wants_to_be_positioned"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
        </p>
        <p>
          picture<img height="300" alt="img" src={photo && photo.uri}></img>
          upload new: remove: set as profile:
          <input
            type="text"
            name="bio"
            defaultValue={photo.is_profile}
            placeholder="bio"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
        </p>
        <p>
          Current password
          <input
            type="password"
            name="password2"
            defaultValue=""
            placeholder="current password"
            onChange={(e) => onChange(e)}
            className="form-control my-3"
          />
        </p>
        Tags:{" "}
        <table>
          <tbody>
            {tags &&
              tags.map((tag, value) => {
                return (
                  <tr key={value}>
                    <td>{tag.id}</td>
                    <td>{tag.name}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <button className="btn btn-success btn-block">Save changes</button>
      </form>
      <Link to="/add_details">Add Details</Link>
    </Fragment>
  );
};

export default Profile;
