import React, { useContext } from "react";
import { Col, ListGroupItem, Row } from "reactstrap";
import { addToBooks, removeFromBooks } from "../Actions/BookActions";
import { addToCart, removeFromCart } from "../Actions/CartActions";
import { BooksContext } from "../Contexts/BooksContext";
import { CartContext } from "../Contexts/CartContext";
import { getNPRFromDollar } from "../Functions/getNPRFromDollar";

const CartListGroupItem = (props) => {
  // Getting the cart from context
  const { cartDispatch } = useContext(CartContext);
  const { booksDispatch } = useContext(BooksContext);

  const quantityDecreaseHandler = (e) => {
    e.preventDefault();
    if (props.quantity > 0) {
      cartDispatch(removeFromCart(props.id));
      booksDispatch(addToBooks(props.id));
    }
  };

  const quantityIncreaseHandler = (e) => {
    e.preventDefault();
    if (props.stock > 0) {
      cartDispatch(addToCart(props.id));
      booksDispatch(removeFromBooks(props.id));
    }
  };

  return (
    <div>
      <ListGroupItem>
        <Row>
          <Col md="6">
            <img src={props.image} alt={props.name} className="cart-image" />
          </Col>
          <Col md="6">
            <small>
              {props.name} <br />
              Quantity: {props.quantity}{" "}
              <b className="cart-quantity-button">
                <span
                  className="cart-quantity-minus-button"
                  onClick={quantityDecreaseHandler}
                >
                  -
                </span>{" "}
                <span
                  className={
                    props.stock === 0
                      ? "cart-quantity-plus-button disabled-button"
                      : "cart-quantity-plus-button"
                  }
                  onClick={quantityIncreaseHandler}
                >
                  +
                </span>
              </b>
              <br />
              {getNPRFromDollar(
                props.quantity * props.price.substring(1, props.price.length)
              )}
            </small>
          </Col>
        </Row>
      </ListGroupItem>
    </div>
  );
};

export default CartListGroupItem;
