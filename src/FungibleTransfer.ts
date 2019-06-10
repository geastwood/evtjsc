import Address from "./Address";
import Balance from "./Balance";
import IValidator from "./IValidator";

class FungibleTransfer implements IValidator {
  readonly from: Address;
  readonly to: Address;
  readonly balance: Balance;
  readonly memo: string;
  constructor(from: Address, to: Address, balance: Balance, memo: string = "") {
    this.from = from;
    this.to = to;
    this.balance = balance;
    this.memo = memo;
  }
  static of(raw: { from: string; to: string; balance: string; memo: string }) {
    return new FungibleTransfer(
      new Address(raw.from),
      new Address(raw.to),
      Balance.parse(raw.balance),
      raw.memo || ""
    );
  }
  validate = () => {
    let errors: string[] = [];
    let success = true;

    if (this.from.address === this.to.address) {
      return {
        success: false,
        errorMsg: `\"from\" and \"to\" have the same value "${
          this.from.address
        }"`
      };
    }

    // validate "from", "to" and "balance"
    [this.from, this.to, this.balance].forEach(field => {
      const result = field.validate();
      success = result.success && success;
      if (!result.success) {
        errors = [...errors, ` - ${result.errorMsg}`];
      }
    });

    return {
      success,
      errorMsg: errors.join("\n")
    };
  };
}

export default FungibleTransfer;
