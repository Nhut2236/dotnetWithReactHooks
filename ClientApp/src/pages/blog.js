import React, { useState, useEffect, useContext, useReducer  } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import BlogTab from "../components/tabs/BlogTabs";
import BlogModal from "../components/modal/BlogModal";
import { BLOG_DATA } from "../constants/common";
import { store } from '../store';
import { Button, Row, Col, Form } from "react-bootstrap";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';

const Blog = () => {
  let dataApi = null;
  dataApi = BLOG_DATA;
  const initialFormState = { id: null, title: ""};
  // Setting state
  const [blogList, setBlogList] = useState(dataApi);
  const [checkList, setCheckList] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentBlog, setCurrentBlog] = useState(initialFormState);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkAll, setCheckAll] = useState(false);
  const [show, setShow] = useState(false);
  const [isPublish, setIsPublish] = useState(true);
  const [title, setTitle] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [editing, setEditing] = useState(false);

  async function getDataFromApi( title, publish){
    const apiPath = `/api/Blog/GetAll`;
    const response = await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json',
        },
        body: JSON.stringify({ Title: title, PageIndex: currentPage, PageSize: pageSize, IsPublish: publish }),
      }).then(response => {
        response.json().then(data =>{
          setBlogList(data.data.Data);
          setTotal(data.data.Total);
          dispatch({ type: "SET_BLOGLIST", value: { data: data.data.Data , total: data.data.Total } });
        })
      });
  }

  function handleToggle() {
    let value = !editing;
    setEditing(value);
  }

  const globalState = useContext(store);
  const { dispatch } = globalState;

  useEffect(() => {
    getDataFromApi("",true);
  }, []);
  // CRUD operations
  const deleteBlog = (id) => {
    setEditing(false);
    setBlogList(blogList.filter((blog) => blog.Id !== id));
  };

  const editRow = (blog) => {
    setEditing(true)
    setCurrentBlog(title,blog);
  };

  const changePage = (pageIndex) => {
    setCurrentPage(pageIndex);
    getDataFromApi(title,true);
  };

  const updateData = () => {
    // setBlogList(blogList.map((blog) => (blog.id === blogUpdated.id ? blogUpdated : blog)));
  };

  const divStyle = {
    marginTop: '5%',
    paddingBottom:'40px'
  };

  const check = (data) =>{
    if(data.name == "checkAll" && data.value==true){
      setShow(data.value);
      setCheckList(_.flatMap(blogList, "Id"));
      setCheckAll(true);
    }
    else if(data.name=="checkAll" && data.value==false){
      setShow(data.value);
      setCheckList([]);
      setCheckAll(false);
    }
    else{
      if(data.value==false){
        var checkListCurrent = checkList;
        checkListCurrent = _.filter(checkListCurrent,(item) => item !== data.name);
        setCheckList(checkListCurrent);
        if(checkListCurrent && !checkListCurrent.length)
        setShow(false);
      }
      else{
        var checkListCurrent = checkList;
        checkListCurrent.push(data.name);
        setCheckList(checkListCurrent);
        setShow(data.value);
      }
    }
  };

  const handleChangeStatus = event => {
    setIsPublish(event.target.value);
    getDataFromApi(title,event.target.value);
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
    getDataFromApi(event.target.value,isPublish);
  };

  const statusList = [
    { name: 'Đang đăng', isPublish: true },
    { name: 'Đang ẩn', isPublish: false }
  ]

  return (
    <div className="container">
      <div className="flex-row" style={divStyle}>
        <div className="flex-large">
          <div className="mt-3 mb-3">
            <Row>
              <Col md="7" className="mb-2">
                <Row>
                  <Col md="8">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      name="Title"
                      value={title}
                      onChange={handleTitleChange}
                    />
                  </Form.Group>
                  </Col>
                  <Col md="4">
                    <FormControl variant="outlined" style={{ minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-outlined-label">Trạng thái</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={isPublish}
                        onChange={handleChangeStatus}
                        label="isPublish"
                      >
                        {statusList && statusList.length ? statusList.map((status,index)=>(
                          <MenuItem key={index} value={status.isPublish}>{status.name}</MenuItem>
                        )) : ""}
                      </Select>
                    </FormControl>
                  </Col>
                </Row>
              </Col>
              <Col md="5" className="text-right">
                { show && checkList && checkList.length ? <Button variant="danger" className="mr-3">Xóa</Button> : ""}
                <Button variant="info">Tạo mới</Button>
              </Col>
            </Row>
            </div>
          <BlogTab
            blogList={blogList}
            editRow={editRow}
            deleteBlog={deleteBlog}
            totalPage={total / pageSize < 0 ? 1 : Math.ceil(total / pageSize)}
            changePage={changePage}
            check={check}
            checkAll={checkAll}
          />
        </div>
      </div>
      {editing == true ? (
        <BlogModal
          Title="Edit Blog Form"
          data={currentBlog}
          closeModal={handleToggle}
          updateData={updateData}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Blog;