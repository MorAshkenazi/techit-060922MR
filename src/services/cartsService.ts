import axios from "axios";
import Product from "../interfaces/Product";

const api: string = process.env.REACT_APP_API + "/carts" || "";

// add product to user's cart
export async function addProductToCart(productId: number) {
  let productsArr: number[] = [];
  let cartId: number = 0;
  let userId: number = JSON.parse(
    sessionStorage.getItem("userData") as string
  ).userId;

  // get user cart (and save his products)
  try {
    let res = await axios.get(`${api}?userId=${userId}`);
    productsArr = res.data[0].products;
    cartId = res.data[0].id;
    productsArr.push(productId);
    return axios.patch(`${api}/${cartId}`, { products: productsArr });
  } catch (error) {
    console.log(error);
  }
}

// create cart for user
export function createCart(userId: number) {
  return axios.post(api, { userId, products: [], active: true });
}

// get user's products in cart by userId
export async function getProductsInCart() {
  try {
    // get userId from sessionStorage
    let userId: number = JSON.parse(
      sessionStorage.getItem("userData") as string
    ).userId;

    // get user cart (response object) according to his userId
    let cartRes = await axios.get(
      `${process.env.REACT_APP_API}/carts?userId=${userId}`
    );
    // get user cart (products numbers array)
    let productsIds: number[] = cartRes.data[0].products;

    // wait for all products promises
    const promiseArr = await Promise.all(
      productsIds.map((id) =>
        axios.get(`${process.env.REACT_APP_API}/products/${id}`)
      )
    );

    // get array of data only
    let products: Product[] = promiseArr.map((res) => res.data);
    console.log(products);

    return products;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
