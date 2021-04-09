import React, { useContext, useState } from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  Collapse,
} from "reactstrap";
import { addToCart } from "../Actions/CartActions";
// import { BooksContext } from "../Contexts/BooksContext";
import { CartContext } from "../Contexts/CartContext";
import { getNPRFromDollar } from "../Functions/getNPRFromDollar";

const BooksCardComponent = (props) => {
  // Getting the cart from context
  const { cart, cartDispatch } = useContext(CartContext);
  // const { books } = useContext(BooksContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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

    const add = () => {
      cartDispatch(addToCart(props.id));
    };

    // Check if there are 5 different books in cart
    if (cart.books.length === 5) {
      // If the cart has five book but user has selected book in cart
      if (cart.books.some((bookInCart) => bookInCart.bookId === props.id)) {
        add();
      } else {
        props.setAlertMessage(
          "5 different books in in the cart. You cannot select more than 5 different books."
        );
        props.setAlertVisible(true);
      }
    } else {
      add();
    }
  };

  // If there are multiple genres then we need to format them
  const getFormattedGenre = (unformattedGenre) => {
    const genres = unformattedGenre.split("|");
    let formattedGenre = "";
    genres.forEach((genre, index) => {
      if (index !== genres.length - 1) formattedGenre += genre + ", ";
      else formattedGenre += genre;
    });
    return formattedGenre;
  };

  return (
    <Card className="book-card" key={props.id}>
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
            {isOpen ? (
              <small onClick={toggle} className="book-card-collpase-button">
                &#9650;
              </small>
            ) : (
              <small onClick={toggle} className="book-card-collpase-button">
                &#9660;
              </small>
            )}
          </div>
        </CardTitle>

        <Collapse isOpen={isOpen}>
          <CardText>
            <small>
              Price:{" "}
              {getNPRFromDollar(props.price.substring(1, props.price.length))}{" "}
              <br />
              Stock: {props.stock} <br />
              Date Created: {getFormattedDate(props.published_date)} <br />
              Author: {props.author}
              <br />
              Genre:{" "}
              {props.genre.includes("|")
                ? getFormattedGenre(props.genre)
                : props.genre}
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
