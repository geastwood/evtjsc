import production from "./production";
import development from "./development";

const environment = process.env.NODE_ENV || "development";

export default environment === "development" ? development() : production();
