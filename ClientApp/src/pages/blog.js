import React, { useState, useEffect, useContext, useReducer  } from "react";
import BlogTab from "../components/tabs/BlogTabs";
import BlogModal from "../components/modal/BlogModal";
import { BLOG_DATA } from "../constants/common";
import { store } from '../store';

const Blog = () => {
  let dataApi = null;
  dataApi = BLOG_DATA;
  const initialFormState = { id: null, title: ""};
  // Setting state
  const [blogList, setBlogList] = useState(dataApi);
  const [totalPage, setTotalPage] = useState(0);
  const [currentBlog, setCurrentBlog] = useState(initialFormState);
  const [currentPage, setCurrentPage] = useState(1);
  const [editing, setEditing] = useState(false);
  async function getDataFromApi(){
    const apiPath = `https://reqres.in/api/users?page=${currentPage}`;
    const response = await fetch(apiPath, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json',
        },
      }).then(response => {
        response.json().then(data =>{
          setBlogList(data.data);
          setTotalPage(data.total_pages);
          dispatch({ type: "SET_BLOGLIST", value: data.data });
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
    getDataFromApi();
  }, []);
  // CRUD operations
  const deleteBlog = (id) => {
    setEditing(false);
    setBlogList(blogList.filter((blog) => blog.id !== id));
  };

  const editRow = (blog) => {
    setEditing(true)
    setCurrentBlog(blog);
  };

  const changePage = (pageIndex) => {
    setCurrentPage(pageIndex);
    getDataFromApi();
  };

  const updateData = () => {
    // setBlogList(blogList.map((blog) => (blog.id === blogUpdated.id ? blogUpdated : blog)));
  };

  const divStyle = {
    marginTop: '5%',
  };

  return (
    <div className="container">
      <div className="flex-row" style={divStyle}>
        <div className="flex-large">
          <BlogTab
            blogList={blogList}
            editRow={editRow}
            deleteBlog={deleteBlog}
            totalPage={totalPage}
            changePage={changePage}
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