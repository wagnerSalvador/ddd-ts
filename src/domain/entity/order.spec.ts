import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit test", () => {
  it("Should throw error when id is empty", () => {
    expect(() => new Order("", "idCustomer", [])).toThrowError(
      "Id is required"
    );
  });
  it("Should throw error when id is empty", () => {
    expect(() => new Order("id", "", [])).toThrowError(
      "customerId is required"
    );
  });
  it("Should throw error when items is empty", () => {
    expect(() => new Order("id", "idCustomer", [])).toThrowError(
      "Item qtd must be greater than zero"
    );
  });
  it("Should calculate total", () => {
    const orderId = "id";
    const item1 = new OrderItem(
      "idOrderItem1",
      "idProductShampoo",
      1,
      10,
      orderId
    );
    const item2 = new OrderItem(
      "idOrderItem1",
      "idProductCondicionador",
      1,
      15,
      orderId
    );
    const order = new Order(orderId, "idCustomer", [item1, item2]);

    expect(order.total()).toBe(25);
  });
  it("Should throw error when price item is empty", () => {
    expect(
      () => new OrderItem("idOrderItem1", "idProductShampoo", 1, -1, "orderId")
    ).toThrowError("Price is required");
  });
  it("Should throw error when quantity item is empty", () => {
    expect(
      () => new OrderItem("idOrderItem1", "idProductShampoo", -1, 10, "orderId")
    ).toThrowError("Quantity is required");
  });
});
