import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address?: Address;
  private _active: boolean = false;

  constructor(id: string, name: string, address?: Address) {
    this._id = id;
    this._name = name;
    this._address = address;
    this.validate();
    
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }
  changeAddress(address: Address) {
    this._address = address;
  }
  activete() {
    if (!this._address) {
      throw new Error("Address is mandatory to active a customer");
    }

    this._active = true;
  }
  desactive() {
    this._active = false;
  }
  isActive(): boolean {
    return this._active;
  }
  get name(): string {
    return this._name;
  }
  get id(): string {
    return this._id;
  }
  get address(): Address {
    return this._address;
  }
}
