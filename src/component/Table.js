import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Table() {
  const {
    products,
    total,
    isUpdate,
    handleChangeQuantity,
    handleRemoveProduct,
    handleTotal,
    formatPrice,
  } = useContext(AppContext);

  useEffect(() => {
    handleTotal();
  }, [products]);

  return (
    <div className="cart-info">
      {products.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>SubTotal</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {products
                .map((el, index) => {
                  const { id, name, quantity, price } = el;
                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>
                        <div>{name}</div>
                      </td>
                      <td>
                        <div>
                          <input
                            value={quantity}
                            type="number"
                            onChange={(e) =>
                              handleChangeQuantity(
                                "quantity",
                                e.target.value,
                                index
                              )
                            }
                          />
                        </div>
                      </td>
                      <td>{price}</td>
                      <td>
                        {formatPrice(el.quantity * formatPrice(el.price))}
                      </td>
                      <td>
                        {!isUpdate ? (
                          <AiOutlineCloseCircle
                            onClick={() => handleRemoveProduct(id)}
                          />
                        ) : (
                          <div>Update</div>
                        )}
                      </td>
                    </tr>
                  );
                })
                .filter((el) => el.quantity !== 0)}
            </tbody>
          </table>
          <div className="cart-total">
            <p>Total: {total}</p>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <h3>Your cart is empty</h3>
          <p>
            No items added in your cart. Please add product to yourcart list.
          </p>
        </div>
      )}
    </div>
  );
}

export default Table;
