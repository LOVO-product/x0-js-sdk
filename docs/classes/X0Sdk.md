[@lovo-product/x0-js-sdk](../README.md) / [Exports](../modules.md) / X0Sdk

# Class: X0Sdk

**`Example`**

```typescript
const provider = new Web3.providers.HttpProvider(
        'https://eth-mainnet.alchemyapi.io/v2/' + alchemyApiKey,
      );
const Web3X0Sdk = new X0Sdk({ provider, x0ApiKey });
const metadata = await Web3X0Sdk.getMetadataFrom(contractAddress, x0Address);
```

## Table of contents

### Constructors

- [constructor](X0Sdk.md#constructor)

### Properties

- [x0Api](X0Sdk.md#x0api)
- [x0Web3](X0Sdk.md#x0web3)

### Methods

- [fetchTokensWithContractAddress](X0Sdk.md#fetchtokenswithcontractaddress)
- [getMetadataFrom](X0Sdk.md#getmetadatafrom)

## Constructors

### constructor

• **new X0Sdk**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `X0SdkConfig` |

#### Defined in

[nft-manager/x0-sdk.ts:44](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-sdk.ts#L44)

## Properties

### x0Api

• `Private` **x0Api**: [`X0Api`](X0Api.md)

**`Description`**

Fetch to X0 API and returns the connections cold wallet address

#### Defined in

[nft-manager/x0-sdk.ts:42](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-sdk.ts#L42)

___

### x0Web3

• `Private` **x0Web3**: [`X0Web3`](X0Web3.md)

**`Description`**

Fetches to the blockchain and returns the owner of the token and the token's metadata

#### Defined in

[nft-manager/x0-sdk.ts:36](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-sdk.ts#L36)

## Methods

### fetchTokensWithContractAddress

▸ **fetchTokensWithContractAddress**(`contractAddress`, `x0WalletAddress`): `Promise`<`string`[]\>

**`Description`**

Find All NFTs token for a given x0 address

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractAddress` | `string` |
| `x0WalletAddress` | `string` |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[nft-manager/x0-sdk.ts:57](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-sdk.ts#L57)

___

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

[nft-manager/x0-sdk.ts:82](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-sdk.ts#L82)
