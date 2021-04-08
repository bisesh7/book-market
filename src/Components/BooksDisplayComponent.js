import React, { useContext, useEffect } from "react";
import { Container, CardColumns } from "reactstrap";
import { BooksContext } from "../Contexts/BooksContext";
import BooksCardComponent from "./BooksCardComponent";

const BooksDisplayComponent = (props) => {
  const { books } = useContext(BooksContext);

  useEffect(() => {
    console.log(books);
  }, [books]);

  return (
    <Container>
      <div className="d-flex justify-content-end">
        <span>Filter</span>
      </div>
      <div className={props.className}>
        <CardColumns>
          <BooksCardComponent
            title="Bamity"
            image="http://dummyimage.com/250x250.png/cc0000/ffffff"
            price="$0.32"
            stock="3"
            author="Nikos"
            genre="Drama"
            published_date="2020/11/29"
          />
        </CardColumns>
      </div>
    </Container>
  );
};

export default BooksDisplayComponent;
