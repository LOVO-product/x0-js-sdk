[@lovo-product/x0-js-sdk](../README.md) / [Exports](../modules.md) / X0Web3

# Class: X0Web3

**`Example`**

```typescript
const x0Web3 = new X0Web3({
    provider: new ethers.providers.AlchemyProvider('mainnet', alchemyApiKey),
});
const x0Api = new X0Api(x0ApiKey, { url: 'https://api-dev.x0.xyz/v1' });
const x0Sdk = new X0Sdk(x0Web3, x0Api);
await x0Sdk.getMetadataFrom('contractAddress', 'x0WalletAddress');
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

nft-manager/x0-web3.ts:66

## Properties

### apiKey

• `Optional` `Readonly` **apiKey**: `string`

**`Description`**

Beanz, InvisibleFriends, MoonBirds is required to use Erc721Alternative

#### Defined in

nft-manager/x0-web3.ts:38

___

### nftManagers

• `Private` `Readonly` **nftManagers**: `Object` = `{}`

**`Description`**

NftManager is a interface for fetching NFTs

#### Index signature

▪ [key: `string`]: [`NftManager`](../interfaces/NftManager.md)

#### Defined in

nft-manager/x0-web3.ts:45

___

### provider

• `Readonly` **provider**: `Provider`

#### Defined in

nft-manager/x0-web3.ts:40

___

### abi

▪ `Static` **abi**: `string`[]

#### Defined in

nft-manager/x0-web3.ts:47

___

### exceptionNfts

▪ `Static` **exceptionNfts**: `string`[]

**`Description`**

Beanz, InvisibleFriends, MoonBirds does not support Erc721

#### Defined in

nft-manager/x0-web3.ts:56

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

nft-manager/x0-web3.ts:97

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

nft-manager/x0-web3.ts:107

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

nft-manager/x0-web3.ts:71

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

nft-manager/x0-web3.ts:121

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

nft-manager/x0-web3.ts:136

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

nft-manager/x0-web3.ts:143

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

nft-manager/x0-web3.ts:62

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

nft-manager/x0-web3.ts:159
