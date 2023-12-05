import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "./model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository unit test", () => {
  let sequilize: Sequelize;
  beforeEach(async () => {
    sequilize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequilize.addModels([CustomerModel]);
    await sequilize.sync();
  });
  afterEach(async () => {
    await sequilize.close();
  });
  it("Should create a customer", async () => {
    const repository = new CustomerRepository();
    const address = new Address("Rua joão pessoa", 99, "zipcode", "bla");
    const customer = new Customer("1", "Cliente 1", address);

    await repository.create(customer);
    const result = await CustomerModel.findOne({ where: { id: "1" } });
    expect(result.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      active: customer.isActive(),
      street: customer.address.street,
      number: customer.address.number,
      zipCode: customer.address.zip,
      city: customer.address.city,
    });
  });
  it("Should update a Customer", async () => {
    const repository = new CustomerRepository();
    const address = new Address("Rua joão pessoa", 99, "zipcode", "bla");
    const customer = new Customer("1", "Cliente 1", address);

    await repository.create(customer);
    customer.desactive();
    await repository.update(customer);

    const result = await CustomerModel.findOne({ where: { id: "1" } });
    expect(result.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      active: false,
      street: customer.address.street,
      number: customer.address.number,
      zipCode: customer.address.zip,
      city: customer.address.city,
    });
  });
  it("Should find a customer", async () => {
    const repository = new CustomerRepository();
    const address = new Address("Rua joão pessoa", 99, "zipcode", "bla");
    const customer = new Customer("1", "Cliente 1", address);

    await repository.create(customer);
    const result = await repository.find("1");
    expect(customer).toStrictEqual(result);
  });
  // it("Should throw an error when customer is not found", async () => {
  //   const repository = new CustomerRepository();
  //   const address = new Address("Rua joão pessoa", 99, "zipcode", "bla");
  //   const customer = new Customer("1", "Cliente 1", address);

  //   await repository.create(customer);

  //   expect(async () => await repository.find("25641")).rejects.toThrow(
  //     "Customer not found"
  //   );
  // });
  it("Should findAll a customers", async () => {
    const repository = new CustomerRepository();
    const address = new Address("Rua joão pessoa", 99, "zipcode", "bla");
    const customer1 = new Customer("1", "Cliente 1", address);

    await repository.create(customer1);
    const customer2 = new Customer("2", "Cliente 1", address);
    await repository.create(customer2);

    const result = await repository.findAll();
    expect([customer1, customer2]).toStrictEqual(result);
  });
});
