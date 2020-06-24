import React, { useState, useEffect, useContext } from 'react'
import { Button , Form } from 'react-bootstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { store } from '../../store';

const BlogModal = props => {
    const [ blog, setBlog ] = useState(props.data);
    const [ open, setOpen] = React.useState(true);  
    const [ fullWidth, setFullWidth ] = React.useState(true);
    const [ maxWidth, setMaxWidth ] = React.useState('sm');
    useEffect(
      () => {
        setBlog(props.data)
      },
      [ props ]
    )
    // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]
  
    const handleInputChange = event => {
      const { name, value } = event.target
      setBlog({ ...blog, [name]: value })
    }

    const saveBlog = () => {
        getDataFromApi();
    }

    const getDataFromApi = async () => {
        const apiPath = `https://reqres.in/api/users/${blog.id}`;
        const response = await fetch(apiPath, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type':'application/json',
            },
            body: JSON.stringify(blog)
          }).then(response => {
            response.json().then(data =>{
                setBlog(data);
            })
          });
    }

    const globalState = useContext(store);
    console.log(globalState.state.blogList);
    
    return (
      <Dialog  
        open={open}
        onClose={props.closeModal}
        fullWidth = {fullWidth}
        maxWidth= {maxWidth}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.Title}</DialogTitle>
        <DialogContent>
        <Form.Group controlId="formBasicEmail">
             <Form.Label>First Name</Form.Label>
             <Form.Control type="text" placeholder="first_name" name="first_name" value={blog.first_name} onChange={handleInputChange}  />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="last_name" name="last_name" value={blog.last_name} onChange={handleInputChange}  />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="email" name="email" value={blog.email} onChange={handleInputChange} />
            </Form.Group>
        </DialogContent>
        <DialogActions>
            <Button variant="secondary" onClick={()=> props.closeModal() }>Hủy</Button>
            <Button variant="primary" onClick={()=> saveBlog() }>Lưu</Button>
        </DialogActions>
      </Dialog>
    )
}

export default BlogModal
