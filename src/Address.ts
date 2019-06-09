import Evt from "evtjs";

class Address {
  readonly name: string;
  readonly address: string;
  constructor(address: string, name: string = "untitled") {
    this.name = name;
    this.address = address;
  }

  getName = () => this.name;
  getAddress = () => this.address;
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
