import { React, useEffect, useState } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/TextField';
import UserPost from './userpost'

function UserTable() {

  const [userId, setuserId] = useState('')
  const [userName, setuserName] = useState('')
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, [])

  const filteredUsers = users.filter((user) => {
    const nameMatch = user.name.toLowerCase().includes(filter.toLowerCase());
    const emailMatch = user.email.toLowerCase().includes(filter.toLowerCase());
    return nameMatch || emailMatch;
  });


  return (

    <div className='container'>
      <div className='search-button'>
        <TextField className='inputText'
          type="text"
          placeholder="Filter by name or email"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {
          users.length>0 ? 
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr className='tablehover' key={user.id} onClick={() => { setuserId(user.id); setuserName(user.name); }}>
                  <td >{user.name}</td>
                  <td >{user.email}</td>
                  <td >{user.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          :
          <div className="loader">
            <h4>Loading data...</h4>
            </div>
        }
      </div>
      {userId &&
        <UserPost userId={userId} userName={userName} setuserId={setuserId} />}
    </div>
  );
}

export default UserTable;
