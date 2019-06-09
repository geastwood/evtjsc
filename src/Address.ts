import Evt from "evtjs";
import IValidator from "./IValidator";

class Address implements IValidator {
  readonly name: string;
  readonly address: string;
  constructor(address: string, name: string = "untitled") {
    this.name = name;
    this.address = address;
  }
  validate = () => {
    const isValid = Evt.EvtKey.isValidAddress(this.address);

    if (!isValid) {
      return {
        success: false,
        errorMsg: `Address "${this.address}" is not valid.`
      };
    }

    return { success: true, errorMsg: "" };
  };
}

export default Address;
