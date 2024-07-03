import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE } from "./redux/cartSlice";
import { DELETE } from "./redux/cartSlice";
function Card() {
  let card = useSelector((state) => state.cartPage);
  console.log(card);
  let dispatch = useDispatch();
  let [total, setTotal] = useState();

  const handleQtyChange = (id, qty) => {
    console.log(id, qty);
    if (qty >= 0) {
      dispatch(CHANGE({ id, qty }));
    }
  };

  useEffect(() => {
    totals(card);
  });

  const totals = (datas) => {
    let tot = 0;
    datas.forEach((e) => {
      let subprice = e.price * e.qty;
      tot += subprice;
    });
    setTotal(tot);
  };

  return (
    <>
      <section className="shopping-cart dark">
        <div className="container">
          <div className="block-heading">
            <h2>Shopping Cart</h2>
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="items">
                  {card.map((e, i) => {
                    return (
                      <>
                        <div className="product" key={i}>
                          <div className="row">
                            <div className="col-md-3">
                              <img
                                className="img-fluid mx-auto d-block image"
                                src={e.thumbnail}
                              />
                            </div>
                            <div className="col-md-8">
                              <div className="info">
                                <div className="row">
                                  <div className="col-md-5 product-name">
                                    <div className="product-name">
                                      <a href="#">{e.title}</a>
                                      <div className="product-info">
                                        <div>
                                          Discription:{" "}
                                          <span className="value">
                                            {e.description}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-4 quantity">
                                    <label>Quantity:</label>
                                    <div className="d-flex">
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() =>
                                        handleQtyChange(e.id, e.qty - 1)
                                      }
                                    >
                                      -
                                    </button>
                                    <input
                                      id="quantity"
                                      type="number"
                                      value={e.qty}
                                      className="quantity-input"
                                      onChange={() =>
                                        handleQtyChange(
                                          e.id,
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() =>
                                        handleQtyChange(e.id, e.qty + 1)
                                      }
                                    >
                                      +
                                    </button>
                                    </div>
                                  </div>
                                  <div className="col-md-3 price">
                                    <span>${e.price}</span>
                                    <Button
                                      variant="danger"
                                      onClick={() => dispatch(DELETE(i))}
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-12 col-lg-4">
                <div className="summary">
                  <h3>Summary</h3>
                  <div className="summary-item">
                    <span className="text">Subtotal</span>
                    <span className="price">${total}</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Shipping</span>
                    <span className="price">Free</span>
                  </div>
                  <div className="summary-item">
                    <span className="text">Total</span>
                    <span className="price">${total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Card;
