import FungibleTransfer from "./FungibleTransfer";
import * as fs from "fs";
import * as csv from "csv-parser";
import IValidator from "./IValidator";
import ISummary from "./ISummary";

class FungibleTransferBatch implements IValidator, ISummary {
  readonly transfers: FungibleTransfer[];
  constructor(transfers: FungibleTransfer[]) {
    this.transfers = transfers;
  }

  validate = () => {
    let success = true;
    let errors: string[] = [];

    this.transfers.forEach(t => {
      const validation = t.validate();
      success = success && validation.success;
      if (validation.errorMsg) {
        errors = [...errors, `${validation.errorMsg}`];
      }
    });
    return {
      success,
      errorMsg: errors.join("")
    };
  };

  summary = () => {
    const { success } = this.validate();
    if (!success) {
      return {
        success: false,
        errorMsg: "Unable to print summary, data is invalid.",
        data: []
      };
    }

    const sum = this.transfers
      .map(t => parseFloat(t.balance.balance))
      .reduce((a, b) => a + b, 0);

    return {
      success: true,
      data: [
        this.transfers.length,
        sum.toFixed(this.transfers[0].balance.asset.precision)
      ].map(String),
      errorMsg: ""
    };
  };
  static fromCsvFile = (filePath: string): Promise<FungibleTransferBatch> => {
    let rows: FungibleTransfer[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", row => {
          rows = [...rows, FungibleTransfer.of(row)];
        })
        .on("end", () => {
          resolve(new FungibleTransferBatch(rows));
        })
        .on("error", e => {
          reject(e);
        });
    });
  };
}

export default FungibleTransferBatch;
