import { payments, networks } from "bitcoinjs-lib";

export function walletBTC(seed, root) {
    // --------------------------------------------------------
    // BTC 
    // Derivation Path: m/84'/0'/0'/0/0 (Native SegWit P2WPKH)
    // --------------------------------------------------------
    const btcPath = `m/84'/0'/0'/0/0`;
    const btcChild = root.derivePath(btcPath);

    const btcAddress = payments.p2wpkh({
        pubkey: btcChild.publicKey,
        network: networks.bitcoin
    }).address;

    return {
        address: btcAddress,
        privateKey: btcChild.toWIF(),
    };
}