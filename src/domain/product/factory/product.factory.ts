import { UUIDV4 } from "sequelize";
import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import ProductB from "../entity/productb";

export default class ProductFactory {
    public static create( type: string, name: string, price:number): ProductInterface {

        switch(type) {
            case "a":
                return new Product("ble", name, price);
            case "b":
                return new ProductB("bl2", name, price);
            default:
                throw new Error("Product type not supported");
        }
    }
}