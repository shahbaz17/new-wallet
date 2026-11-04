import nacl from "tweetnacl";
import bs58 from "bs58";
import { createHmac } from "node:crypto";

// SLIP-0010 ed25519 derivation (hardened indexes only)
function deriveEd25519(path, seed) {
    let I = createHmac("sha512", "ed25519 seed").update(seed).digest();
    for (const segment of path.split("/").slice(1)) {
        const index = (parseInt(segment, 10) | 0x80000000) >>> 0;
        const data = Buffer.alloc(37);
        I.copy(data, 1, 0, 32);
        data.writeUInt32BE(index, 33);
        I = createHmac("sha512", I.subarray(32)).update(data).digest();
    }
    return { key: I.subarray(0, 32) };
}

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
    const solDerived = deriveEd25519(solPath, seed);

    if (!solDerived.key) {
        throw new Error("Failed to derive SOL key");
    }

    const solKeypair = nacl.sign.keyPair.fromSeed(solDerived.key);
    const solPrivateKey = bs58.encode(solKeypair.secretKey);
    const solPubKey = bs58.encode(solKeypair.publicKey);

    return {
        address: solPubKey,
        privateKey: solPrivateKey,
    };
}