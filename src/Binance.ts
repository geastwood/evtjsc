import config from "./config/index";
import BinanceChain from "@binance-chain/javascript-sdk";
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
    client.setPrivateKey(privateKey);
    client.chooseNetwork(config.bepAddressPrefix === "tbnb" ? "testnet" : "mainnet");
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

  getBalance = async (address: string, symbol: string = "BNB") => {
    return await this.client.getBalance(address, symbol);
  };

  transfer = async (
    fromAddress: string,
    toAddress: string,
    amount: string,
    asset: string,
    memo = "",
    sequence = null
  ) => {
    return await this.client.transfer(fromAddress, toAddress, amount, asset, memo, sequence);
  };
}

export default Binance;
