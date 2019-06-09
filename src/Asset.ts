class Asset {
  readonly name: string;
  readonly precision: number;
  readonly id: number;
  constructor(id: number, precision: number, name: string = "untitled") {
    this.id = id;
    this.name = name;
    this.precision = precision;
  }
  static Evt = new Asset(1, 5, "EVT");
}

export default Asset;
