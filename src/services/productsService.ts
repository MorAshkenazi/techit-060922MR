import axios from "axios";
import Product from "../interfaces/Product";

const api: string = process.env.REACT_APP_API + "/products" || "";

// get all products
export function getProducts() {
  return axios.get(api);
}

// get specific product
export function getProductById(id: string) {
  return axios.get(`${api}/${id}`);
}

// add new product
export function addProduct(productToAdd: Product) {
  return axios.post(api, productToAdd);
}

// update product (includes id field)
export function updateProduct(newProduct: Product) {
  return axios.put(`${api}/${newProduct.id}`, newProduct);
}

// delete product
export function deleteProduct(id: string) {
  return axios.delete(`${api}/${id}`);
}
