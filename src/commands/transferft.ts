import { Command, flags } from "@oclif/command";

export default class Transferft extends Command {
  static description =
    "Command to transfer fungible token, e.g. transfer Evt to another address";

  static examples = [
    `$ evtjsc transferft --file=/path/to/file --privateKey=p1 EVT...`,
    `$ evtjsc transferft --file=/path/to/file --privateKey=p1 --privateKey=p2 EVT...`
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    file: flags.string({
      char: "f",
      description: "Specify file with addresses and balances",
      exclusive: ["to"]
    }),
    privateKey: flags.string({
      char: "k",
      multiple: true,
      required: true,
      description: "Specify the private key, support multiple private key"
    }),
    noVerify: flags.boolean({
      default: false,
      char: "n",
      description: "Specify this flag to bypass the input verification"
    }),
    interactive: flags.boolean({
      default: false,
      char: "i",
      description: "Specify this flag to enable the interactive mode"
    }),
    to: flags.string({
      char: "t",
      multiple: true,
      description: "Specify the to address, support multiple addresses",
      exclusive: ["file"]
    }),
    net: flags.string({
      char: "x",
      env: "EVT_NET",
      required: true,
      description:
        "Specify which node to use, e.g. https://mainnet1.everitoken.io"
    })
  };

  static args = [{ name: "fromAddress" }];

  verify() {
    return {
      errorMsg: `
      * there are some serious bug
      * there are some serious bug again
      `,
      success: false
    };
  }

  async run() {
    const { args, flags } = this.parse(Transferft);

    if (flags.noVerify) {
      this.warn("Skipping verification step.");
    } else {
      const { errorMsg, success } = this.verify();
      if (!success) {
        this.error(errorMsg);
        this.exit(1);
      }
    }

    // real logic starts
    this.log("everything is checkout");
  }
}
