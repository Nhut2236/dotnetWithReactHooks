import React, { useContext, useEffect, useState } from 'react';
import { Table, Image, Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import NoImage from '../../assets/svgs/no-image.svg';
import { store } from '../../store';

function redirectTo(path){
  window.location.href = path;
}

const avatarStyle = {
  width: '120px',
  height: '80px'
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const iconStyle = {
  cursor: 'pointer',
  fontSize: '16px'
};

const tableStyle = {
  overflowX: 'auto',
  fontSize: '13px'
};

const paginationStyle = {
  float: 'right',
};

const BlogTabs = props => {
  const [ checkList, setCheckList ] = useState([]);
  useEffect(()=>{
    var currentCheckList = checkList;
    for(var i = 0; i < props.blogList.length; i++ ){
      currentCheckList.push(false);
    };
    setCheckList(currentCheckList);
  },[]);
  const [ checkAll, setCheckAll ] = useState(props.checkAll);
  const classes = useStyles();
  const handleChange = ({target}) => {
    if(target.name=='checkAll'){
      var currentCheckList = [];
      for(var i = 0; i < props.blogList.length; i++ ){
        currentCheckList.push(target.value);
      };
      setCheckList(currentCheckList);
    }
    props.check(target);
  };
  return (
    <div>
      <div>
        <Table striped hover responsive variant="light" style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: "#333c45", color: "white" }}>
              <th className="text-center">
                <input
                  type="checkbox"
                  name="checkAll"
                  value={checkAll}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "checkAll",
                        value: e.target.checked,
                      },
                    })
                  }
                />
              </th>
              <th className="text-center">Ảnh đại diện</th>
              <th style={{minWidth: '200px'}}>Tiêu đề</th>
              <th className="text-center">Mô tả</th>
              <th className="text-center">Trạng thái</th>
              <th className="text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {props.blogList.length > 0 ? (
              props.blogList.map((blog, index) => (
                <tr key={index}>
                  <td className="text-center align-middle">
                    <input
                      type="checkbox"
                      name="checkList"
                      className="custorm-checkbox pointer"
                      value={checkList[index]}
                      onChange={(e) =>
                        handleChange({
                          target: {
                            name: blog.Id,
                            value: e.target.checked,
                          },
                        })
                      }
                    />
                  </td>
                  <td className="text-center align-middle">
                    {blog && blog.Avatar ? (
                      <Image src={blog.Avatar} style={avatarStyle} />
                    ) : (
                      <Image src={NoImage} style={avatarStyle} />
                    )}
                  </td>
                  <td className="font-weight-bold align-middle">
                    {blog.Title}
                  </td>
                  <td className="align-middle">{blog.Description}</td>
                  <td className="text-center font-weight-bold align-middle">
                    {blog.IsPublish ? "Đang đăng" : "Chưa đăng"}
                  </td>
                  <td className="text-center align-middle">
                    <i
                      className="fa fa-edit"
                      onClick={() => props.editRow(blog)}
                      style={iconStyle}
                    />
                    <i
                      className="fa fa-trash ml-3 mr-3"
                      onClick={() => props.deleteBlog(blog.Id)}
                      style={iconStyle}
                    />
                    <i
                      className="fa fa-info-circle"
                      onClick={() => redirectTo(`/blogDetails/${blog.Id}`)}
                      style={iconStyle}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No blog</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className={classes.root} style={paginationStyle}>
        <Pagination
          count={props.totalPage}
          color="primary"
          variant="outlined"
          onChange={(event, value) => {
            props.changePage(value);
          }}
        />
      </div>
    </div>
  );
}

export default BlogTabs
