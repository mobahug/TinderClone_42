import React, { useEffect, useState } from "react";
import matcha from "../apis/Matcha";

const UsersList = (props) => {
  const [users, setUsers] = useState([[]]);
/*   const [photo, setPhoto] = useState([[]]);
 */


  const [check, setcheck] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = event => {
    if (event.target.checked) {
      console.log('✅ Checkbox is checked');
      setAnchorEl(event.currentTarget);
    } else {
      console.log('⛔️ Checkbox is NOT checked');
      setAnchorEl(null);
    }
    setcheck(current => !current);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        matcha.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("token");
        const response = await matcha.get("/users/users/getallfilter");
        setUsers(response.data.data.users);
/*         setPhoto(response.data.data.photo);
 */

        console.log(response.data.data.users)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <label htmlFor="guys">
          <input
            type="checkbox"
            value={check}
            onClick={handleChange}
            id="guys"
            name="guys"
          />
          Guys
        </label>
      </div>
      Users:
      {anchorEl &&
        <table>
          <thead></thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.birthdate}</td>
                    <td>{user.preference}</td>
                    <td>{user.uri}</td>
                    <img height="300" alt="img" src={users && users.uri}></img>
                  </tr>
                );
              })}
          </tbody>
        </table>
      }
    </div>
  );
};
export default UsersList;
