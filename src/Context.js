import React, { useState } from "react";

export const AppContext = React.createContext();

function AppProvider({ children }) {
  const data = [
    {
      id: 1,
      name: "Iphone",
      price: 20,
    },
    {
      id: 2,
      name: "Samsung",
      price: 20,
    },
  ];

  const customProduct = data.map((el) => ({ ...el, amount: 1 }));

  const [products, setProducts] = useState(customProduct);
  const [isShow, setIsShow] = useState(false);
  const [isProduct, setIsProduct] = useState(true);
  const [isClickUpdate, setIsClickUpdate] = useState(false);
  const [total, setTotal] = useState(null);

  const handleTogge = () => {
    setIsShow(!isShow);
  };

  const handleAddProduct = (item) => {
    const id = Math.max.apply(
      Math,
      products.map((el) => el.id)
    );
    setProducts([...products, { ...item, id: id + 1 }]);
    setIsShow(false);
  };

  const handleIsClickUpdate = () => {
    setIsClickUpdate(true);
  };

  const handleUpdateProduct = (product) => {
    // setIsShow(true);
    // setIsProduct(false);
  };

  const handleRemoveProduct = (id) => {
    let newItem = products.filter((el) => el.id !== id);
    setProducts(newItem);
  };

  const handleTotal = () => {
    let totalProduct = products.reduce((total, el) => {
      return (total = total + el.price * el.amount);
    }, 0);
    setTotal(totalProduct);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        total,
        isShow,
        isProduct,
        isClickUpdate,
        handleIsClickUpdate,
        handleTogge,
        handleAddProduct,
        handleUpdateProduct,
        handleRemoveProduct,
        handleTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
