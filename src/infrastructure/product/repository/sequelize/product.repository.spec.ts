import { Sequelize } from "sequelize-typescript";
import ProductModel from "./model/product.model";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository unit test", () => {
  let sequilize: Sequelize;
  beforeEach(async () => {
    sequilize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequilize.addModels([ProductModel]);
    await sequilize.sync();
  });
  afterEach(async () => {
    await sequilize.close();
  });
  it("Should create a product", async () => {
    const repository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await repository.create(product);
    const result = await ProductModel.findOne({ where: { id: "1" } });
    expect(result.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });
  });
  it("Should update a product", async () => {
    const repository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);
    await repository.create(product);
    product.changeName("Virou colgate");
    await repository.update(product);

    const result = await ProductModel.findOne({ where: { id: "1" } });
    expect(result.toJSON()).toStrictEqual({
      id: "1",
      name: "Virou colgate",
      price: 100,
    });
  });
  it("Should find a product", async () => {
    const repository = new ProductRepository();
    const product = new Product("1", "colgate", 100);
    await repository.create(product);
    const result = await repository.find("1");
    expect(product).toStrictEqual(result);
  });
  it("Should findAll a product", async () => {
    const repository = new ProductRepository();
    const product = new Product("1", "colgate", 100);
    await repository.create(product);
    const product2 = new Product("2", "colgate", 100);
    await repository.create(product2);
    const result = await repository.findAll();
    expect([product, product2]).toStrictEqual(result);
  });
});
