import React, { useContext, useState } from "react";
import { AppContext } from "../Context";
import Modal from "./Modal";
import Table from "./Table";

function Form() {
  const {
    isError,
    isProduct,
    handleAddProduct,
    handleUpdateProduct,
    handleErrorModal,
  } = useContext(AppContext);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  // handle price commas
  const handlePriceCustom = (value) => {
    let temp = value.replace(/[^0-9.]/g, "");
    let commasNumber = Number(temp).toLocaleString("en-AU");
    setPrice(commasNumber);
  };

  const handleProduct = (e) => {
    e.preventDefault();
    // if (isProduct) {
    let checkInput = [{ name }, { quantity }, { price }];
    if (!handleErrorModal(checkInput)) {
      handleAddProduct({ name, quantity, price });
      setName("");
      setQuantity("");
      setPrice("");
    }
    // } else {
    //   handleUpdateProduct();
    // }
  };

  return (
    <div className="cart-component">
      <div className="cart-wrap">
        <div className="form-add-edit">
          <form className="form">
            <div className="group-input">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="group-input">
              <label>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="group-input">
              <label>Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => handlePriceCustom(e.target.value)}
              />
            </div>
            <button className="create" onClick={handleProduct}>
              {isProduct ? "Create" : "Update"}
            </button>
          </form>
        </div>
        <Table />
      </div>
      <div>{isError && <Modal />}</div>
    </div>
  );
}

export default Form;
