import React, { useState, useEffect  } from "react";
import LoginForm from "../components/forms/LoginForm";
import Toast from "../components/toasts/BasicToast"; 

const redirectTo = (path) => {
    window.location.href = path;
}

const Login = () => {
    var loginForm = { Username: "", Password: ""};
    const [Token, setToken] = useState(null);
    const [calledApi, setCalledApi] = useState(false);
    const toggleShow = () => {
      setCalledApi(false);
    };
    const LoginFromApi = async (data) => {
      try{
        const apiPath = `/api/User/Login`;
        const response = await fetch(apiPath, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
           body: JSON.stringify(data),
        }).then((response) => {
            response.json().then(async (response) => {
              if (response && response.token) {
                setToken(response.token);
                localStorage.setItem("TOKEN", response.token);
                localStorage.setItem("UserInfo", JSON.stringify(response.user));
                redirectTo('/');
              }
              else{
                setCalledApi(true);
              }
            });
        });
      }
      catch(e){
        console.log(e);
      }

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
    <div>
    { calledApi == true ? (<Toast toggleShow={toggleShow} show={calledApi} message="Đăng nhập thất bại" />) : ''}
    </div>
  </div> 
  );
};

export default Login;