import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user/context";
import Toast from "react-bootstrap/Toast";
import ToastBody from "react-bootstrap/ToastBody";
import ToastHeader from "react-bootstrap/ToastHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
function Toasts() {
  const context = useContext(UserContext);
  const [showA, setShowA] = useState(true);

  function handleClose() {
    context.clearError();
  }
  if (context.errordata) {
    return (

        <Toast show={showA} onClose={handleClose} delay={3000}>
        <Toast.Header>
          <img src="" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Bootstrap</strong>
          {/* <small>11 mins ago</small> */}
        </Toast.Header>
        <Toast.Body>{context.errordata}</Toast.Body>
      </Toast>

    );
  }
  return null;
}

export default Toasts;
