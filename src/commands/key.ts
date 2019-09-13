import { Command, flags } from "@oclif/command";
import { log } from "../util";
import Evt from "evtjs";
import chalk from "chalk";

type FlagTypes = {
  help: void;
  "private-key": string[];
  "public-key": string[];
  repeat: number | undefined;
};
export default class Key extends Command {
  static description = "Private key, public key related commands are defined here.";

  static examples = [
    `- randomly generate 3 private key with the corresponding public key
    $ evtjsc key generate --repeat=3`,
    `- verify a private key
    $ evtjsc key verify --private-key=k1 --private-key=k2 --public-key=p2`,
    `- display corresponding public key
    $ evtjsc key show --private-key=k1 --private-key=k2`
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    "private-key": flags.string({
      char: "k",
      multiple: true,
      description: "Specify private key, support multiple private key"
    }),
    "public-key": flags.string({
      char: "p",
      multiple: true,
      description: "Specify public key, support multiple public key"
    }),
    repeat: flags.integer({
      default: 1,
      description: "Specify how many keypairs to generate"
    })
  };

  static args = [{ name: "command" }];

  generate = async (flags: FlagTypes) => {
    const count = flags.repeat || 1;

    log(`Randomly generating ${count} private key(s) and display the corresponding public key`);

    if (Number.isNaN(Number(count)) || count < 1) {
      this.error(`--repeat of "${flags.repeat}" is invalid`);
      this.exit();
    }

    for (let i = 0; i < count; i++) {
      const privateKey = await Evt.EvtKey.randomPrivateKey();
      const publicKey = await Evt.EvtKey.privateToPublic(privateKey);

      this.log(`- ${chalk.blue("Private Key")}: ${privateKey}, ${chalk.blue("Public Key")}: ${publicKey}`);
    }
  };
  verify = (flags: FlagTypes) => {
    const privateKeys = flags["private-key"] || [];
    const publicKeys = flags["public-key"] || [];

    if (!privateKeys.length && !publicKeys.length) {
      this.error("Nothing to verify.");
    }

    privateKeys.forEach(privateKey => {
      const isValid = Evt.EvtKey.isValidPrivateKey(privateKey);
      this.log(`(${isValid ? chalk.bold.green("VALID") : chalk.bold.red("INVALID")}) (prv) ${privateKey}`);
    });
    publicKeys.forEach(publicKey => {
      const isValid = Evt.EvtKey.isValidPublicKey(publicKey);
      this.log(`(${isValid ? chalk.bold.green("VALID") : chalk.bold.red("INVALID")}) (pub) ${publicKey}`);
    });
  };
  show = (flags: FlagTypes) => {
    const privateKeys = flags["private-key"];

    if (privateKeys.length === 0) {
      this.error("No private key is found.");
    }

    log(`Trying to get public key from ${privateKeys.length} private key(s)`);

    privateKeys.forEach(privateKey => {
      try {
        const publicKey = Evt.EvtKey.privateToPublic(privateKey);
        this.log(`(prv) ${privateKey} => (pub) ${publicKey}`);
      } catch (e) {
        this.error(`Failed to extract public key from ${privateKey}`);
      }
    });
  };
  async run() {
    const { args, flags } = this.parse(Key);

    const { command } = args;

    if (command === "generate") {
      await this.generate(flags);
    } else if (command === "verify") {
      await this.verify(flags);
    } else if (command === "show") {
      await this.show(flags);
    } else {
      this.error("Invalid command.");
    }
  }
}
