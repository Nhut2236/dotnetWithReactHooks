import React, {useContext} from "react";
import {store} from '../store';
const About = () => {
  const globalState = useContext(store);
  console.log(globalState);
  return (
    <div className="container" style={{marginTop: '100px'}}>
      <h1>ABOUT</h1>
    </div>
  );
};

export default About;
