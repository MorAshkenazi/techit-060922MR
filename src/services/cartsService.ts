import axios from "axios";
import Product from "../interfaces/Product";

const api: string = process.env.REACT_APP_API + "/carts" || "";

// add product to user's cart
export function addProductToCart(product: Product) {
  return axios.post(api, product, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}

// get user's products in cart by userId
export function getProductsInCart() {
  return axios.get(api, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("userData") as string)
        .token,
    },
  });
}
