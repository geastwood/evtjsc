import config from "./config";
import ITransfer from "./ITransfer";
import * as Binance from "@binance-chain/javascript-sdk";

class Bep2Transfer implements ITransfer {
  readonly from: string;
  readonly to: string;
  readonly balance: string;
  readonly memo: string;
  private constructor(from: string, to: string, balance: string, memo: string = "") {
    const checkAddress = Binance.crypto.checkAddress;
    const prefix = config.bepAddressPrefix;

    if (from === to) {
      throw new Error(`From and To has same value "${from}"`);
    }

    if (!checkAddress(from, prefix)) {
      throw new Error(`Binance address "${from}" is invalid`);
    }

    if (!checkAddress(to, prefix)) {
      throw new Error(`Binance address "${to}" is invalid`);
    }

    if (isNaN(Number(balance))) {
      throw new Error(`Balance "${balance}" is invalid`);
    }

    if (Number(balance) <= 0) {
      throw new Error(`Balance "${balance}" can not be equal or smaller than 0`);
    }

    this.from = from;
    this.to = to;
    this.balance = balance;
    this.memo = memo;
  }
  getTo() {
    return this.to;
  }
  getAmount() {
    return this.balance;
  }
  static of(from: string, to: string, balance: string, memo: string = "") {
    return new Bep2Transfer(from, to, balance, memo);
  }
}

export default Bep2Transfer;

