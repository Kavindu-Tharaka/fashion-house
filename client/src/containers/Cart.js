import React, { useContext, useMemo, useEffect, useState } from "react";
import CartItems from "../components/CartItems/CartItems";
import CartBillItems from "../components/CartBillItems/CartBillItems";
import { CartContext } from "../contexts/CartContext";
import Session from "../util/Session";
import axios from "axios";

const Cart = (props) => {
  let arrtemp = [];

  
  let total = 0;
  const customerId = Session.getId();
  const customerToken = localStorage.getItem("token");

  const [cartItems, setCartItems] = useContext(CartContext);

  
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + customerToken,
    },
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/carts?user=${customerId}`, config)
      .then((res) => {
        arrtemp = res.data.data.carts;

        arrtemp.forEach((item) => {
          axios
            .get(`http://localhost:8000/api/v1/products/${item.product}`)
            .then((res) => {
              arrtemp = arrtemp.map((arrItem) => {
                return arrItem.product === item.product
                  ? {
                      ...arrItem,
                      productName: res.data.data.product.name,
                      productPrice: res.data.data.product.price,
                      productAvailableQuantity: res.data.data.product.quantity,
                    }
                  : arrItem;
              });
              return arrtemp;
            })
            .then((res) => setCartItems(res))
            .catch((err) => console.log(err));
        });

      })
      .catch((err) => console.log(err));

  }, [total]);

  useMemo(
    () =>
    cartItems.forEach((item) => {
      total += item.productPrice * item.quantity;
    }),
    [cartItems]
  );


  return (
    <div className="container-fuild p-5">
      <div className="row">
        <div className="col-md-9">
          {/* Table Starts */}
          <div className="row">
            <div className="col-sm-12 p-5 bg-white rounded shadow-sm mb-5">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 bg-light">
                        <div className="p-2 px-3 text-uppercase">Product</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Price</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Quantity</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase"></div>
                      </th>
                    </tr>
                  </thead>
                  {/* Table body starts*/}
                  <CartItems />
                  {/* Table body ends*/}
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* cart summary starts */}
        <div className="col-md-3">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your Bill</span>
            <span className="badge badge-secondary badge-pill">
              {cartItems.length} Products
            </span>
          </h4>
          <ul className="list-group mb-3">
            <CartBillItems />
            <li className="list-group-item d-flex justify-content-between bg-light">
              <span>
                <h5>Total Amount</h5>
              </span>
              <h4>
                <strong>Rs.{total}</strong>
              </h4>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <hr className="mb-4" />
              <button
                className="btn btn-secondary btn-lg btn-block"
                type="submit"
              >
                Continue to checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Cart;
