import Product from "./Product";

export default interface Cart {
  id?: number;
  userId: number;
  products: Product[];
  active: boolean;
}
