import React, { useState } from "react";

export const AppContext = React.createContext();

function AppProvider({ children }) {
  const data = [
    {
      id: 1,
      name: "Iphone",
      quantity: 2,
      price: "20,000,000",
    },
    {
      id: 2,
      name: "Samsung",
      quantity: 1,
      price: "2,000,000",
    },
  ];

  const [products, setProducts] = useState(data);
  const [isProduct, setIsProduct] = useState(true);
  // const [isUpdate, setUpdate] = useState(false);
  const [total, setTotal] = useState(null);

  const [isError, setIsError] = useState(false);
  const [formError, setFormError] = useState({});

  // handle Error Input
  const handleButtonModal = () => {
    setIsError(false);
  };

  // handle error modal
  const handleErrorModal = (arr) => {
    let isRequired = false;
    let error = {};

    arr.map((el) => {
      const { name, quantity, price } = el;
      if (name === "" || (name && name.length > 20)) {
        error.name = "Please enter Product Name(not empty, max length is 20)";
      }
      if (quantity === "" || +quantity === 0 || +quantity > 10) {
        error.quantity =
          "Please enter Quantity is getter than zero and max value is 10";
      }
      if (
        price === "" ||
        1000000 > formatPrice(price) ||
        formatPrice(price) > 10000000
      ) {
        error.price =
          "Please enter Price with value from 1,000,000 to 10,000,000";
      }
    });
    for (let keys in error) {
      if (error.hasOwnProperty(keys)) {
        isRequired = true;
        setIsError(true);
        setFormError(error);
      }
    }
    return isRequired;
  };

  // handle add product
  const handleAddProduct = (item) => {
    const id = Math.max.apply(
      Math,
      products.map((el) => el.id)
    );
    setProducts([...products, { ...item, id: id + 1 }]);
  };

  // format price total
  const formatPrice = (price) => {
    let newPrice;
    if (typeof price === "string") {
      newPrice = parseFloat(price.replace(/[^0-9-.]/g, ""));
    }
    if (typeof price === "number") {
      newPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return newPrice;
  };

  // handle change quantity
  const handleChangeQuantity = (type, value, index) => {
    const newProduct = [...products];
    const newItem = { ...products[index] };
    // console.log(newProduct.filter((el) => console.log(el)));

    // console.log(typeof value);
    if (+value === 0) {
      newProduct.splice(index, 1);
      setProducts(newProduct);
    } else {
      newItem[type] = value;
      newProduct[index] = newItem;
      setProducts(newProduct);
    }
    if (+value > 10) {
      return;
    }
  };

  // handle remove product
  const handleRemoveProduct = (id) => {
    let newItem = products.filter((el) => el.id !== id);
    setProducts(newItem);
  };

  // handle Total
  const handleTotal = () => {
    let totalProduct = products.reduce((total, el) => {
      return (total = total + formatPrice(el.price) * el.quantity);
    }, 0);
    setTotal(formatPrice(totalProduct));
  };

  return (
    <AppContext.Provider
      value={{
        products,
        total,
        isProduct,
        // isUpdate,
        isError,
        handleChangeQuantity,
        handleAddProduct,
        handleRemoveProduct,
        handleTotal,
        formatPrice,
        handleErrorModal,
        handleButtonModal,
        formError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
