import React, { useState, useEffect  } from "react";
import LoginForm from "../components/forms/LoginForm";

const redirectTo = (path) => {
    window.location.href = path;
}

const Login = () => {
    var loginForm = { email: "", password: ""};
    const [Token, setToken] = useState("");
    const LoadUserProfile = async () => {
        const apiPath = `https://reqres.in/api/users/4`;
        const response = await fetch(apiPath, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type':'application/json',
            },
          }).then(response => {
            response.json().then(data =>{
                console.log(data);
                localStorage.setItem("EMAIL", data.data.email);
                localStorage.setItem("AVATAR", data.data.avatar);
            })
          });
        }
    const LoginFromApi = async ( data ) =>{
        const apiPath = `https://reqres.in/api/login`;
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
              await LoadUserProfile();
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