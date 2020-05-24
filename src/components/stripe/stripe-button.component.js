import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButtom = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_hpBIxU5N7C4zNUkPmbA0IICq00Bq4HA0oO";

  const onToken = (token) => {
    alert("Payment Successful");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="Crwn Clothing"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};
export default StripeCheckoutButtom;
