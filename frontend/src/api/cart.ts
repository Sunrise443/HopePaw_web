import api from "./axios";

export const addItemToCart = (itemId: number) => {
  return api.post(`/cart/items/${itemId}`);
};

export const getCartItems = () => {
  return api.get("/cart/items/");
};

export const removeItemFromCart = (itemId: number) => {
  return api.delete(`/cart/items/${itemId}`);
};
