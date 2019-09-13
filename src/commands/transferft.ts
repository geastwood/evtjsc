import { Command, flags } from "@oclif/command";
import FungibleTransferBatch from "../FungibleTransferBatch";
import chalk from "chalk";
import { log, parseNetworkString } from "../util";
import FungibleTransfer from "../FungibleTransfer";
import Address from "../Address";
import Balance from "../Balance";
import PrivateKey from "../PrivateKey";
import IValidator from "../IValidator";
import Evt from "evtjs";

export default class Transferft extends Command {
  static description = "Command to transfer fungible token, e.g. transfer Evt to another address";

  static examples = [
    `- use "privateKey1" to sign transfer in csv file
    $ evtjsc transferft --file=/path/to/file.csv --private-key=privateKey1`,
    `- use both keys to sign
    $ evtjsc transferft --file=/path/to/file.csv --private-key=p1 --private-key=p2 `,
    `- specify network
    $ evtjsc transferft --file=/path/to/file.csv --private-key=p1 --net="https://mainnet1.everitoken.io"`,
    `- only dry run the process, will not push to blockchain
    $ evtjsc transferft --dry-run --file=/path/to/file.csv --private-key=p1 `,
    `- Use balance from one address to another address
    $ evtjsc transferft --from=address --to="address" --balance="0.10000 S#1" --memo="test" `
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    file: flags.string({
      char: "f",
      description: "Specify file with addresses and balances",
      exclusive: ["from", "to"]
    }),
    "private-key": flags.string({
      char: "k",
      multiple: true,
      env: "EVT_PRIVATE_KEY",
      required: true,
      description: "Specify the private key, support multiple private key"
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
      description: "Specify the balance, e.g. 1.00000 S#1",
      dependsOn: ["to", "from", "memo"],
      exclusive: ["file"]
    }),
    memo: flags.string({
      description: "Specify the memo",
      dependsOn: ["from", "to", "balance"],
      exclusive: ["file"]
    }),
    net: flags.string({
      char: "x",
      env: "EVT_NET",
      required: true,
      description: "Specify which node to use, e.g. https://mainnet1.everitoken.io"
    }),
    "dry-run": flags.boolean({
      default: false,
      description: "Specify this flag to perform a dry run"
    })
  };

  verify(...args: IValidator[]) {
    let success = true;
    let errors: string[] = [];

    args.forEach(t => {
      const verification = t.validate();

      success = verification.success && success;
      if (!verification.success) {
        errors = [...errors, verification.errorMsg];
      }
    });

    return {
      success,
      errorMsg: errors.join("")
    };
  }

  async run() {
    const { flags } = this.parse(Transferft);

    log(`Starting process in "${flags["dry-run"] ? "dry run" : "production"}" mode.`);

    // private key
    const privateKeys = flags["private-key"].map(key => new PrivateKey(key));
    log(`Found ${privateKeys.length} private key(s) to use.`);

    let fungibleTransferBatch;
    let summaryTitle;

    if (flags.file) {
      log(`Loading fungible transfer data from "${flags.file}"`);
      fungibleTransferBatch = await FungibleTransferBatch.fromCsvFile(flags.file);
      summaryTitle = "File summary of fungible transfer csv file";
    } else if (flags.from && flags.to && flags.balance && flags.to) {
      const fungibleTransfer = new FungibleTransfer(
        new Address(flags.from),
        new Address(flags.to),
        Balance.parse(flags.balance),
        flags.memo
      );
      fungibleTransferBatch = new FungibleTransferBatch([fungibleTransfer]);
      summaryTitle = "Summary of fungible transfer from cli input";
    } else {
      this.error("Failed to construct command, please double check the command.");
      this.exit(1);
      return;
    }

    const needValidations = [
      ...privateKeys,
      fungibleTransferBatch,
      flags.balance ? Balance.parse(flags.balance) : null
    ].filter(Boolean) as IValidator[];

    const { errorMsg, success } = this.verify(...needValidations);

    if (!success) {
      this.error(errorMsg);
      this.exit(1);
    }

    const summary = fungibleTransferBatch.summary();
    log(`${summaryTitle}:
            - record count: ${chalk.bold.blue(summary.data[0])}
            - total amount: ${chalk.bold.blue(summary.data[1])}`);

    const apiCaller = Evt({
      endpoint: parseNetworkString(flags.net),
      keyProvider: flags["private-key"]
    });

    log(`Constructing transfer actions`);
    const actions = fungibleTransferBatch.transfers.map(
      t =>
        new Evt.EvtAction("transferft", {
          from: t.from.address,
          to: t.to.address,
          number: t.balance.getBalance(),
          memo: t.memo
        })
    );

    if (!flags["dry-run"]) {
      log(`Pushing the transaction the chain`);

      let trx = await apiCaller.pushTransaction({ maxCharge: 100000000 }, ...actions);

      log("Transaction:");
      console.log(trx);
    } else {
      log(`In dry run mode, nothing serious happened.`);
    }
  }
}
