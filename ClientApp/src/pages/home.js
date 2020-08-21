import React, { useState, useEffect, useContext } from "react";
import {store} from "../store";
import sendRequest from "../helpers/api";
import { getList } from "../actions/blog";
import BlogTab from "../components/tabs/BlogTabs";
import _ from 'lodash';

const Home = () => {
 
  //variable & state
  const globalStore = useContext(store);  
  const state = globalStore.state;
  const { dispatch } = globalStore;
  const [searchRequest, setSearchRequest] = useState(state.blog.searchRequest);
  const [data, setData] = useState({data: null, total: 0});
  const [editing, setEditing] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const query = { Title: searchRequest.title, PageIndex: searchRequest.pageIndex, PageSize: searchRequest.pageSize, IsPublish: searchRequest.publish };
  
  //methods
  const getBlogList = async () => {
    var res = await getList(query); // call action get api
    dispatch({ type: "SET_BLOGLIST", value: { data: res.Data , total: res.Total } }); // mutation set state.blog.data (globalState)
    setData({data: state.blog.data, total: state.blog.total }); // set state data (indexState)
  };

  const changePage = (pageIndex) => {
    dispatch({ type: "SET_PAGE_INDEX", value: pageIndex }); // mutation set state.blog.searchRequest.pageIndex (globalState)
    getBlogList(); // call api again
  };

  const deleteBlog =  async (id) => {
    var res = await deleteBlog(id); 
    getBlogList(); // call api again
  };

  //created
  useEffect(() => {
    getBlogList();
    deleteBlog();
  }, []);

  // render html 
  return (
    <div className="container" style={{marginTop: '100px'}}>
      <div style={{marginTop:'80px'}} className="container">
        { state.blog && state.blog.data ? (
          <BlogTab blogList={state.blog.data}  
                   totalPage={state.blog.total / searchRequest.pageSize < 0 ? 1 : Math.ceil(state.blog.total / searchRequest.pageSize)} 
                   changePage={changePage} 
                   deleteBlog={deleteBlog}             
                   checkAll={checkAll}/> 
          ) : "" 
        }
      </div>
    </div>
  );
};

export default Home;
