import { expect } from "chai";
import Bep2Transfer from "../src/Bep2Transfer";

describe("Balance", () => {
  it("invalid fungible transfer", () => {
    const from = "first";
    const to = "second";
    const balance = "1";
    expect(() => {
      Bep2Transfer.of(from, to, balance, "memo");
    }).to.throw();
  });

  it("invalid fungible transfer with same 'from' and 'to'", () => {
    const from = "tbnb1ffxzdd37u7djmkkafqvdldwxaleg0zcrp0w8hn";
    const to = "tbnb1ffxzdd37u7djmkkafqvdldwxaleg0zcrp0w8hn";
    const balance = "1000.00000";
    expect(() => {
      Bep2Transfer.of(from, to, balance, "memo");
    }).to.throw();
  });

  it("valid fungible transfer", () => {
    const from = "tbnb1ltytz6mm37fjpha4gu9zl4plu93fmhgns66ahd";
    const to = "tbnb1ffxzdd37u7djmkkafqvdldwxaleg0zcrp0w8hn";
    const balance = "1000.00000";
    let transfer = null;
    expect(() => {
      transfer = Bep2Transfer.of(from, to, balance, "memo");
    }).to.not.throw();

    expect(transfer.balance).to.equal(balance);
  });
});
