import Header from "../Header";
import React, { Fragment, useState, useEffect } from "react";
import matcha from "../../apis/Matcha";
import { io } from "socket.io-client";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [oldMessages, setOldMessages] = useState([]);
  const [submitMessage, setSubmitMessage] = useState("");
  const [newMessages, setNewMessages] = useState([]);
  //let buffer = [];

  useEffect(() => {
    setSocket(io("http://localhost:3002"));
  }, []);

  useEffect(() => {
    let currentdate = new Date();
    socket?.emit("addUser", 1);
    socket?.on("getMessage", (data) => {
      let msg = currentdate.getDate() + " " + data.text;
      setNewMessages((newMessages) => [...newMessages, msg]);
      //buffer.push(msg);
    });
  }, [socket]);

  useEffect(() => {
    const fetchData = async () => {
      let conversationId = window.location.pathname.slice(
        window.location.pathname.lastIndexOf("/") + 1,
        window.location.pathname.length
      );
      try {
        // matcha.defaults.headers.common["Authorization"] =
        //   "Bearer " + localStorage.getItem("token");
        const messages = await matcha.post("/conversations/log", {
          conversation_id: conversationId,
        });
        setOldMessages(messages.data.data.log);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let conversationId = window.location.pathname.slice(
        window.location.pathname.lastIndexOf("/") + 1,
        window.location.pathname.length
      );
      try {
        // matcha.defaults.headers.common["Authorization"] =
        //   "Bearer " + localStorage.getItem("token");
        const conv = await matcha.post("/conversations/room/", {
          id: conversationId,
        });
        setConversation(conv.data.data.conversation);
        console.log(conv.data.data.conversation);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await matcha.post("/conversations/", {
        message: submitMessage,
        user_id: conversation.user_id1,
        sender_id: conversation.user_id2,
        conversation_id: conversation.id,
      });
      socket.emit("sendMessage", {
        senderId: conversation.user_id1,
        receiverId: conversation.user_id2,
        text: submitMessage,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      {/* <Header /> */}
      <div>
        <table>
          <tbody>
            {oldMessages &&
              oldMessages.map((message, value) => {
                return (
                  <tr key={value}>
                    <td>{message.creation_date}</td>
                    <td>{message.sender_id}</td>
                    <td>{message.message}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div id="newMessages">
        <table>
          <tbody>
            {newMessages &&
              newMessages.map((message, value) => {
                return (
                  <tr key={value}>
                    <td>{message}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div id="chatInput">
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            name="chattext"
            value={submitMessage}
            onChange={(event) => setSubmitMessage(event.target.value)}
            className="form-control my-3"
          />
          <button className="btn btn-success btn-block">Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Chat;
