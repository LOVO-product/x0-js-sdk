[@lovo-product/x0-js-sdk](../README.md) / [Exports](../modules.md) / X0Web3

# Class: X0Web3

**`Example`**

```typescript
const x0Web3 = new X0Web3({
    provider: new ethers.providers.AlchemyProvider('mainnet', alchemyApiKey),
});
```

## Table of contents

### Constructors

- [constructor](X0Web3.md#constructor)

### Properties

- [apiKey](X0Web3.md#apikey)
- [nftManagers](X0Web3.md#nftmanagers)
- [provider](X0Web3.md#provider)
- [abi](X0Web3.md#abi)
- [exceptionNfts](X0Web3.md#exceptionnfts)

### Methods

- [fetchTokens](X0Web3.md#fetchtokens)
- [fetchTokensWithContractAddress](X0Web3.md#fetchtokenswithcontractaddress)
- [getNftManager](X0Web3.md#getnftmanager)
- [getNftMetadata](X0Web3.md#getnftmetadata)
- [isOwnerOf](X0Web3.md#isownerof)
- [initialize](X0Web3.md#initialize)
- [validateAddress](X0Web3.md#validateaddress)

## Constructors

### constructor

• **new X0Web3**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `X0Web3Config` |

#### Defined in

[nft-manager/x0-web3.ts:64](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-web3.ts#L64)

## Properties

### apiKey

• `Optional` `Readonly` **apiKey**: `string`

**`Description`**

Beanz, InvisibleFriends, MoonBirds is required to use Erc721Alternative

#### Defined in

[nft-manager/x0-web3.ts:36](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-web3.ts#L36)

___

### nftManagers

• `Private` `Readonly` **nftManagers**: `Object` = `{}`

**`Description`**

NftManager is a interface for fetching NFTs

#### Index signature

▪ [key: `string`]: [`NftManager`](../interfaces/NftManager.md)

#### Defined in

[nft-manager/x0-web3.ts:43](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-web3.ts#L43)

___

### provider

• `Readonly` **provider**: `Provider` \| `provider`

#### Defined in

[nft-manager/x0-web3.ts:38](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-web3.ts#L38)

___

### abi

▪ `Static` **abi**: `string`[]

#### Defined in

[nft-manager/x0-web3.ts:45](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-web3.ts#L45)

___

### exceptionNfts

▪ `Static` **exceptionNfts**: `string`[]

**`Description`**

Beanz, InvisibleFriends, MoonBirds does not support Erc721

#### Defined in

[nft-manager/x0-web3.ts:54](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-web3.ts#L54)

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

[nft-manager/x0-web3.ts:95](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-web3.ts#L95)

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

[nft-manager/x0-web3.ts:105](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-web3.ts#L105)

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

[nft-manager/x0-web3.ts:69](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-web3.ts#L69)

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

[nft-manager/x0-web3.ts:119](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-web3.ts#L119)

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

[nft-manager/x0-web3.ts:134](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-web3.ts#L134)

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

[nft-manager/x0-web3.ts:141](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-web3.ts#L141)

___

### initialize

▸ `Static` **initialize**(`config`): [`X0Web3`](X0Web3.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `X0Web3Config` |

#### Returns

[`X0Web3`](X0Web3.md)

#### Defined in

[nft-manager/x0-web3.ts:60](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-web3.ts#L60)

___

### validateAddress

▸ `Static` **validateAddress**(`address`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`void`

#### Defined in

[nft-manager/x0-web3.ts:157](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/x0-web3.ts#L157)
