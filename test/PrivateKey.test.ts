import { expect } from "chai";
import PrivateKey from "../src/PrivateKey";

describe("PrivateKey", () => {
  it("invalid private key", () => {
    const { success, errorMsg } = new PrivateKey("EVT000").validate();
    expect(errorMsg).to.equal("The private key passed in is not valid.");
    expect(success).to.equal(false);
  });

  it("valid address", () => {
    const { success } = new PrivateKey(
      "5JV1kctxPzU3BdRENgRyDcUWQSqqzeckzjKXJWSkBoxXmXUCqKB"
    ).validate();
    expect(success).to.equal(true);
  });
});
