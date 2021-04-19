import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import CartComponent from "./CartComponent";
import NavbarComponent from "./NavbarComponent";

const BookDetailComponent = (props) => {
  const [book] = useState(props.location.pathname);

  console.log(book);

  return (
    <div>
      <NavbarComponent {...props} />
      <Container>
        <Row>
          <Col md="9">Book Detail</Col>
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

export default BookDetailComponent;
