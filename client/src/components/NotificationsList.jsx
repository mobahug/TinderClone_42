import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import matcha from "../apis/Matcha";
import Header from "../components/Header";
const NofiticationsList = (props) => {
  const [notifications, setNotifcations] = useState([[]]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        matcha.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("token");

        const response = await matcha.get("/notifications");
        setNotifcations(response.data.data.notifications);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      notifications:
      <table>
        <thead></thead>
        <tbody>
          {notifications &&
            notifications.map((notification, value) => {
              return (
                <tr key={value}>
                  <td>{notification.id}</td>
                  <td>{notification.formatted_date}</td>
                  <td>{notification.category}</td>
                  <td>
                    <Link to={"/viewsingle/" + notification.sender_id}>
                      link
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>{" "}
    </div>
  );
};
export default NofiticationsList;
