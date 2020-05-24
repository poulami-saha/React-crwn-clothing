import React from "react";
import "./checkoutitem.styles.scss";

import {
  removeItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions";
import { connect } from "react-redux";

const CheckoutItem = ({
  cartItem,
  removeItemFromCart,
  addItem,
  removeItem,
}) => {
  const { name, price, quantity, imageUrl } = cartItem;
  return (
    <div class="checkout-item">
      <div className="image-container">
        <img alt="item" src={imageUrl} />
      </div>
      <span className="name">{name}</span>

      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>

      <span className="price">{price}</span>
      <span
        className="remove-button"
        onClick={() => removeItemFromCart(cartItem)}
      >
        &#10005;
      </span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeItemFromCart: (item) => dispatch(removeItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
