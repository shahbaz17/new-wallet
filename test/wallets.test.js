import test from "node:test";
import assert from "node:assert/strict";
import bip39 from "bip39";
import BIP32Factory from "bip32";
import * as ecc from "tiny-secp256k1";

import { walletBTC } from "../src/btc.js";
import { walletETH } from "../src/eth.js";
import { walletSOL } from "../src/sol.js";

const MNEMONIC = "test test test test test test test test test test test junk";
const seed = await bip39.mnemonicToSeed(MNEMONIC);
const root = BIP32Factory(ecc).fromSeed(seed);

test("BTC derivation", () => {
  assert.deepEqual(walletBTC(seed, root), {
    address: "bc1q4qw42stdzjqs59xvlrlxr8526e3nunw7mp73te",
    privateKey: "L36mwqGFbLzrxfE2mYsnu8LC12JXheMh5tp6kwLfwhRuav1AZfvd",
  });
});

test("ETH derivation", () => {
  assert.deepEqual(walletETH(seed, root), {
    address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    privateKey: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  });
});

test("SOL derivation", () => {
  assert.deepEqual(walletSOL(seed), {
    address: "oeYf6KAJkLYhBuR8CiGc6L4D4Xtfepr85fuDgA9kq96",
    privateKey: "4Cfc4TJ6dsWwLcw8aJ5uhx7UJKPR5VGXTu2iJr5bVRoTDsxzb6qfJrzR5HNhBcwGwsXqGeHzDR3eUWLr7MRnska8",
  });
});
