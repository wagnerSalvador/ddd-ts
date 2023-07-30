export default class Address {
  private _street: string = "";
  private _number: number = 0;
  private _zip: string = "";
  private _city: string = "";

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this.validate();
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }
    if (this._number === 0) {
      throw new Error("Number is required");
    }
    if (this._city.length === 0) {
      throw new Error("City is required");
    }
    if (this._zip.length === 0) {
      throw new Error("Zip code is required");
    }
  }

  public get street(): string {
    return this._street;
  }
  public get number(): number {
    return this._number;
  }
  public get zip(): string {
    return this._zip;
  }
  public get city(): string {
    return this._city;
  }
}
