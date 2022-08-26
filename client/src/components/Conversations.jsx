import React, { useEffect, useState } from "react";
import matcha from "../apis/Matcha";
import Header from "../components/Header";
import { Link } from "react-router-dom";
const ConversationsList = (props) => {
  const [conversations, setConversations] = useState([[]]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        matcha.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("token");
        const response = await matcha.get("/conversations");
        console.log(response.data.data);
        setConversations(response.data.data.conversations);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      My matches:
      <table>
        <thead></thead>
        <tbody>
          {conversations &&
            conversations.map((conversation, value) => {
              return (
                <tr key={value}>
                  <td>
                    <Link to={"/chat/" + conversation.id}>Login</Link>
                  </td>
                  <td>{conversation.user_id1}</td>
                  <td>{conversation.user_id2}</td>
                  <td>
                    <button>unlike</button>
                  </td>
                  <td>
                    <button>block</button>
                  </td>
                  <td>
                    <button>report</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default ConversationsList;
