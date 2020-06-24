import React, { useState, useEffect  } from "react";
import { Toast } from "react-bootstrap";

const BasicToast = props => {
    return (
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <Toast    
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Thông báo</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body> Đăng ký thành công ! </Toast.Body>
        </Toast>
      </div>
    );
}

export default BasicToast
