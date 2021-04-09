import React, { useContext, useEffect } from "react";
import { Col, ListGroupItem, Row } from "reactstrap";
import { addToCart, removeFromCart } from "../Actions/CartActions";
import { CartContext } from "../Contexts/CartContext";
import { getNPRFromDollar } from "../Functions/getNPRFromDollar";

const CartListGroupItem = (props) => {
  // Getting the cart from context
  const { cartDispatch } = useContext(CartContext);

  const quantityDecreaseHandler = (e) => {
    e.preventDefault();
    cartDispatch(removeFromCart(props.id));
  };

  const quantityIncreaseHandler = (e) => {
    e.preventDefault();
    cartDispatch(addToCart(props.id));
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
                  className="cart-quantity-plus-button"
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
