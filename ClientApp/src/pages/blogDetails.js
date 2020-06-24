import React, { useState, useEffect, useContext } from "react";
import { useParams} from "react-router";
import BlogDetailsForm from '../components/forms/BlogDetailsForm';
import { store } from '../store';


const LogDetails = () => {
  const params = useParams();
  const dataFake = { avatar: "", email: "", first_name: "", last_name: "" };
  const [currentId, setCurrentId] = useState(params.id);
  const [currentData, setCurrentData] = useState(dataFake);
  const GetById = async () => {
    const apiPath = `https://reqres.in/api/users/${currentId}`;
    const response = await fetch(apiPath, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        setCurrentData(data.data);
      });
    });
  };

  const divStyle = {
    marginTop: "2%",
  };

  useEffect(() => {
    GetById();
  }, []);

  return (
    <div className="container" style={divStyle}>
      <BlogDetailsForm currentData={currentData} />
    </div>
  );
};

export default LogDetails;
