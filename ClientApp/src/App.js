import React, { Suspense, useEffect, useState, useContext } from "react";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HOME, ABOUT, BLOG, BLOGDETAILS, LOGIN, REGISTER } from "./router";
import { Image, NavDropdown } from 'react-bootstrap';
import FloatButton from './components/floatButton/FloatButton';
import ReactIcon from './assets/svgs/react.svg';
import {store} from './store';
// import SideBar from './components/sidebar/Sidebar';
//import PageComponents
const HomeComponent = React.lazy(() => import("./pages/home"));
const AboutComponent = React.lazy(() => import("./pages/about"));
const BlogComponent = React.lazy(() => import("./pages/blog"));
const BlogDetailsComponent = React.lazy(() => import("./pages/blogDetails"));
const LoginComponent = React.lazy(() => import("./pages/login"));
const RegisterComponent = React.lazy(() => import("./pages/register"));

//methods
function redirectTo(path) {
    window.location.href = path;
}

const logOut = () => {
    localStorage.clear();
    redirectTo('/login');
}

const Token = localStorage.getItem("TOKEN");

const userInfo = JSON.parse(localStorage.getItem("UserInfo"));

const userNameStyle = {
    color: 'white',
    textDecoration: 'none'
};

//css
const avatarStyle = {
    width: '35px',
};

const App = () => {
    const globalState = useContext(store);
    const { dispatch } = globalState;
    const [permission, setPermission] = useState(null);
    
    const getPermission = async () => {
      const apiPath = `/api/Permission/Get/${userInfo.Permission}`;
      const response = await fetch(apiPath, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'Authorization': `Bearer ${Token}`
          },
        }).then(response => {
          response.json().then(data =>{
            setPermission(data.data);
            dispatch({ type: 'SET_COLOR', value: 'black' });
          })
        });
    };

    useEffect( () =>{
      if(Token && userInfo.Permission){
        getPermission();
      }
    },[]);

    var pathname = window.location.pathname;
    if(pathname.includes('/blog')){
      pathname = '/blog'
    }
    return (
      <div>
        <div>
          <Router>
            <div>
              <Navbar expand="lg" bg="" style={{backgroundColor: 'white', borderBottom: '2px solid #f1f1f1'}} fixed="top">
                <Navbar.Brand href="/" style={{marginRight: '30px'}}><img src={ReactIcon} style={{ width: '50px'}} /><span className="ml-3">React Demo</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto" activeKey={pathname}>
                    <Nav.Link href="/" style={{ fontSize: '18px', marginLeft: '20px'}}>Home</Nav.Link>
                    <Nav.Link href="/about" style={{ fontSize: '18px', marginLeft: '20px'}}>About</Nav.Link>
                    { permission && permission.ViewBlog ? (<Nav.Link href="/blog" style={{ fontSize: '18px', marginLeft: '20px'}}>Blog</Nav.Link>) : "" }
                  </Nav>
                  {Token && userInfo && userInfo.Name && permission ? (
                    <NavDropdown
                      title={<span><Image src={userInfo.Avatar} roundedCircle style={avatarStyle}/><span style={{color: 'black'}} className="ml-2">{userInfo.Name}</span></span>}
                      id="basic-nav-dropdown"
                      style={userNameStyle} 
                    >
                      { permission && permission.ViewBlog ? (
                          <NavDropdown.Item href="/blog">
                            Quản lý Blog
                          </NavDropdown.Item>
                      ) : "" }  
                      { permission && permission.ViewEvent ? (
                          <NavDropdown.Item>
                            Quản lý Event
                          </NavDropdown.Item>
                      ) : "" }                    
                      <NavDropdown.Item>
                        Quản lý User
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        onClick={() => {
                          logOut();
                        }}
                      >
                        Log out
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <div>
                      <Button
                        variant="danger"
                        className="mr-2 ml-3 button-custom"
                        onClick={() => redirectTo("/register")}
                      >
                        Sign Up
                      </Button>
                      <Button
                        variant="primary"
                        className="button-custom"
                        onClick={() => redirectTo("/login")}
                      >
                        Sign In
                      </Button>
                    </div>
                  )}
                </Navbar.Collapse>
              </Navbar>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route path={REGISTER}>
                    <RegisterComponent />,
                  </Route>
                  <Route path={LOGIN}>
                    <LoginComponent />,
                  </Route>
                  { permission && permission.ViewBlog ? (
                  <Route path={BLOG}>
                    <BlogComponent />,
                  </Route>
                  ) : "" }
                  <Route path={BLOGDETAILS}>
                    <BlogDetailsComponent />,
                  </Route>
                  <Route path={ABOUT}>
                    <AboutComponent />
                  </Route>
                  <Route path={HOME}>
                    <HomeComponent />,
                  </Route>
                </Switch>
              </Suspense>
            </div>
          </Router>
        </div>
        <div>
          {/* <SideBar /> */}
        </div>
      </div>
    );
}

export default App;