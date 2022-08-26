import React, { useEffect, useState } from 'react';
import matcha from '../apis/Matcha';

const Filter = (props) => {
  const [users, setUsers] = useState([[]]);
  const [inputs, setInputs] = useState({
    preference: '',
    maxdistance: '',
    mindate: '',
    maxdate: '',
    tags: '',
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await matcha.get("/filter/");
  //       setFilter(response.data.data.users);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const { preference, maxdistance, mindate, maxdate, tags } = inputs;

  const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      matcha.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
      const response = await matcha.post('/filter/', {
        preference,
        maxdistance,
        mindate,
        maxdate,
        tags,
        limit: 10,
      });
      setUsers(response.data.data.users);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      Filter match:
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>firstname</th>
            <th>lastname</th>
            <th>Month</th>
            <th>birthdate</th>
            <th>preference</th>
            <th>distance</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, value) => {
              return (
                <tr key={value}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.birthdate}</td>
                  <td>{user.preference}</td>
                  <td>{user.distance}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="preference"
          value={preference}
          placeholder="preference"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="maxdistance"
          value={maxdistance}
          placeholder="maxdistance"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="mindate"
          value={mindate}
          placeholder="mindate"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="maxdate"
          value={maxdate}
          placeholder="maxdate"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="tags"
          value={tags}
          placeholder="tags"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
    </div>
  );
};
export default Filter;
