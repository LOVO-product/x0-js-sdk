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

- [apiKey](X0Sdk.md#apikey)
- [nftManagers](X0Sdk.md#nftmanagers)
- [provider](X0Sdk.md#provider)
- [abi](X0Sdk.md#abi)
- [exceptionNfts](X0Sdk.md#exceptionnfts)

### Methods

- [fetchTokens](X0Sdk.md#fetchtokens)
- [fetchTokensWithContractAddress](X0Sdk.md#fetchtokenswithcontractaddress)
- [getNftManager](X0Sdk.md#getnftmanager)
- [getNftMetadata](X0Sdk.md#getnftmetadata)
- [isOwnerOf](X0Sdk.md#isownerof)
- [initialize](X0Sdk.md#initialize)

## Constructors

### constructor

• `Private` **new X0Sdk**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `X0SdkConfig` |

#### Defined in

[x0-sdk.ts:60](https://github.com/LOVO-product/x0-js-sdk/blob/886483a/src/x0-sdk.ts#L60)

## Properties

### apiKey

• `Optional` `Readonly` **apiKey**: `string`

**`Description`**

Beanz, InvisibleFriends, MoonBirds is required to use Erc721Alternative

#### Defined in

[x0-sdk.ts:32](https://github.com/LOVO-product/x0-js-sdk/blob/886483a/src/x0-sdk.ts#L32)

___

### nftManagers

• `Private` `Readonly` **nftManagers**: `Object` = `{}`

**`Description`**

NftManager is a interface for fetching NFTs

#### Index signature

▪ [key: `string`]: [`NftManager`](../interfaces/NftManager.md)

#### Defined in

[x0-sdk.ts:39](https://github.com/LOVO-product/x0-js-sdk/blob/886483a/src/x0-sdk.ts#L39)

___

### provider

• `Readonly` **provider**: `Provider`

#### Defined in

[x0-sdk.ts:34](https://github.com/LOVO-product/x0-js-sdk/blob/886483a/src/x0-sdk.ts#L34)

___

### abi

▪ `Static` **abi**: `string`[]

#### Defined in

[x0-sdk.ts:41](https://github.com/LOVO-product/x0-js-sdk/blob/886483a/src/x0-sdk.ts#L41)

___

### exceptionNfts

▪ `Static` **exceptionNfts**: `string`[]

**`Description`**

Beanz, InvisibleFriends, MoonBirds does not support Erc721

#### Defined in

[x0-sdk.ts:50](https://github.com/LOVO-product/x0-js-sdk/blob/886483a/src/x0-sdk.ts#L50)

## Methods

### fetchTokens

▸ **fetchTokens**(`contract`, `address`): `Promise`<`string`[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | [`BlueChipContract`](../enums/BlueChipContract.md) | contract name of BlueChipContract |
| `address` | `string` | wallet address |

#### Returns

`Promise`<`string`[]\>

tokens

#### Defined in

[x0-sdk.ts:91](https://github.com/LOVO-product/x0-js-sdk/blob/886483a/src/x0-sdk.ts#L91)

___

### fetchTokensWithContractAddress

▸ **fetchTokensWithContractAddress**(`contractAddress`, `address`): `Promise`<`string`[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | contract address |
| `address` | `string` | wallet address |

#### Returns

`Promise`<`string`[]\>

tokens

#### Defined in

[x0-sdk.ts:101](https://github.com/LOVO-product/x0-js-sdk/blob/886483a/src/x0-sdk.ts#L101)

___

### getNftManager

▸ `Private` **getNftManager**(`contractAddress`): [`NftManager`](../interfaces/NftManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractAddress` | `string` |

#### Returns

[`NftManager`](../interfaces/NftManager.md)

#### Defined in

[x0-sdk.ts:65](https://github.com/LOVO-product/x0-js-sdk/blob/886483a/src/x0-sdk.ts#L65)

___

### getNftMetadata

▸ **getNftMetadata**(`contractAddress`, `tokenId`): `Promise`<``null`` \| `Record`<`string`, `any`\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractAddress` | `string` | contract address |
| `tokenId` | `string` | tokenId |

#### Returns

`Promise`<``null`` \| `Record`<`string`, `any`\>\>

metadata

#### Defined in

[x0-sdk.ts:115](https://github.com/LOVO-product/x0-js-sdk/blob/886483a/src/x0-sdk.ts#L115)

___

### isOwnerOf

▸ **isOwnerOf**(`contract`, `address`): `Promise`<`boolean`\>

**`Description`**

check if the wallet address has a token of the contract

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | [`BlueChipContract`](../enums/BlueChipContract.md) | contract name of BlueChipContract |
| `address` | `string` | wallet address |

#### Returns

`Promise`<`boolean`\>

true if the wallet address has NFTs

#### Defined in

[x0-sdk.ts:130](https://github.com/LOVO-product/x0-js-sdk/blob/886483a/src/x0-sdk.ts#L130)

▸ **isOwnerOf**(`contract`, `address`): `Promise`<`boolean`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | `string` | contract address |
| `address` | `string` | wallet address |

#### Returns

`Promise`<`boolean`\>

true if the wallet address has NFTs

#### Defined in

[x0-sdk.ts:137](https://github.com/LOVO-product/x0-js-sdk/blob/886483a/src/x0-sdk.ts#L137)

___

### initialize

▸ `Static` **initialize**(`config`): [`X0Sdk`](X0Sdk.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `X0SdkConfig` |

#### Returns

[`X0Sdk`](X0Sdk.md)

#### Defined in

[x0-sdk.ts:56](https://github.com/LOVO-product/x0-js-sdk/blob/886483a/src/x0-sdk.ts#L56)
