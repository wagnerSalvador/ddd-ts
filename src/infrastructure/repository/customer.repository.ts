import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    console.log(entity);
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      street: entity.address.street,
      number: entity.address.number,
      zipCode: entity.address.zip,
      city: entity.address.city,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id: entity.id,
        name: entity.name,
        active: entity.isActive(),
        street: entity.address.street,
        number: entity.address.number,
        zip: entity.address.zip,
        city: entity.address.city,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
  async find(id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findOne({ where: { id } });
    if (!customerModel) throw new Error("Customer not found");
    return new Customer(
      customerModel.id,
      customerModel.name,
      new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipCode,
        customerModel.city
      )
    );
  }
  async findAll(): Promise<Customer[]> {
    const all = await CustomerModel.findAll();
    return all.map(
      (customerModel) =>
        new Customer(
          customerModel.id,
          customerModel.name,
          new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zipCode,
            customerModel.city
          )
        )
    );
  }
}
