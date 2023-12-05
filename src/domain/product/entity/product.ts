//API Application Programming Interface é a forma que minha classe se comunica com os outros.

import ProductInterface from "./product.interface";

export default class Product implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }
  validate() {
    if (this._id.length === 0) throw new Error("Id is required");
    if (this._name.length === 0) throw new Error("Name is required");
    if (this._price < 0) throw new Error("Price is required");
  }
  changeName(name: string) {
    this._name = name;
    this.validate();
  }
  changePrice(newPrice: number) {
    this._price = newPrice;
    this.validate();
  }
  public get name(): string {
    return this._name;
  }
  public get price(): number {
    return this._price;
  }
  public get id(): string {
    return this._id;
  }
}
