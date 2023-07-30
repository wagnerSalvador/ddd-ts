import Customer from "../entity/customer";
import RepositoryInterface from "./respository.interface";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
