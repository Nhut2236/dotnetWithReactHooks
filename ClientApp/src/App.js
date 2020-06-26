import React, { Suspense } from "react";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HOME, ABOUT, BLOG, BLOGDETAILS, LOGIN, REGISTER } from "./router";
import { Image, NavDropdown } from 'react-bootstrap';
import FloatButton from './components/floatButton/FloatButton';
import ReactIcon from './assets/svgs/react.svg';
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
    return (
      <div>
        <div>
          <Router>
            <div>
              <Navbar expand="lg" bg="" className="container" style={{backgroundColor: 'none'}}>
                <Navbar.Brand href="/" style={{marginRight: '30px'}}><img src={ReactIcon} style={{ width: '50px'}} /><span className="ml-3">React Demo</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="/" style={{ fontSize: '18px', marginRight: '30px'}}>Home</Nav.Link>
                    <Nav.Link href="/about" style={{ fontSize: '18px', marginRight: '30px'}}>About</Nav.Link>
                    <Nav.Link href="/blog" style={{ fontSize: '18px', marginRight: '30px'}}>Blog</Nav.Link>
                  </Nav>
                  {Token && userInfo && userInfo.Avatar ? (
                    <Image
                      src={userInfo.Avatar}
                      roundedCircle
                      style={avatarStyle}
                    />
                  ) : (
                    <span></span>
                  )}

                  {Token && userInfo && userInfo.Name ? (
                    <NavDropdown
                      title={userInfo.Name}
                      id="basic-nav-dropdown"
                      style={userNameStyle}
                      style={{ paddingRight: '5px', color: 'black'}}
                    >
                      <NavDropdown.Item href="/blog">
                        Quản lý Blog
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        Quản lý Event
                      </NavDropdown.Item>
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
                        className="mr-2"
                        onClick={() => redirectTo("/register")}
                      >
                        Sign Up
                      </Button>
                      <Button
                        variant="primary"
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
                  <Route path={BLOG}>
                    <BlogComponent />,
                  </Route>
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
          {/* <FloatButton /> */}
        </div>
      </div>
    );
}

export default App;