import React, { useState, useEffect, useContext } from 'react'
import { Button , Form } from 'react-bootstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { store } from '../../store';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; // ES6
import {TAG_LIST} from '../../constants/common';
import { Select } from 'element-react/next';
const BlogModal = props => {
    const [ blog, setBlog ] = useState(props.data);
    const [ open, setOpen] = useState(true);  
    const [ fullWidth, setFullWidth ] = useState(true);
    const [ maxWidth, setMaxWidth ] = useState('sm');
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
        const Token = localStorage.getItem("TOKEN");
        const apiPath = `/api/Event/Update`;
        const response = await fetch(apiPath, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type':'application/json',
              'Authorization': `Bearer ${Token}`
            },
            body: JSON.stringify(blog)
          }).then(response => {
            response.json().then(data =>{
                setBlog(data);
            })
          });
    }

    const globalState = useContext(store);

    const handleChange = (value) => {
      blog.Content =  value;
    }

    return (
      <Dialog  
        open={open}
        onClose={props.closeModal}
        fullWidth = {fullWidth}
        maxWidth= {maxWidth}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{backgroundColor: '#333c45', color: 'white'}}>{props.Title}</DialogTitle>
        <DialogContent>
        <Form.Group controlId="formBasicEmail">
             <Form.Label>Tiêu đề</Form.Label>
             <Form.Control type="text" placeholder="Title" name="Title" value={blog.Title} onChange={handleInputChange}  />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control type="text" placeholder="Description" name="Description" value={blog.Description} onChange={handleInputChange}  />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nội dung</Form.Label>
                    <ReactQuill value={blog.Content} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                    <Form.Label>Tag</Form.Label>
                    <Select value={blog.InGroup} multiple={true}>
                      {
                        TAG_LIST.map( tag => {
                          return <Select.Option key={tag.code} label={tag.name} value={tag.code} />
                        })
                      }
                    </Select>  
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
