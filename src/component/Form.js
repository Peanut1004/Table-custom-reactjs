import React, { useContext, useState } from "react";
import { AppContext } from "../Context";

function Form() {
  const { isProduct, handleAddProduct, handleTogge, handleUpdateProduct } =
    useContext(AppContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleProduct = (e) => {
    e.preventDefault();
    if (isProduct) {
      const amountDefautl = 1;
      handleAddProduct({ name, price, amount: amountDefautl });
    } else {
      handleUpdateProduct();
    }
    setName("");
    setPrice("");
  };

  return (
    <div className="form-add-edit-product">
      <h3>Infomation Product</h3>
      <form className="form">
        <div className="group-input">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="group-input">
          <input
            type="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="">
          <button className="create" onClick={handleProduct}>
            {isProduct ? "Create" : "Update"}
          </button>
          <button className="cancel" onClick={handleTogge}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
