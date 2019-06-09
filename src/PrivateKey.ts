import Evt from "evtjs";
import IValidator from "./IValidator";

class PrivateKey implements IValidator {
  readonly wif: string;
  constructor(wif: string) {
    this.wif = wif;
  }
  validate = () => {
    if (!Evt.EvtKey.isValidPrivateKey(this.wif)) {
      return {
        success: false,
        errorMsg: "The private key specified is invalid."
      };
    }

    return {
      success: true,
      errorMsg: ""
    };
  };
}

export default PrivateKey;
