import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { BooksContext } from "../Contexts/BooksContext";
import { getNumberFromString } from "../Functions/getNumberFromString";
import CartComponent from "./CartComponent";
import NavbarComponent from "./NavbarComponent";

const BookDetailComponent = (props) => {
  const [bookId, setBookId] = useState();

  useState(() => {
    try {
      setBookId(getNumberFromString(props.match.params.book));
    } catch (err) {
      props.history.push("/");
    }
  }, []);

  // Getting the books from context
  const { books } = useContext(BooksContext);

  const [book, setBook] = useState(null);

  useEffect(() => {
    const book = books.books.find((book) => book.id === bookId);
    setBook(book);
  }, [books]);

  useEffect(() => {
    console.log(book);
  }, [book]);

  return (
    <div>
      <NavbarComponent {...props} />
      <Container>
        <Row>
          <Col md="9">{book ? book.id : null}</Col>
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
