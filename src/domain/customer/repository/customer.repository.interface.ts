import Customer from "../entity/customer";
import RepositoryInterface from "../../@shared/repository/respository.interface";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
