import Product from "../entity/product";
import RepositoryInterface from "../../@shared/repository/respository.interface";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
