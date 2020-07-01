import React, { useState, useEffect, useContext } from "react";
import { useParams} from "react-router";
import BlogDetailsForm from '../components/forms/BlogDetailsForm';
import { store } from '../store';


const LogDetails = () => {
  const params = useParams();
  const dataFake = { Avatar: null, Title: "", Description: "", InGroup: [] };
  const [currentId, setCurrentId] = useState(params.id);
  const [currentData, setCurrentData] = useState(dataFake);
  const GetById = async () => {
    const Token = localStorage.getItem("TOKEN");
    const apiPath = `/api/Blog/Get/${currentId}`;
    const response = await fetch(apiPath, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${Token}`
      },
    }).then((response) => {
      response.json().then((data) => {
        setCurrentData(data.data);
      });
    });
  };

  const divStyle = {
    marginTop: "2%",
    marginTop: '100px'
  };

  useEffect(() => {
    GetById();
  }, []);

  return (
    <div className="container" style={divStyle}>
      { currentData && currentData.Title ? <BlogDetailsForm currentData={currentData} /> : "" }
    </div>
  );
};

export default LogDetails;
