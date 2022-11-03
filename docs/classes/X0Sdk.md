[@lovo-product/x0-js-sdk](../README.md) / [Exports](../modules.md) / X0Sdk

# Class: X0Sdk

**`Example`**

```typescript
const x0Sdk = new X0Sdk({ provider: new ethers.providers.AlchemyProvider('mainnet', 'YOUR_PROVIDER_API_KEY') });
const x0Api = new X0Api('YOUR_X0_API_KEY');
const pairedWalletAddresses = await x0Api.getPairedColdAddressesFrom('0x...');
const tokens = await x0Sdk.fetchTokensWithContractAddress('0x...', pairedWalletAddresses[0]);
const metaData = await x0Sdk.getNftMetadata('0x...', tokens[0]);
```

## Table of contents

### Constructors

- [constructor](X0Sdk.md#constructor)

### Properties

- [x0Api](X0Sdk.md#x0api)
- [x0Web3](X0Sdk.md#x0web3)

### Methods

- [getMetadataFrom](X0Sdk.md#getmetadatafrom)

## Constructors

### constructor

• **new X0Sdk**(`x0Web3`, `x0Api`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x0Web3` | [`X0Web3`](X0Web3.md) |
| `x0Api` | [`X0Api`](X0Api.md) |

#### Defined in

[nft-manager/x0-sdk.ts:26](https://github.com/LOVO-product/x0-js-sdk/blob/4d7ebd1/src/nft-manager/x0-sdk.ts#L26)

## Properties

### x0Api

• `Private` **x0Api**: [`X0Api`](X0Api.md)

**`Description`**

Fetch to X0 API and returns the connections cold wallet address

#### Defined in

[nft-manager/x0-sdk.ts:25](https://github.com/LOVO-product/x0-js-sdk/blob/4d7ebd1/src/nft-manager/x0-sdk.ts#L25)

___

### x0Web3

• `Private` **x0Web3**: [`X0Web3`](X0Web3.md)

**`Description`**

Fetches to the blockchain and returns the owner of the token and the token's metadata

#### Defined in

[nft-manager/x0-sdk.ts:19](https://github.com/LOVO-product/x0-js-sdk/blob/4d7ebd1/src/nft-manager/x0-sdk.ts#L19)

## Methods

### getMetadataFrom

▸ **getMetadataFrom**(`contractAddress`, `x0WalletAddress`): `Promise`<`any`\>

**`Description`**

Find All NFTs metadata for a given x0 address

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractAddress` | `string` |
| `x0WalletAddress` | `string` |

#### Returns

`Promise`<`any`\>

the owner of token's metadata

#### Defined in

[nft-manager/x0-sdk.ts:37](https://github.com/LOVO-product/x0-js-sdk/blob/4d7ebd1/src/nft-manager/x0-sdk.ts#L37)
