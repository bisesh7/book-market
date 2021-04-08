import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  Collapse,
} from "reactstrap";

const BooksCardComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // Creating number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NPR",
  });

  //   Converting dollar to npr
  const getNPRFromDollar = (dollarString) => {
    const dollar = dollarString.substring(1, dollarString.length);

    return formatter.format(dollar * 116);
  };

  //   getting the date formatted in mm-dd-yy
  const getFormattedDate = (date) => {
    const dateObj = new Date(date);
    // Since month starts from 0 in js
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return month + "-" + day + "-" + year;
  };

  const addToCardButtonHandler = (e) => {
    e.preventDefault();
    console.log(props.id);
  };

  return (
    <Card className="book-card" key={props.key}>
      <CardImg
        top
        width="100%"
        src={props.image}
        alt={props.title}
        className="book-card-image"
      />
      <CardBody>
        <CardTitle tag="h5">
          <div className="d-flex justify-content-between">
            {props.title}
            <small onClick={toggle} className="book-card-collpase-button">
              &#9660;
            </small>
          </div>
        </CardTitle>

        <Collapse isOpen={isOpen}>
          <CardText>
            <small>
              Price: {getNPRFromDollar(props.price)} <br />
              Stock: {props.stock} <br />
              Date Created: {getFormattedDate(props.published_date)} <br />
              Author: {props.author}
              <br />
              Genre: {props.genre}
            </small>
          </CardText>
        </Collapse>
        <br />
        {/* If stock is 0 we disable button */}
        <Button
          size="sm"
          color="secondary"
          disabled={props.stock <= 0}
          onClick={addToCardButtonHandler}
        >
          Add to cart
        </Button>
      </CardBody>
    </Card>
  );
};

export default BooksCardComponent;
