import React, { useContext, useEffect, useReducer, useState } from "react";
// import { initialState, reducer } from "../reducer/reducer";
import { AppContext } from "../Context";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineUpdate } from "react-icons/md";

import Form from "./Form";

function Table() {
  const {
    products,
    total,
    isShow,
    isClickUpdate,
    handleIsClickUpdate,
    handleTogge,
    handleUpdateProduct,
    handleRemoveProduct,
    handleTotal,
  } = useContext(AppContext);

  useEffect(() => {
    handleTotal();
  }, [products]);

  return (
    <div className="table-component">
      <div className="cart-table">
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {products.map((el) => {
              const { id, name, price, amount } = el;
              return (
                <tr key={id} onClick={() => handleIsClickUpdate(id)}>
                  <td>{id}</td>
                  <td>
                    {!isClickUpdate ? (
                      <div>{name}</div>
                    ) : (
                      <input
                        value={name}
                        onChange={(e) => handleUpdateProduct(e.target.value)}
                      />
                    )}
                  </td>
                  <td>{price}</td>
                  <td>{amount}</td>
                  <td>
                    {!isClickUpdate ? (
                      <div>
                        <AiOutlineCloseCircle
                          onClick={() => handleRemoveProduct(id)}
                        />
                        <MdOutlineUpdate
                          onClick={() => handleUpdateProduct(el)}
                        />
                      </div>
                    ) : (
                      "Update"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="info-bottom">
          <button onClick={handleTogge}>Create Product</button>
          <div className="totle">Total: {total}</div>
        </div>
      </div>
      {isShow && <Form />}
    </div>
  );
}

export default Table;
