import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NewPost from './newPost'
import { List, ListItem, ListItemText } from '@mui/material';
function UserPost(props) {
  //const [ islouding, setislouding]=useState('true');
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${props.userId}`)
      .then((response) => {
        setPosts(response.data);
        console.log(posts)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [props.userId]);

  return (
    <>
      {
        posts.length > 0 ?
          <div className='posts'>
            <h2>{props.userName}'s posts</h2>
            <List className="all-post">
              {posts.map((post) => (
                <ListItem key={post.id}>
                  <ListItemText
                    primary={post.title}
                    secondary={post.body}
                  />
                </ListItem>
              ))}
            </List>
            <NewPost userId={props.userId} posts={posts} setPosts={setPosts} />
          </div>
          :
          <>
           <div className="loader-container">
              <div className="loader"></div>
              <h4>Loading data...</h4>
            </div>
          </>
      }
    </>
  );
}

export default UserPost;
