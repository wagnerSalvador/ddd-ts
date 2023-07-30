export default class OrderItem {
  private _id: string;
  private _producId: string;
  private _quantity: number;
  private _price: number;
  private _orderId: string;

  constructor(
    id: string,
    productId: string,
    quantity: number,
    price: number,
    orderId: string
  ) {
    this._id = id;
    this._producId = productId;
    this._quantity = quantity;
    this._price = price;
    this._orderId = orderId;
    this.validate();
  }
  validate() {
    if (this._price < 0) throw new Error("Price is required");
    if (this._quantity < 0) throw new Error("Quantity is required");
  }
  calculatePrice(): number {
    return this._price * this._quantity;
  }
  get id(): string {
    return this._id;
  }

  get productId(): string {
    return this._producId;
  }
  get quantity(): number {
    return this._quantity;
  }
  get price(): number {
    return this._price;
  }

  get orderId(): string {
    return this._orderId;
  }
}
