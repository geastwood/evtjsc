import { expect } from "chai";
import Balance from "../src/Balance";
import Asset from "../src/Asset";

describe("Balance", () => {
  it("invalid number should fail", () => {
    const { success } = new Balance("fei", Asset.Evt).validate();
    expect(success).to.equal(false);
  });

  it("invalid precision should fail", () => {
    const { success, errorMsg } = new Balance("1.00", Asset.Evt).validate();
    expect(errorMsg).to.equal(
      'The precision of "1.00" is 2, which does not match 5 from the Asset.'
    );
    expect(success).to.equal(false);
  });

  it("should succeed", () => {
    const { success } = new Balance("1.00000", Asset.Evt).validate();
    expect(success).to.equal(true);
  });
});
