import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NewPost from './newPost'
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
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
          <NewPost userId={props.userId} posts={posts} setPosts={setPosts} />
        </div>
        :
        <div className="loader">
          <h4>Loading data...</h4>
          </div>
    }
    </>
  );
}

export default UserPost;
