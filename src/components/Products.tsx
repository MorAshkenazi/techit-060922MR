import { FunctionComponent, useEffect, useState } from "react";
import Product from "../interfaces/Product";
import { getProducts } from "../services/productsService";
import Navbar from "./Navbar";
import AddProductModal from "./AddProductModal";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
  let [products, setProducts] = useState<Product[]>([]);
  let isAdmin: boolean =
    JSON.parse(sessionStorage.getItem("userData") as string).isAdmin == true
      ? true
      : false;
  let [openAddModal, setOpenAddModal] = useState<boolean>(false);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  let handleAddProduct = () => {
    setOpenAddModal(true);
  };

  return (
    <>
      <Navbar />
      <h5 className="display-5 text-center">OUR PRODUCTS</h5>
      {isAdmin && (
        <button className="btn btn-success" onClick={handleAddProduct}>
          <i className="fa-solid fa-plus"></i> Product
        </button>
      )}
      {products.length ? (
        <div className="container">
          <div className="row">
            {products.map((product: Product) => (
              <div
                key={product.id}
                className="card ms-1 col-md-4"
                style={{ width: "18rem" }}
              >
                <div className="card-header">{product.category}</div>
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "100%" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="text-success">{product.price}₪</p>
                  <button className="btn btn-primary">
                    <i className="fa-solid fa-cart-plus"></i> Add to cart
                  </button>
                  {isAdmin && (
                    <>
                      <button className="btn btn-warning mx-2">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button className="btn btn-danger">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No products in store</p>
      )}
      <AddProductModal
        show={openAddModal}
        onHide={() => setOpenAddModal(false)}
      />
    </>
  );
};

export default Products;
