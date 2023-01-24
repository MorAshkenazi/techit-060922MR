import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import axios from "axios";
import Navbar from "./Navbar";

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
  let [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  let getProducts = async () => {
    try {
      // get userId from sessionStorage
      let userId: number = JSON.parse(
        sessionStorage.getItem("userData") as string
      ).userId;

      let products: Product[] = [];
      // get user cart (response object) according to his userId
      let cartRes = await axios.get(
        `${process.env.REACT_APP_API}/carts?userId=${userId}`
      );
      // get user cart (products numbers array)
      let productsIds: number[] = cartRes.data[0].products;
      for (let id of productsIds) {
        let productRes = await axios.get(
          `http://localhost:8000/products/${id}`
        );
        products.push(productRes.data);
      }
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      {products.length ? (
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: Product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>
                    <img src={product.image} style={{ width: "12rem" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-3">No products</p>
      )}
    </>
  );
};

export default Cart;
