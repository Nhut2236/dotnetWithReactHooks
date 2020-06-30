import React, { useState, useEffect, useContext } from 'react'
import { Button , Form } from 'react-bootstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { store } from '../../store';
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import {TAG_LIST} from '../../constants/common';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// import ImageDrop from 'quill-image-drop-module';
// import ImageResize from 'quill-image-resize-module';
// Quill.register('modules/imageResize', ImageResize);
// Quill.register('modules/imageDrop', ImageDrop);
const BlogModal = props => {
    const [ blog, setBlog ] = useState(props.data);
    const inGroupParse = JSON.parse(blog.InGroup);
    const [ inGroup, setInGroup ] = useState(inGroupParse);
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
        blog.InGroup = JSON.stringify(inGroup);
        getDataFromApi();
    }

    const redirectTo = (path) => {
      window.location.href = path;
    }

    const getDataFromApi = async () => {
        const Token = localStorage.getItem("TOKEN");
        const apiPath = `/api/Blog/Update`;
        const response = await fetch(apiPath, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type':'application/json',
              'Authorization': `Bearer ${Token}`
            },
            body: JSON.stringify(blog)
          }).then(response => {
            response.json().then(async (response) => {
              if (response && response.data) {
                setBlog(response.data);
                props.closeModal();
              }
            });
          });
    }

    const globalState = useContext(store);

    const handleChange = (value) => {
      blog.Content =  value;
    }

    const selectMulti = true;

    const handleChangeTag = event => {
      setInGroup(event.target.value);
    };

    const modules = {
      // imageResize: {
      //   parchment: Quill.import('parchment')
      //   // See optional "config" below
      // },
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      // imageResize: {
      //   displayStyles: {
      //     backgroundColor: 'black',
      //     border: 'none',
      //     color: 'white'
      //   },
      //   modules: ['Resize', 'DisplaySize', 'Toolbar']
      // },
    };

    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ];

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
                    <ReactQuill theme="snow" value={blog.Content} onChange={handleChange} modules={modules} formats={formats} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                    <Form.Label className="mr-2">Tag</Form.Label>
                    <Select
                        multiple={selectMulti}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={inGroup}
                        label="InGroup"
                        onChange={handleChangeTag}
                      >
                        {TAG_LIST && TAG_LIST.length ? TAG_LIST.map((tag,index)=>(
                          <MenuItem key={index} value={tag.code}>{tag.name}</MenuItem>
                        )) : ""}
                      </Select>
                    {/* <Select value={blog.InGroup} multiple={true}>
                      {
                        TAG_LIST.map( tag => {
                          return <Select.Option key={tag.code} label={tag.name} value={tag.code} />
                        })
                      }
                    </Select>   */}
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
