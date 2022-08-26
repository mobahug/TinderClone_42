import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import matcha from "../apis/Matcha";
import { io } from "socket.io-client";
const ViewSingle = (props) => {
  const [user, setUser] = useState([[]]);
  const [match, setMatch] = useState([[]]);
  const [tags, setTags] = useState([[]]);
  const [photo, setPhoto] = useState([[]]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:3002"));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        matcha.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("token");
        const response0 = await matcha.get("/users/get/profile");
        setUser(response0.data.data.users);
        console.log(user);

        // const id = window.location.pathName.slice(
        //   window.location.pathName.lastIndexOf("/") + 1
        // );
        console.log(window.location.pathname);
        let id = window.location.pathname.slice(
          window.location.pathname.lastIndexOf("/") + 1,
          window.location.pathname.length
        );

        console.log(id);
        const response = await matcha.get("/users/get/" + id.toString());
        let mid = 1;

        if (response.data.data.users?.id) {
          setMatch(response.data.data.users);
          mid = response.data.data.users.id;
          const response2 = await matcha.get("/users/tags/" + mid.toString());
          setTags(response2.data.data.tags);

          const response3 = await matcha.get("/photo/" + mid.toString());
          setPhoto(response3.data.data.photo);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  function handleClick(e) {
    e.preventDefault();
    if (e.target.name === "like") {
      matcha.post("/users/like/", { user_id: match.id, liker_id: user.id });
      if (user?.id) {
        socket.emit("sendMessage", {
          senderId: user.id,
          receiverId: match.id,
          text: "like",
        });
      }
    }
    if (e.target.name === "block")
      matcha.post("/users/block/", { user_id: user.id, blocked_id: match.id });
    if (e.target.name === "report") matcha.post("/users/report/" + match.id);
    if (e.target.name === "viewProfile") {
      setProfileOpen(true);
      matcha.post("/users/visit/", { user_id: match.id, visitor_id: user.id });
    }
  }
  return (
    <div>
      <Header />
      <h1>Match:</h1>

      {match.id && (
        <div>
          <img height="300" alt="img" src={photo && photo.uri}></img>
          <table>
            <thead></thead>
            <tbody>
              <tr key={match.id}>
                <td>{match.id}</td>
                <td>Fame: {match.fame}</td>
                <td>{match.username}</td>
                <td>{match.birthdate}</td>
                <td>{parseInt(match.distance / 1000)} kilometers away</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {profileOpen && (
        <div id="profile">
          <p>{match.bio}</p>
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
        </div>
      )}
      {match.id && (
        <div>
          <button
            className="btn btn-success btn-block"
            onClick={handleClick}
            name="viewProfile"
          >
            View profile
          </button>
          <button
            className="btn btn-success btn-block"
            onClick={handleClick}
            name="block"
          >
            Create block
          </button>
          <button
            className="btn btn-success btn-block"
            onClick={handleClick}
            name="like"
          >
            Create like
          </button>
          <button
            className="btn btn-success btn-block"
            onClick={handleClick}
            name="report"
          >
            Report
          </button>
        </div>
      )}
    </div>
  );
};
export default ViewSingle;
