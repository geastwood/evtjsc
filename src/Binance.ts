import config from "./config/index";
import ITransfer from "./ITransfer";
import * as BinanceChain from "@binance-chain/javascript-sdk";
import { writeFileSync } from "fs";
import { join } from "path";

class Binance {
  readonly client: any;
  constructor(url: string) {
    this.client = new BinanceChain(url);
  }

  static createClient = async (url: string, mnemonic: string): Promise<Binance> => {
    const binance = new Binance(url);
    const { client } = binance;
    const privateKey = Binance.getPrivateKey(mnemonic);

    await client.initChain();
    client.chooseNetwork(config.bepAddressPrefix === "tbnb" ? "testnet" : "mainnet");
    client.setPrivateKey(privateKey);
    client.useDefaultSigningDelegate();
    client.useDefaultBroadcastDelegate();
    return binance;
  };

  static createAccount = (): string => {
    return BinanceChain.crypto.generateMnemonic();
  };

  static getPrivateKey = (mnemonic: string, derive: boolean = true, index: number = 0) => {
    return BinanceChain.crypto.getPrivateKeyFromMnemonic(mnemonic, derive, index);
  };

  static getPublicKey = (privateKey: string): string => {
    return BinanceChain.crypto.getPublicKeyFromPrivateKey(privateKey);
  };

  static getAddress = (publicKey: string): string => {
    return BinanceChain.crypto.getAddressFromPublicKey(publicKey, config.bepAddressPrefix);
  };

  /**
   * Keystore is used to login
   */
  static generateKeyStore = (privateKey: string, password: string, folder: string) => {
    const keyStore = BinanceChain.crypto.generateKeyStore(privateKey, password);
    writeFileSync(join(folder, "test.keystore"), JSON.stringify(keyStore));
  };

  getBalance = async () => {
    return this.client.getBalance();
  };

  transfer = async (fromAddress: string, toAddress: string, amount: string, asset: string, memo = "") =>
    this.client.transfer(fromAddress, toAddress, amount, asset, memo, null);

  batchTransfer = async (fromAddress: string, asset: string, transfers: Array<ITransfer>, memo: string = "") => {
    const outputs = transfers.map(transfer => ({
      to: transfer.getTo(),
      coins: [{ denom: asset, amount: transfer.getAmount() }]
    }));

    return this.client.multiSend(fromAddress, outputs, memo, null);
  };
}

export default Binance;
