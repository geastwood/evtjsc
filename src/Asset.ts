class Asset {
  readonly name: string;
  readonly precision: number;
  readonly id: number;
  constructor(id: number, name: string, precision: number) {
    this.id = id;
    this.name = name;
    this.precision = precision;
  }
  static Evt = new Asset(1, "EVT", 5);
}

export default Asset;
