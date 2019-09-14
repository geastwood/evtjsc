import { Command, flags } from "@oclif/command";
import chalk from "chalk";
import Bep2TransferBatch from "../Bep2TransferBatch";
import Binance from "../Binance";
import { log } from "../util";
import Bep2Transfer from "../Bep2Transfer";
import config from "../config";
import { get } from "lodash";

export default class Transferft extends Command {
  static description = "Command to transfer Evt (BEP2) token, e.g. transfer Evt (BEP2) to another address";

  static examples = [
    `- use "privateKey1" to sign transfer in csv file
    $ MNENOMIC="" evtjsc transferbep2 --file=/path/to/file.csv`,
    `- specify environment
    $ MNENOMIC="" NODE_ENV=production evtjsc transferbep2 --file=/path/to/file.csv`,
    `- Use balance from one address to another address
    $ MNENOMIC="" evtjsc transferbep2 --from=address --to="address" --balance="0.10000 S#1" --memo="test" `
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    file: flags.string({
      char: "f",
      description: "Specify file with addresses and balances",
      exclusive: ["from", "to"]
    }),
    from: flags.string({
      description: "Specify the from address",
      dependsOn: ["to", "balance", "memo"],
      exclusive: ["file"]
    }),
    to: flags.string({
      description: "Specify the to address, support multiple addresses",
      dependsOn: ["from", "balance", "memo"],
      exclusive: ["file"]
    }),
    balance: flags.string({
      description: "Specify the balance, e.g. 1.00000",
      dependsOn: ["to", "from", "memo"],
      exclusive: ["file"]
    }),
    memo: flags.string({
      description: "Specify the memo"
    }),
    "dry-run": flags.boolean({
      default: false,
      description: "Specify this flag to perform a dry run"
    })
  };

  async run() {
    const { flags } = this.parse(Transferft);

    log(
      `Starting process in "${flags["dry-run"] ? chalk.bold.yellow("dry run") : chalk.bold.red("PRODUCTION")}" mode.`
    );

    // get mnemonic from env
    const mnemonic = config.name === "production" ? process.env.MNENOMIC : process.env.MNENOMIC_TEST;
    if (!mnemonic) {
      this.error("MNENOMIC is missing.");
      process.exit(1);
    }

    if (mnemonic.split(" ").length !== 24) {
      this.error(`MNENOMIC must be 24 words, ${mnemonic.split(" ").length} received.`);
      process.exit(1);
    }

    // init Binance instance
    const binanceClient = await Binance.createClient(config.api, mnemonic);

    let fungibleTransferBatch: Bep2TransferBatch;
    let summaryTitle;

    if (flags.file) {
      log(`Loading fungible transfer data from "${flags.file}"`);
      fungibleTransferBatch = await Bep2TransferBatch.fromCsvFile(flags.file);
      summaryTitle = "File summary of fungible transfer csv file";
    } else if (flags.from && flags.to && flags.balance && flags.to) {
      const fungibleTransfer = Bep2Transfer.of(flags.from, flags.to, flags.balance, flags.memo);
      fungibleTransferBatch = new Bep2TransferBatch([fungibleTransfer]);
      summaryTitle = "Summary of fungible transfer from cli input";
    } else {
      this.error("Failed to construct command, please double check the command.");
      this.exit(1);
      return;
    }

    const useBatch = fungibleTransferBatch.isBatch();
    const summary = fungibleTransferBatch.summary();

    log(`${summaryTitle}:
            - record count: ${chalk.bold.blue(summary.data[0])}
            - total amount: ${chalk.bold.blue(summary.data[1])}`);

    log(`Transfer Mode: ${chalk.bgWhite.bold.red(useBatch ? " BATCH " : " SINGLE ")}`);
    if (!flags["dry-run"]) {
      const trx = await fungibleTransferBatch.transfer(binanceClient, flags.memo || "");
      const hash = get(trx, "result[0].hash");

      log(`STATUS:\t${trx.status}`);
      log(`LINK:\t${config.explorer}tx/${hash}`);
    } else {
      log(`In dry run mode, nothing serious happened.`);
    }
  }
}
