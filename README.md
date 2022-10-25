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

## Installation

Install the package with:

### Usage with TypeScript

X0 maintains types for the latest [API version][api-versions].

Instantiate it as `new X0Api()` with the latest API version.

```typescript
import { X0Api } from '@x0/x0-api';
const x0Api = new X0Api('YOUR_API_KEY');
```

```typescript
const x0Sdk = new X0Sdk({
  provider: new ethers.providers.AlchemyProvider('mainnet', 'YOUR_PROVIDER_API_KEY'),
});
const x0Api = new X0Api('YOUR_X0_API_KEY');
const pairedWalletAddresses = await x0Api.getPairedColdAddressesFrom('0x...');
const tokens = await x0Sdk.fetchTokensWithContractAddress('0x...', pairedWalletAddresses[0]);
const metaData = await x0Sdk.getNftMetadata('0x...', tokens[0]);
```
