import Order from "../entity/order";
import RepositoryInterface from "./respository.interface";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
