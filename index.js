#!/usr/bin/env node

import bip39 from "bip39";
import BIP32Factory from "bip32";
import * as ecc from "tiny-secp256k1";

import { walletBTC } from "./src/btc.js";
import { walletETH } from "./src/eth.js";
import { walletSOL } from "./src/sol.js";

const args = process.argv.slice(2);
const getFlag = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};

const chain = getFlag("--chain") || getFlag("-c");

const bip32 = BIP32Factory(ecc);

console.log("\n🥳 Your Self-Custodial Wallets are Ready...\n");

// --------------------------------------------------------
// 1. MNEMONIC
// --------------------------------------------------------
const mnemonic = bip39.generateMnemonic(128);
console.log("Mnemonic:");
console.log(mnemonic, "\n");

const seed = await bip39.mnemonicToSeed(mnemonic);
const root = bip32.fromSeed(seed);

// Single-chain mode
if (chain) {
  switch (chain.toLowerCase()) {
    case "eth": {
      const w = walletETH(seed, root);
      console.log("ETH Address:", w.address);
      console.log("ETH Private Key:", w.privateKey);
      process.exit(0);
    }
    case "btc": {
      const w = await walletBTC(seed, root);
      console.log("BTC Address:", w.address);
      console.log("BTC Private Key:", w.privateKey);
      process.exit(0);
    }
    case "sol": {
      const w = walletSOL(seed);
      console.log("SOL Address:", w.address);
      console.log("SOL Private Key:", w.privateKey);
      process.exit(0);
    }
    default:
      console.log("Unknown chain. Use eth | btc | sol");
      process.exit(1);
  }
}

const btc = walletBTC(seed, root);
console.log("BTC (SegWit)");
console.log("Address:", btc.address);
console.log("Private Key:", btc.privateKey, "\n");

const eth = walletETH(seed, root);
console.log("ETH");
console.log("Address:", eth.address);
console.log("Private Key:", eth.privateKey, "\n");

const sol = walletSOL(seed);
console.log("SOL");
console.log("Address:", sol.address);
console.log("Private Key:", sol.privateKey, "\n");

console.log("🎉 Done!\n");
console.log("Contributions are welcome! \n\nhttps://github.com/shahbaz17/new-wallet\n\n");