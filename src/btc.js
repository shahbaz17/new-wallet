import { payments, networks } from "bitcoinjs-lib";

export function walletBTC(seed, root) {
    // --------------------------------------------------------
    // BTC 
    // Derivation Path: m/84'/0'/0'/0/0 (Native SegWit P2WPKH)
    // --------------------------------------------------------
    if (!root) {
        throw new Error("BIP32 root is required");
    }

    const btcPath = `m/84'/0'/0'/0/0`;
    const btcChild = root.derivePath(btcPath);

    const btcAddress = payments.p2wpkh({
        pubkey: btcChild.publicKey,
        network: networks.bitcoin
    }).address;

    if (!btcAddress) {
        throw new Error("Failed to generate BTC address");
    }

    return {
        address: btcAddress,
        privateKey: btcChild.toWIF(),
    };
}