export const addToCart = (payload) => {
  return {
    type: "ADD_TO_CART",
    payload,
  };
};

export const removeItem = (payload) => {
  return {
    type: "REMOVE_ITEM",
    payload,
  };
};

export const updateItem = (payload) => {
  return {
    type: "UPDATE_ITEM",
    payload,
  };
};
