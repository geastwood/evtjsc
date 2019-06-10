import Asset from "./Asset";
import IValidator from "./IValidator";

class Balance implements IValidator {
  readonly balance: string;
  readonly asset: Asset;

  constructor(balance: string, asset: Asset) {
    this.balance = balance;
    this.asset = asset;
  }

  static parse(raw: string): Balance {
    const parts = raw.trim().split(" ");

    if (parts.length !== 2) {
      throw new Error(`Failed to parse "${raw}"`);
    }

    if (Number.isNaN(parseFloat(parts[0]))) {
      throw new Error(`Failed to parse balance "${parts[0]}"`);
    }

    const assetParts = parts[1].trim().split("#");
    if (assetParts.length !== 2) {
      throw new Error(`Failed to parse Symbol "${parts[1]}"`);
    }

    const symbolId = parseInt(assetParts[1], 10);
    if (Number.isNaN(symbolId)) {
      throw new Error(`Failed to parse Symbol "${assetParts[1]}"`);
    }

    const balanceParts = parts[0].trim().split(".");

    if (balanceParts[1] === undefined || !balanceParts[1].length) {
      throw new Error(`Invalid balance "${parts[0]}"`);
    }

    // validate balance case of "1000.----", the second part must also be number like
    if (Number.isNaN(parseInt(balanceParts[1], 10))) {
      throw new Error(`Failed to parse balance "${parts[0]}"`);
    }

    const asset = new Asset(symbolId, balanceParts[1].length);
    return new Balance(parts[0], asset);
  }

  validate = () => {
    const balance = parseFloat(this.balance);

    if (Number.isNaN(balance)) {
      return {
        success: false,
        errorMsg: `"${this.balance}" is not a valid balance`
      };
    }

    const [, part1] = this.balance.split(".");

    if (part1 == null || part1.length !== this.asset.precision) {
      return {
        success: false,
        errorMsg: `The precision of "${this.balance}" is ${
          part1.length
        }, which does not match ${this.asset.precision} from the Asset.`
      };
    }

    return { success: true, errorMsg: "" };
  };
  getBalance = () => {
    return `${this.balance} S#${this.asset.id}`;
  };
}

export default Balance;
