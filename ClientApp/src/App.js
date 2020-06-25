import React, { Suspense } from "react";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HOME, ABOUT, BLOG, BLOGDETAILS, LOGIN, REGISTER } from "./router";
import { Image, NavDropdown } from 'react-bootstrap';
import FloatButton from './components/floatButton/FloatButton';
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
              <Navbar expand="lg" bg="light">
                <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/blog">Blog</Nav.Link>
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
                    >
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
          <FloatButton />
        </div>
      </div>
    );
}

export default App;