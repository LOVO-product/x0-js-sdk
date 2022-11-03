[@lovo-product/x0-js-sdk](../README.md) / [Exports](../modules.md) / NftManager

# Interface: NftManager

## Implemented by

- [`Erc721`](../classes/Erc721.md)
- [`Erc721Alternative`](../classes/Erc721Alternative.md)

## Table of contents

### Methods

- [fetchTokens](NftManager.md#fetchtokens)
- [isOwnerOf](NftManager.md#isownerof)
- [tokenURI](NftManager.md#tokenuri)

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

#### Defined in

[nft-manager/interface.ts:14](https://github.com/LOVO-product/x0-js-sdk/blob/4d7ebd1/src/nft-manager/interface.ts#L14)

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

#### Defined in

[nft-manager/interface.ts:7](https://github.com/LOVO-product/x0-js-sdk/blob/4d7ebd1/src/nft-manager/interface.ts#L7)

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

#### Defined in

[nft-manager/interface.ts:21](https://github.com/LOVO-product/x0-js-sdk/blob/4d7ebd1/src/nft-manager/interface.ts#L21)
