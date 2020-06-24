import React, { useContext, useEffect } from 'react';
import { Table, Image, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

function redirectTo(path){
  window.location.href = path;
}

const avatarStyle = {
  width: '50px',
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
};

const tableStyle = {
  overflowX: 'auto',
};

const paginationStyle = {
  float: 'right',
};

const BlogTabs = props => { 
  const classes = useStyles();
  return (
    <div>
      <div>
        <Table striped bordered hover variant="dark" style={tableStyle}>
          <thead>
            <tr className="text-center">
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Setting</th>
            </tr>
          </thead>
          <tbody>
            {props.blogList.length > 0 ? (
              props.blogList.map((blog) => (
                <tr key={blog.id}>
                  <td className="text-center">
                    <Image
                      src={blog.avatar}
                      roundedCircle
                      style={avatarStyle}
                    />
                  </td>
                  <td className="text-center">{blog.first_name}</td>
                  <td className="text-center">{blog.last_name}</td>
                  <td className="text-center">{blog.email}</td>
                  <td className="text-center">
                    <i
                      className="fa fa-edit"
                      onClick={() => props.editRow(blog)}
                      style={iconStyle}
                    />
                    <i
                      className="fa fa-trash ml-3 mr-3"
                      onClick={() => props.deleteBlog(blog.id)}
                      style={iconStyle}
                    />
                    <i
                      className="fa fa-info-circle"
                      onClick={() => redirectTo(`/blogDetails/${blog.id}`)}
                      style={iconStyle}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No blog</td>
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
