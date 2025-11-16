#!/usr/bin/env node

import bip39 from "bip39";
import BIP32Factory from "bip32";
import * as ecc from "tiny-secp256k1";

import { walletBTC } from "./src/btc.js";
import { walletETH } from "./src/eth.js";
import { walletSOL } from "./src/sol.js";

const VERSION = "2.1.0";

const HELP_TEXT = `
new-wallet v${VERSION}

Generate BTC, ETH, and SOL wallets from a single mnemonic.

USAGE:
  new-wallet [OPTIONS]

OPTIONS:
  -c, --chain <chain>    Generate wallet for specific chain only (btc, eth, sol)
  -h, --help            Show this help message
  -v, --version         Show version number

EXAMPLES:
  new-wallet              Generate wallets for all chains
  new-wallet -c btc       Generate Bitcoin wallet only
  new-wallet --chain eth  Generate Ethereum wallet only

⚠️  SECURITY WARNING:
  - Never share your mnemonic or private keys
  - Store them securely offline
  - This tool is for educational purposes
  - Use at your own risk

Repository: https://github.com/shahbaz17/new-wallet
`;

const args = process.argv.slice(2);
const hasFlag = (flag) => args.includes(flag);
const getFlag = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};

// Handle help flag
if (hasFlag("-h") || hasFlag("--help")) {
  console.log(HELP_TEXT);
  process.exit(0);
}

// Handle version flag
if (hasFlag("-v") || hasFlag("--version")) {
  console.log(`v${VERSION}`);
  process.exit(0);
}

const chain = getFlag("--chain") || getFlag("-c");

// Validate chain if provided
if (chain && !["btc", "eth", "sol"].includes(chain.toLowerCase())) {
  console.error(`\n❌ Error: Unknown chain "${chain}"`);
  console.error("   Supported chains: btc, eth, sol\n");
  console.error("   Run 'new-wallet --help' for more information.\n");
  process.exit(1);
}

const bip32 = BIP32Factory(ecc);

console.log("\n🥳 Your Self-Custodial Wallets are Ready...\n");

// --------------------------------------------------------
// 1. MNEMONIC
// --------------------------------------------------------
let mnemonic, seed, root;

try {
  mnemonic = bip39.generateMnemonic(128);
  console.log("Mnemonic:");
  console.log(mnemonic, "\n");

  seed = await bip39.mnemonicToSeed(mnemonic);
  root = bip32.fromSeed(seed);
} catch (error) {
  console.error("\n❌ Error generating mnemonic:", error.message);
  process.exit(1);
}

// Single-chain mode
if (chain) {
  try {
    switch (chain.toLowerCase()) {
      case "eth": {
        const w = walletETH(seed, root);
        console.log("ETH Address:", w.address);
        console.log("ETH Private Key:", w.privateKey);
        break;
      }
      case "btc": {
        const w = walletBTC(seed, root);
        console.log("BTC Address:", w.address);
        console.log("BTC Private Key:", w.privateKey);
        break;
      }
      case "sol": {
        const w = walletSOL(seed);
        console.log("SOL Address:", w.address);
        console.log("SOL Private Key:", w.privateKey);
        break;
      }
    }
    console.log("\n🎉 Done!\n");
    process.exit(0);
  } catch (error) {
    console.error(`\n❌ Error generating ${chain.toUpperCase()} wallet:`, error.message);
    process.exit(1);
  }
}

// Generate all wallets
try {
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
  console.log("Contributions are welcome! \n\nhttps://github.com/shahbaz17/new-wallet\n");
} catch (error) {
  console.error("\n❌ Error generating wallets:", error.message);
  process.exit(1);
}