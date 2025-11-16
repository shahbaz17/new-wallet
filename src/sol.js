import nacl from "tweetnacl";
import bs58 from "bs58";
import { derivePath as deriveEd25519 } from "ed25519-hd-key";
import { PublicKey } from "@solana/web3.js";

export function walletSOL(seed) {
    // --------------------------------------------------------
    // SOLANA 
    // Derivation Path: m/44'/501'/0'/0' (MetaMask,Sollet, Phantom, compatible)
    // Derivation Path: m/44'/501'/0' (Sollet, Solflare, Trust Wallet, compatible)
    // --------------------------------------------------------
    if (!seed) {
        throw new Error("Seed is required");
    }

    const solPath = `m/44'/501'/0'/0'`;
    const solDerived = deriveEd25519(solPath, seed.toString("hex"));

    if (!solDerived.key) {
        throw new Error("Failed to derive SOL key");
    }

    const solKeypair = nacl.sign.keyPair.fromSeed(solDerived.key);
    const solPrivateKey = bs58.encode(solKeypair.secretKey);
    const solPubKey = new PublicKey(solKeypair.publicKey).toBase58();

    return {
        address: solPubKey,
        privateKey: solPrivateKey,
    };
}