import { expect } from "chai";
import Address from "../src/Address";
import FungibleTransfer from "../src/FungibleTransfer";
import Balance from "../src/Balance";
import Asset from "../src/Asset";

describe("Balance", () => {
  it("invalid fungible transfer", () => {
    const from = new Address("EVT_from");
    const to = new Address("EVT_to");
    const balance = new Balance("1000.00000", Asset.Evt);
    const { success, errorMsg } = new FungibleTransfer(
      from,
      to,
      balance,
      "memo"
    ).validate();
    console.log(errorMsg);
    expect(success).to.equal(false);
  });

  it("invalid fungible transfer with same 'from' and 'to'", () => {
    const from = new Address(
      "EVT7mGEucj6d2AgY9Ao9xL3smFZC3NkQEawddKQpr2esZzNvdzjYH"
    );
    const to = new Address(
      "EVT7mGEucj6d2AgY9Ao9xL3smFZC3NkQEawddKQpr2esZzNvdzjYH"
    );
    const balance = new Balance("1000.00000", Asset.Evt);
    const { success, errorMsg } = new FungibleTransfer(
      from,
      to,
      balance,
      "memo"
    ).validate();
    console.log(errorMsg);
    expect(success).to.equal(false);
  });

  xit("valid fungible transfer", () => {
    const from = new Address("EVT_from");
    const to = new Address("EVT_to");
    const balance = new Balance("1000.00000", Asset.Evt);
    const { success, errorMsg } = new FungibleTransfer(
      from,
      to,
      balance,
      "memo"
    ).validate();
    console.log(errorMsg);
    expect(success).to.equal(false);
  });
});
