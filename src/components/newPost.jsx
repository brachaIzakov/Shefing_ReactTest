import React, { useState } from 'react';
import {Snackbar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function NewPost(props) {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSnackbarOpen, setisSnackbarOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    if (title && body) {
      const newPost = {
        "userId": props.userId,
        "id": props.posts.length,
        "title": title,
        "body": body
      };
      props.setPosts([...props.posts, newPost])
      setisSnackbarOpen(true)
      setOpen(false);
    }
    else
      alert("It is not possible to create a post without a title or message body")
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Create Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={3000} // המשך הצגת הודעה במילי-שניות (במקרה זה 3 שניות)
            onClose={()=>{setisSnackbarOpen(false)}}
            message="Post added successfully!" // הודעה שתוצג
          />
    </div>
  );
}
export default NewPost;