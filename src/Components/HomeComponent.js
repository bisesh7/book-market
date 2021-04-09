import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import BooksDisplayComponent from "./BooksDisplayComponent";
import CartComponent from "./CartComponent";
import NavbarComponent from "./NavbarComponent";
import { Alert } from "reactstrap";

const HomeComponent = (props) => {
  // Alert
  const [alertVisible, setAlertVisible] = useState(false);
  const onAlertDismiss = () => setAlertVisible(false);
  const [alertMessage, setAlertMessage] = useState("");

  //   Function to scroll to the alert
  const scrollToAlert = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (alertVisible) {
      scrollToAlert();
    }
  }, [alertVisible]);

  return (
    <div>
      <NavbarComponent />
      <Container>
        <Alert color="danger" isOpen={alertVisible} toggle={onAlertDismiss}>
          {alertMessage}
        </Alert>
        <Row>
          <Col md="9">
            <BooksDisplayComponent
              {...props}
              setAlertVisible={setAlertVisible}
              setAlertMessage={setAlertMessage}
              className="mt-3 mb-4"
            />
          </Col>
          <Col md="3">
            <strong>Cart</strong>
            <div className="sticky-top cart">
              <CartComponent {...props} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeComponent;
