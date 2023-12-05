import Order from "../entity/order";
import RepositoryInterface from "../../@shared/repository/respository.interface";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
