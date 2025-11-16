# new-wallet

[![](https://img.shields.io/badge/version-2.2.2-blue.svg)](https://github.com/shahbaz17/new-wallet/releases/tag/v2.2.2)
[![](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/shahbaz17/new-wallet/blob/main/LICENSE)

Generate mnemonic phrase and BTC, ETH, and SOL wallets from that mnemonic phrase.

A simple CLI tool to generate self-custodial cryptocurrency wallets using industry-standard derivation paths (BIP32/BIP44/BIP84). All wallets are generated from a single mnemonic phrase, making it easy to manage multiple chains with one recovery phrase.

## Features

- 🔐 **Single Mnemonic** - One recovery phrase for all your wallets
- ⚡ **Multiple Chains** - Supports Bitcoin (SegWit), Ethereum, and Solana
- 🎯 **Chain-Specific Mode** - Generate wallets for individual chains only
- 🛡️ **Industry Standards** - Uses BIP32/BIP44/BIP84 derivation paths
- 📦 **Zero Config** - Works instantly with `npx`
- 🔒 **Offline Ready** - Generate wallets securely offline

## Installation

You can use `new-wallet` without installing it globally:

```bash
npx new-wallet
```

Or install it globally:

```bash
npm install -g new-wallet
```

## Usage

### Generate All Wallets

Generate mnemonic phrase and BTC, ETH, and SOL wallets from that mnemonic phrase:

```bash
new-wallet
```

### Generate Chain-Specific Wallet

Generate mnemonic phrase and a wallet for a specific blockchain only:

```bash
# Bitcoin only
new-wallet -c btc # BTC
new-wallet --chain btc # BTC

# Ethereum only
new-wallet -c eth # ETH
new-wallet --chain eth # ETH

# Solana only
new-wallet -c sol # SOL
new-wallet --chain sol # SOL
```

### Additional Options

```bash
# Show help
new-wallet --help
new-wallet -h

# Show version
new-wallet --version
new-wallet -v
```

## Supported Chains

| Chain | Type | Derivation Path | Address Format |
|-------|------|----------------|----------------|
| Bitcoin (BTC) | SegWit | `m/84'/0'/0'/0/0` | P2WPKH (Native SegWit) |
| Ethereum (ETH) | EVM | `m/44'/60'/0'/0/0` | Standard |
| Solana (SOL) | Ed25519 | `m/44'/501'/0'/0'` | Base58 |

## Example Output

```bash
$ new-wallet

🥳 Your Self-Custodial Wallets are Ready...

Mnemonic:
abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about 

BTC (SegWit)
Address: bc1q...
Private Key: L...

ETH
Address: 0x...
Private Key: 0x...

SOL
Address: 7L...
Private Key: 5K...

🎉 Done!
```

## Security Warnings

⚠️ **IMPORTANT SECURITY INFORMATION:**

- **Never share** your mnemonic or private keys with anyone
- **Store offline** in a secure location (paper, hardware wallet, etc.)
- **Double-check** addresses before sending funds
- **Test** by importing the private key into a wallet like Metamask, Phantom, etc.
- This tool is for **educational purposes**
- Use it at your own risk

## Development

```bash
# Clone the repository
git clone https://github.com/shahbaz17/new-wallet.git
cd new-wallet

# Install dependencies
npm install

# Run locally
node index.js
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## License

[MIT © Mohammad Shahbaz Alam](https://github.com/shahbaz17/new-wallet/blob/main/LICENSE)

## Links

- **Repository:** https://github.com/shahbaz17/new-wallet
- **Author:** [Mohammad Shahbaz Alam](https://mdsbzalam.dev)
- **Issues:** https://github.com/shahbaz17/new-wallet/issues

---

**Disclaimer:** This software is provided "as is", without warranty of any kind. The authors are not responsible for any losses incurred through the use of this tool.