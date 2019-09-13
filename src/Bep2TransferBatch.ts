import Bep2Transfer from "./Bep2Transfer";
import Binance from "./Binance";
import * as fs from "fs";
import * as csv from "csv-parser";
import ISummary from "./ISummary";
import config from "./config";

class Bep2TransferBatch implements ISummary {
  readonly transfers: Bep2Transfer[];
  constructor(transfers: Bep2Transfer[]) {
    this.transfers = transfers;
  }

  isBatch = () => {
    return this.transfers.length > 1;
  };

  transfer = async (client: Binance, memo: string = "") => {
    const isBatch = this.isBatch();

    if (this.transfer.length === 0) {
      throw new Error("There is no transfer");
    }

    const first = this.transfers[0];

    let trx = null;

    if (!isBatch) {
      trx = await client.transfer(first.from, first.to, first.balance, config.binanceChainSymbol, first.memo || memo);
    } else {
      trx = await client.batchTransfer(first.from, config.binanceChainSymbol, this.transfers, memo);
    }

    return trx;
  };

  summary = () => {
    const sum = this.transfers.map(t => parseFloat(t.balance)).reduce((a, b) => a + b, 0);

    return {
      success: true,
      data: [this.transfers.length, sum.toFixed(5)].map(String),
      errorMsg: ""
    };
  };

  static fromCsvFile = (filePath: string): Promise<Bep2TransferBatch> => {
    let rows: Bep2Transfer[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row: { from: string; to: string; balance: string }) => {
          rows = [...rows, Bep2Transfer.of(row.from, row.to, row.balance)];
        })
        .on("end", () => {
          resolve(new Bep2TransferBatch(rows));
        })
        .on("error", e => {
          reject(e);
        });
    });
  };
}

export default Bep2TransferBatch;
