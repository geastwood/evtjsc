import chalk from "chalk";
export const log = (msg: string) => console.log(`${chalk.bold.blue("[INFO]")}: ${msg}`);

export const parseNetworkString = (net: string) => {
  const parts = net.split("://");

  return {
    host: parts[1],
    port: parts[0] === "https" ? 443 : 80,
    protocol: parts[0]
  };
};
