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

  it("parse balance", () => {
    expect(() => {
      const balance = "";
      Balance.parse(balance);
    }).to.throw('Failed to parse ""');

    expect(() => {
      const balance = "invalid";
      Balance.parse(balance);
    }).to.throw('Failed to parse "invalid"');

    expect(() => {
      const balance = "1 2 3";
      Balance.parse(balance);
    }).to.throw('Failed to parse "1 2 3"');

    expect(() => {
      const balance = "whatnot S#1";
      Balance.parse(balance);
    }).to.throw('Failed to parse balance "whatnot"');

    expect(() => {
      const balance = "1000.00000 S#";
      Balance.parse(balance);
    }).to.throw('Failed to parse Symbol ""');

    expect(() => {
      const balance = "1000.00000 S#s";
      Balance.parse(balance);
    }).to.throw('Failed to parse Symbol "s"');

    expect(() => {
      const balance = "1000 S#5";
      Balance.parse(balance);
    }).to.throw('Invalid balance "1000"');

    expect(() => {
      const balance = "1000. S#5";
      Balance.parse(balance);
    }).to.throw('Invalid balance "1000."');

    expect(() => {
      const balance = "1000.--- S#5";
      Balance.parse(balance);
    }).to.throw('Failed to parse balance "1000.---"');

    expect(() => {
      const balance = "1000.10 S#5";
      Balance.parse(balance);
    }).to.not.throw();
  });
});
