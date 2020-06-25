import React, { useState, useEffect  } from "react";
import LoginForm from "../components/forms/LoginForm";

const redirectTo = (path) => {
    window.location.href = path;
}

const Login = () => {
    var loginForm = { Username: "", Password: ""};
    const [Token, setToken] = useState(null);
    const LoginFromApi = async (data) => {
        const apiPath = `/api/User/Login`;
        const response = await fetch(apiPath, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
           body: JSON.stringify(data),
        }).then((response) => {
          response.json().then( async (response) => {
            if (response && response.token) {
              setToken(response.token);
              localStorage.setItem("TOKEN", response.token);
              localStorage.setItem("UserInfo", JSON.stringify(response.user));
              redirectTo('/');
            }
          });
        });
    }

  const divStyle = {
    marginTop: '5%',
  };

  return (
    <div className="container">
    <div className="flex-row" style={divStyle}>
      <div className="flex-large">
        <LoginForm loginForm={loginForm} login={LoginFromApi} />
      </div>
    </div>
  </div> 
  );
};

export default Login;