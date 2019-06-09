import Asset from "./Asset";
import IValidator from "./IValidator";

class Balance implements IValidator {
  readonly balance: string;
  readonly asset: Asset;

  constructor(balance: string, asset: Asset) {
    this.balance = balance;
    this.asset = asset;
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
}

export default Balance;
