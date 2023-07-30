import Product from "../entity/product";
import RepositoryInterface from "./respository.interface";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
