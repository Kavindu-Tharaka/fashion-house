import React, { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";
import axios from "axios";

function CartItem(props) {
  const itemId = props.cartItemId;

  const customerToken = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + customerToken,
    },
  };

  const [cartItems, setCartItems] = useContext(CartContext);

  const decreaseQuantity = (itemId, currentQty) => {
    axios
      .patch(
        `http://localhost:8000/api/v1/carts/${itemId}`,
        {
          quantity: currentQty - 1,
        },
        config
      )
      .then(() => {
        setCartItems((currentCartItems) =>
          currentCartItems.map((item) =>
            itemId === item._id ? { ...item, quantity: currentQty - 1 } : item
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const increseQuantity = (itemId, currentQty) => {
    axios
    .patch(
      `http://localhost:8000/api/v1/carts/${itemId}`,
      {
        quantity: currentQty + 1,
      },
      config
    )
    .then(() => {
      setCartItems((currentCartItems) =>
        currentCartItems.map((item) =>
          itemId === item._id ? { ...item, quantity: currentQty + 1 } : item
        )
      );
    })
    .catch((err) => console.log(err));
  };

  const removeCartItem = (itemId) => {

    if (window.confirm("Are you sure?")) {
      
      axios
      .delete(
        `http://localhost:8000/api/v1/carts/${itemId}`,
        config
      )
      .then(() => {
        setCartItems(
          cartItems.filter((item) => {
            return itemId !== item._id;
          })
        );
      })
      .catch((err) => console.log(err));
      
    }
  };

  return (
    <tr>
      <th scope="row">
        <div className="p-2">
          <img
            src="https://res.cloudinary.com/mhmd/image/upload/v1556670479/product-2_qxjis2.jpg"
            alt=""
            width="70"
            className="img-fluid rounded shadow-sm"
          />
          <div className="ml-3 d-inline-block align-middle">
            <h5 className="mb-0">
              <a href="#" className="text-dark d-inline-block">
                {props.productName}
              </a>
            </h5>
            <span className="text-muted font-weight-normal">
              <small className="text-muted">Size : {props.productSize}</small>
              <br />
              <small className="text-muted">Color : {props.productColor}</small>
              <br />
            </span>
          </div>
        </div>
      </th>

      <td className="align-middle">
        <strong>{`Rs. ${props.productPrice * props.productQuantity}`}</strong>
      </td>
      <td className="align-middle">
        <button
          onClick={() => decreaseQuantity(itemId, props.productQuantity)}
          className="badge badge-secondary"
          disabled={props.productQuantity === 1}
        >
          -
        </button>
        <strong>{props.productQuantity}</strong>
        <button
          onClick={() => increseQuantity(itemId, props.productQuantity)}
          className="badge badge-secondary"
          disabled={props.productQuantity === props.productAvailableQuantity}
        >
          +
        </button>
      </td>
      <td className="align-middle">
        <a onClick={() => removeCartItem(itemId)} className="text-dark">
          <i className="fa fa-2x fa-trash"></i>
        </a>
      </td>
    </tr>
  );
}

export default CartItem;
