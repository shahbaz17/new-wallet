import { ethers } from "ethers";

export function walletETH(seed, root) {
    // --------------------------------------------------------
    // ETH 
    // Derivation Path: m/44'/60'/0'/0/0
    // --------------------------------------------------------
    if (!root) {
        throw new Error("BIP32 root is required");
    }

    const ethPath = `m/44'/60'/0'/0/0`;
    const ethChild = root.derivePath(ethPath);

    if (!ethChild.privateKey) {
        throw new Error("Failed to derive ETH private key");
    }

    const ethPriv = ethers.hexlify(ethChild.privateKey);
    const ethWallet = new ethers.Wallet(ethPriv);

    return {
        address: ethWallet.address,
        privateKey: ethPriv,
    };
}