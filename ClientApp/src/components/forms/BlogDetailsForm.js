import React, { useState, useEffect, useRef } from 'react'
import { Image, Row, Col, Button, Form } from 'react-bootstrap';
import {TAG_LIST} from '../../constants/common';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import NoImage from '../../assets/svgs/no-image.svg';
import LinkedStateMixin from 'react-addons-linked-state-mixin'; // ES6
import Toast from '../toasts/BasicToast';
const BlogDetailsForm = props => {
  const [ currentData, setCurrentData ] = useState(props.currentData);
  const inGroupParse = JSON.parse(currentData.InGroup);
  const [ inGroup, setInGroup ] = useState(inGroupParse);
  const [ avatar, setAvatar ] = useState(currentData && currentData.Avatar ? currentData.Avatar : NoImage );
  const [ uploadProcessing, setUploadProcessing ] = useState(false);
  const [ calledApi, setCalledApi ] = useState(false);
  const file = useRef(null);  
  useEffect(
    () => {
        setCurrentData(props.currentData)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target
    setCurrentData({ ...currentData, [name]: value })
  }

  const redirectTo = (path) => {
    window.location.href = path;
  }
  
  const avatarStyle = {
    width: '300px',
  };

  const saveBlog = () => {
    saveDataApi();
  }

  const saveDataApi = async () => {
    currentData.Avatar = avatar;
    currentData.InGroup = JSON.stringify(inGroup);
    const Token = localStorage.getItem("TOKEN");
    const apiPath = `/api/Blog/Update`;
    const response = await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json',
          'Authorization': `Bearer ${Token}`
        },
        body: JSON.stringify(currentData)
      }).then(response => {
        response.json().then(data =>{
            setCurrentData(data.data);
            setAvatar(currentData.Avatar);
            setCalledApi(true);
        })
      });
}
 
const selectMulti = true;

const handleChangeTag = event => {
  setInGroup(event.target.value);
};

const modules = {
  ImageResize: {},
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ]
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];


const handleChangeContent = (value) => {
  currentData.Content =  value;
}

const chooseFile = (e) => {
    file.current.click();
};

const handleFileUpload = (e) => {
  var size = parseFloat(file.current.files[0].size / 1024).toFixed(2);
  var fileTemp = file.current.files[0];
  if (fileTemp) {
    var reader = new FileReader();
    reader.onload = e => {
      setAvatar(e.target.result);
    };
    reader.readAsDataURL(fileTemp);
  }
};

const handleChange = (value) => {
};

const toggleShow = () => {
  setCalledApi(false);
};

  return (
    <div>
      <div>
        <div>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="font-weight-bold">Tiêu đề</Form.Label>
            <Form.Control
              className="input-custom"
              type="text"
              placeholder="Title"
              name="Title"
              value={currentData.Title}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="font-weight-bold">Mô tả</Form.Label>
            <Form.Control
              className="input-custom"
              type="text"
              placeholder="Description"
              name="Description"
              value={currentData.Description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="font-weight-bold">Nội dung</Form.Label>
            <ReactQuill
              theme="snow"
              value={currentData.Content}
              onChange={handleChangeContent}
              modules={modules}
              formats={formats}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="mr-2 font-weight-bold">Tag</Form.Label>
            <br />
            <Select
              multiple={selectMulti}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={inGroup}
              label="InGroup"
              onChange={handleChangeTag}
            >
              {TAG_LIST && TAG_LIST.length
                ? TAG_LIST.map((tag, index) => (
                    <MenuItem key={index} value={tag.code}>
                      {tag.name}
                    </MenuItem>
                  ))
                : ""}
            </Select>
          </Form.Group>
        </div>
        <br />
        <Form.Group controlId="formBasicEmail">
          <div>
            <input
              style={{ visibility: "hidden" }}
              type="file"
              id="file"
              ref={file}
              onChange={() => handleFileUpload()}
            />
          </div>
          <Form.Label className="mr-2 font-weight-bold">
            Ảnh đại diện
          </Form.Label>
          <div>
            {currentData && avatar ? (
              <Image
                src={avatar}
                style={avatarStyle}
                onChange={handleChange()}
              />
            ) : (
              ""
            )}
          </div>
          <div className="mt-1">
            <span title="Upload ảnh">
              <Button
                disabled={uploadProcessing}
                variant="light"
                onClick={() => chooseFile()}
              >
                <i className="fa fa-image"></i>
              </Button>
            </span>
          </div>
        </Form.Group>
        <br />
        <div className="text-right">
          <Button
            variant="secondary"
            className="mr-2 button-custom"
            onClick={() => redirectTo("/blog")}
          >
            {" "}
            <i className="fa fa-chevron-left mr-2" />
            Quay lại
          </Button>
          <Button
            variant="primary"
            className="button-custom"
            onClick={() => saveBlog(currentData)}
          >
            Lưu
          </Button>
        </div>
      </div>
      <div style={{marginTop: '80px' }}>{ calledApi == true ? <Toast show={calledApi} toggleShow={toggleShow} message="Cập nhật thành công" /> : ""}</div>
    </div>
  );
}

export default BlogDetailsForm
