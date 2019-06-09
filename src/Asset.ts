class Asset {
  readonly name: string;
  readonly precision: number;
  readonly id: number;
  constructor(id: number, name: string, precision: number) {
    this.id = id;
    this.name = name;
    this.precision = precision;
  }
}

export default Asset;
