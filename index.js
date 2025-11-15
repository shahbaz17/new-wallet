#!/usr/bin/env node

import bip39 from "bip39";
import BIP32Factory from "bip32";
import * as ecc from "tiny-secp256k1";
import { payments, networks } from "bitcoinjs-lib";
import { ethers } from "ethers";
import { derivePath as deriveEd25519 } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";

const bip32 = BIP32Factory(ecc);

console.log("\n🚀 Generating New Wallet...\n");

// --------------------------------------------------------
// 1. MNEMONIC + SEED
// --------------------------------------------------------
const mnemonic = bip39.generateMnemonic(128);
console.log("Mnemonic:");
console.log(mnemonic, "\n");

const seed = await bip39.mnemonicToSeed(mnemonic);
const root = bip32.fromSeed(seed);

// --------------------------------------------------------
// 2. BTC (SegWit P2WPKH)
// Path: m/84'/0'/0'/0/0
// --------------------------------------------------------
const btcPath = `m/84'/0'/0'/0/0`;
const btcChild = root.derivePath(btcPath);

const btcAddress = payments.p2wpkh({
  pubkey: btcChild.publicKey,
  network: networks.bitcoin
}).address;

console.log("BTC (SegWit)");
console.log("Address:", btcAddress);
console.log("Private Key:", btcChild.toWIF(), "\n");

// --------------------------------------------------------
// 3. ETH (BIP44)
// Path: m/44'/60'/0'/0/0
// --------------------------------------------------------
const ethPath = `m/44'/60'/0'/0/0`;
const ethChild = root.derivePath(ethPath);

const ethPriv = ethers.hexlify(ethChild.privateKey);
const ethWallet = new ethers.Wallet(ethPriv);

console.log("ETH");
console.log("Address:", ethWallet.address);
console.log("Private Key:", ethPriv, "\n");

// --------------------------------------------------------
// 4. SOLANA (Phantom compatible)
// Path: m/44'/501'/0'/0'
// --------------------------------------------------------
const solPath = `m/44'/501'/0'/0'`;
const solDerived = deriveEd25519(solPath, seed.toString("hex"));

const solKeypair = nacl.sign.keyPair.fromSeed(solDerived.key);
const solPrivateKey = Buffer.from(solKeypair.secretKey).toString("hex").slice(0, 64);
const solPubKey = new PublicKey(solKeypair.publicKey).toBase58();

console.log("SOLANA");
console.log("Address:", solPubKey);
console.log("Private Key:", solPrivateKey, "\n");

console.log("🎉 Done!\n");
console.log("Contributions are welcome! \n\nhttps://github.com/shahbaz17/new-wallet\n\n");