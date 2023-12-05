import { Sequelize } from "sequelize-typescript";
 
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderRepository from "./order.repository";
import OrderItemModel from "./model/order-item";
import CustomerModel from "../../../customer/repository/sequelize/model/customer.model";
import ProductModel from "../../../product/repository/sequelize/model/product.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./model/order.model";

describe("Order repository test", () => {
  let sequilize: Sequelize;
  beforeEach(async () => {
    sequilize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequilize.addModels([
      OrderModel,
      OrderItemModel,
      CustomerModel,
      ProductModel,
    ]);
    await sequilize.sync();
  });
  afterEach(async () => {
    await sequilize.close();
  });
  it("Should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Rua joão pessoa", 99, "zipcode", "bla");
    const customer = new Customer("1", "Cliente 1", address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const item1 = new OrderItem("Item1", product.id, 1, 10, "1");

    const order = new Order("1", customer.id, [item1]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });
    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: order.total(),
      items: [
        {
          id: item1.id,
          product_id: product.id,
          quantity: 1,
          price: item1.price,
          order_id: order.id,
        },
      ],
    });
  });
  it("Should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Rua joão pessoa", 99, "zipcode", "bla");
    const customer = new Customer("1", "Cliente 1", address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const item1 = new OrderItem("Item1", product.id, 1, 10, "1");

    const order = new Order("1", customer.id, [item1]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const result = await orderRepository.find(order.id);
    expect(result).toStrictEqual(order);
  });
  it("Should findAll a order", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Rua joão pessoa", 99, "zipcode", "bla");
    const customer = new Customer("1", "Cliente 1", address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const item1 = new OrderItem("Item1", product.id, 1, 10, "1");
    const order1 = new Order("1", customer.id, [item1]);

    const item2 = new OrderItem("Item2", product.id, 1, 10, "2");
    const order2 = new Order("2", customer.id, [item2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const result = await orderRepository.findAll();
    expect([order1, order2]).toStrictEqual(result);
   });
  it("Should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Rua joão pessoa", 99, "zipcode", "bla");
    const customer = new Customer("1", "Cliente 1", address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await productRepository.create(product);

    const item1 = new OrderItem("Item1", product.id, 1, 10, "1");

    let order = new Order("1", customer.id, [item1]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    const item2 = new OrderItem("Item2", product.id, 1, 10, "1");
    order = new Order(order.id, order.customerId, [item1, item2]);

    await orderRepository.update(order);

    const result = await orderRepository.find(order.id);
    expect(result).toStrictEqual(order);
  });
});
