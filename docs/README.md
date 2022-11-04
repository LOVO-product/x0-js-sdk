@lovo-product/x0-js-sdk / [Exports](modules.md)

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

```bash
npm install @lovoai/x0-js-sdk
```

### Usage with TypeScript

X0 maintains types for the latest [API version][api-versions].

Instantiate it as `new X0Api()` and `new X0Sdk()` with the latest API version.

**`X0Sdk Example`**

```typescript
// for Web3.js
const provider = new Web3.providers.HttpProvider(
    'https://eth-mainnet.alchemyapi.io/v2/' + alchemyApiKey,
);
const Web3X0Sdk = new X0Sdk({ provider, x0ApiKey });
const metadata = await Web3X0Sdk.getMetadataFrom(contractAddress, x0Address);
```

```typescript
// for ethers.js
const provider = new ethers.providers.AlchemyProvider('mainnet', alchemyApiKey);
x0Sdk = new X0Sdk({ provider, x0ApiKey });
const metadata = await x0Sdk.getMetadataFrom(contractAddress, x0Address);
```

**`X0Api Example`**

```typescript
import { X0Api } from '@x0/x0-api';
const x0Api = new X0Api({
    apiKey: 'YOUR_API_KEY',
});
```

**`X0Web3 Example`**

```typescript
const x0Web3 = new X0Web3({
    provider: new ethers.providers.AlchemyProvider('mainnet', alchemyApiKey),
});
```
