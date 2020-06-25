import React, { useState, useEffect  } from "react";
import { Toast } from "react-bootstrap";

const BasicToast = props => {
    const [show, setShow] = useState(props.show);
    return (
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <Toast onClose={props.toggleShow} show={show} delay={2000} autohide>
          <Toast.Header>
            <i className="fa fa-info-circle" />
            <strong className="mr-auto ml-2">Thông báo</strong>
          </Toast.Header>
          <Toast.Body> {props.message} </Toast.Body>
        </Toast>
      </div>
    );
}

export default BasicToast
