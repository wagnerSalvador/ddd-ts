import Product from "./product";

describe("Product unit test", () => {
  it("Should throw error when id is empty", () => {
    expect(() => new Product("", "Produto 1", 1)).toThrowError(
      "Id is required"
    );
  });
  it("Should throw error when name is empty", () => {
    expect(() => new Product("idProduto1", "", 1)).toThrowError(
      "Name is required"
    );
  });
  it("Should throw error when is lesss then zero", () => {
    expect(() => new Product("idProduto1", "Colgate", -1)).toThrowError(
      "Price is required"
    );
  });
  it("Should be change name", () => {
    const produto = new Product("idProduto1", "Colgate", 1);
    produto.changeName("Sorriso");
    expect(produto.name).toBe("Sorriso");
  });
  it("Should be change name is required name", () => {
    const produto = new Product("idProduto1", "Colgate", 1);
    expect(() => produto.changeName("")).toThrowError("Name is required");
  });
  it("Should be change price", () => {
    const produto = new Product("idProduto1", "Colgate", 1);
    produto.changePrice(20);
    expect(produto.price).toBe(20);
  });
  it("Should be change price, price is required", () => {
    const produto = new Product("idProduto1", "Colgate", 1);
    expect(() => produto.changePrice(-1)).toThrowError("Price is required");
  });
});
