[@lovo-product/x0-js-sdk](README.md) / Exports

# @lovo-product/x0-js-sdk

## Table of contents

### Enumerations

- [BlueChipContract](enums/BlueChipContract.md)

### Classes

- [Erc721](docs/classes/Erc721.md)
- [Erc721Alternative](docs/classes/Erc721Alternative.md)
- [X0Api](docs/classes/X0Api.md)
- [X0Sdk](docs/classes/X0Sdk.md)
- [X0Web3](docs/classes/X0Web3.md)

## Installation

Install the package with:

### Usage with TypeScript

X0 maintains types for the latest [API version][api-versions].

Instantiate it as `new X0Api()` and `new X0Sdk()` with the latest API version.

**`X0Api Example`**

```typescript
import { X0Api } from '@x0/x0-api';
const x0Api = new X0Api('YOUR_API_KEY');
```

**`X0Web3 Example`**

```typescript
import {X0Web3} from "./x0-web3";

const x0Web3 = new X0Web3({ // X0Web3 is a wrapper around web3
    provider: new ethers.providers.AlchemyProvider('mainnet', 'YOUR_PROVIDER_API_KEY'),
});
const x0Api = new X0Api('YOUR_X0_API_KEY'); // X0Api calls the X0 API
const pairedWalletAddresses = await x0Api.getPairedColdAddressesFrom('0x...'); // Parameter is a wallet address, returns an array of paired cold addresses
const tokens = await x0Web3.fetchTokensWithContractAddress('0x...', pairedWalletAddresses[0]);
const metaData = await x0Web3.getNftMetadata('0x...', tokens[0]); // Parameters are contract address and token id
```

**`X0Sdk Example`**

```typescript
const x0Web3 = new X0Web3({
    provider: new ethers.providers.AlchemyProvider('mainnet', alchemyApiKey),
});
const x0Api = new X0Api(x0ApiKey, { url: 'https://api-dev.x0.xyz/v1' });
const x0Sdk = new X0Sdk(x0Web3, x0Api);
await x0Sdk.getMetadataFrom('contractAddress', 'x0WalletAddress');
```
