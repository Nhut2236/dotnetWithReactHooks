import React, { useState, useEffect  } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import Toast from "../components/toasts/BasicToast"; 

const redirectTo = (path) => {
    window.location.href = path;
}

const Register = () => {
    const [calledApi, setCalledApi] = useState(false);
    var registerForm = { email: "", password: ""};
    const RegisterFromApi = async ( data ) =>{
        const apiPath = `https://reqres.in/api/register`;
        const response = await fetch(apiPath, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((response) => {
          response.json().then( async (response) => {
            setCalledApi(true);
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
        <RegisterForm registerForm={registerForm} register={RegisterFromApi} />
      </div>
    </div>
    { calledApi == true ? (<Toast/>) : ''}
  </div> 
  );
};

export default Register;