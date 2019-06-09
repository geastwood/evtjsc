import { expect } from "chai";
import Address from "../src/Address";

describe("Address", () => {
  it("invalid address", () => {
    const { success, errorMsg } = new Address("EVT000").validate();
    expect(errorMsg).to.equal('Address "EVT000" is not valid.');
    expect(success).to.equal(false);
  });

  it("valid address", () => {
    const { success } = new Address(
      "EVT7mGEucj6d2AgY9Ao9xL3smFZC3NkQEawddKQpr2esZzNvdzjYH"
    ).validate();
    expect(success).to.equal(true);
  });
});
