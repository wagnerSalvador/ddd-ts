import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit test", () => {
  it("Should throw error em id is empty", () => {
    expect(
      () =>
        new Customer(
          "",
          "João",
          new Address("Caracas", 127, "89032457", "Blumenau")
        )
    ).toThrowError("Id is required");
  });
  it("Should throw error em name is empty", () => {
    expect(
      () =>
        new Customer(
          "1",
          "",
          new Address("Caracas", 127, "89032457", "Blumenau")
        )
    ).toThrowError("Name is required");
  });
  it("Should  change name", () => {
    const customer = new Customer(
      "1",
      "Robson",
      new Address("Caracas", 127, "89032457", "Blumenau")
    );

    customer.changeName("wagnao");
    expect(customer.name).toEqual("wagnao");
  });
  it("Should customer is active", () => {
    const customer = new Customer(
      "1",
      "Robson",
      new Address("Caracas", 127, "89032457", "Blumenau")
    );

    customer.activete();
    expect(customer.isActive()).toBe(true);
  });
  it("Should throw error when address is undefined when you activate a customer", () => {
    const customer = new Customer("1", "Robson");
    expect(() => customer.activete()).toThrowError(
      "Address is mandatory to active a customer"
    );
  });
  it("Should customer deactivate", () => {
    const customer = new Customer(
      "1",
      "Robson",
      new Address("Caracas", 127, "89032457", "Blumenau")
    );

    customer.desactive();
    expect(customer.isActive()).toBe(false);
  });
});
