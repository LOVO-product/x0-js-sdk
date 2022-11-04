[@lovo-product/x0-js-sdk](../README.md) / [Exports](../modules.md) / Erc721Alternative

# Class: Erc721Alternative

## Implements

- [`NftManager`](../interfaces/NftManager.md)

## Table of contents

### Constructors

- [constructor](Erc721Alternative.md#constructor)

### Properties

- [alchemy](Erc721Alternative.md#alchemy)
- [contractAddress](Erc721Alternative.md#contractaddress)

### Methods

- [fetchTokens](Erc721Alternative.md#fetchtokens)
- [isOwnerOf](Erc721Alternative.md#isownerof)
- [tokenURI](Erc721Alternative.md#tokenuri)

## Constructors

### constructor

• **new Erc721Alternative**(`contractAddress`, `apiKey`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractAddress` | `string` |
| `apiKey` | `string` |

#### Defined in

[nft-manager/erc721-alternative.ts:6](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/erc721-alternative.ts#L6)

## Properties

### alchemy

• `Private` `Readonly` **alchemy**: `Alchemy`

#### Defined in

[nft-manager/erc721-alternative.ts:5](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/erc721-alternative.ts#L5)

___

### contractAddress

• `Private` `Readonly` **contractAddress**: `string`

#### Defined in

[nft-manager/erc721-alternative.ts:6](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/erc721-alternative.ts#L6)

## Methods

### fetchTokens

▸ **fetchTokens**(`address`): `Promise`<`string`[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | wallet address |

#### Returns

`Promise`<`string`[]\>

tokens

#### Implementation of

[NftManager](../interfaces/NftManager.md).[fetchTokens](../interfaces/NftManager.md#fetchtokens)

#### Defined in

[nft-manager/erc721-alternative.ts:18](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/erc721-alternative.ts#L18)

___

### isOwnerOf

▸ **isOwnerOf**(`address`): `Promise`<`boolean`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | wallet address |

#### Returns

`Promise`<`boolean`\>

true if the address owns at least one token

#### Implementation of

[NftManager](../interfaces/NftManager.md).[isOwnerOf](../interfaces/NftManager.md#isownerof)

#### Defined in

[nft-manager/erc721-alternative.ts:13](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/erc721-alternative.ts#L13)

___

### tokenURI

▸ **tokenURI**(`tokenId`): `Promise`<``null`` \| `Record`<`string`, `any`\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenId` | `string` | tokenId |

#### Returns

`Promise`<``null`` \| `Record`<`string`, `any`\>\>

metadata

#### Implementation of

[NftManager](../interfaces/NftManager.md).[tokenURI](../interfaces/NftManager.md#tokenuri)

#### Defined in

[nft-manager/erc721-alternative.ts:25](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/nft-manager/erc721-alternative.ts#L25)
