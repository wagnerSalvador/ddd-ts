import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {

    it('Should create a product A', () => {

        const product = ProductFactory.create("a", "Product A", 1);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe("Product")    
    });
    it('Should create a product B', () => {

        const product = ProductFactory.create("b","Product B", 1);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe("ProductB");
    })
})