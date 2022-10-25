[@lovo-product/x0-js-sdk](README.md) / Exports

# @lovo-product/x0-js-sdk

## Table of contents

### Enumerations

- [BlueChipContract](undefined)

### Classes

- [Erc721](undefined)
- [Erc721Alternative](undefined)
- [X0Api](undefined)
- [X0Sdk](undefined)

### Interfaces

- [NftManager](undefined)

### Variables

- [contractAddresses](undefined)

## Enumerations

### BlueChipContract

• **BlueChipContract**: Enum BlueChipContract

enum for blue chip NFTs

#### Defined in

[contracts.ts:4](https://github.com/LOVO-product/x0-js-sdk/blob/422caa1/src/contracts.ts#L4)

## Classes

### Erc721

• **Erc721**: Class Erc721

#### Defined in

[nft-manager/erc721.ts:10](https://github.com/LOVO-product/x0-js-sdk/blob/422caa1/src/nft-manager/erc721.ts#L10)

___

### Erc721Alternative

• **Erc721Alternative**: Class Erc721Alternative

#### Defined in

[nft-manager/erc721-alternative.ts:4](https://github.com/LOVO-product/x0-js-sdk/blob/422caa1/src/nft-manager/erc721-alternative.ts#L4)

___

### X0Api

• **X0Api**: Class X0Api

**`Example`**

```typescript
import { X0Api } from '@x0/x0-api';
const x0Api = new X0Api('YOUR_API_KEY');
```

#### Defined in

[x0-api.ts:26](https://github.com/LOVO-product/x0-js-sdk/blob/422caa1/src/x0-api.ts#L26)

___

### X0Sdk

• **X0Sdk**: Class X0Sdk

**`Example`**

```typescript
const x0Sdk = new X0Sdk({ provider: new ethers.providers.AlchemyProvider('mainnet', 'YOUR_PROVIDER_API_KEY') });
const x0Api = new X0Api('YOUR_X0_API_KEY');
const pairedWalletAddresses = await x0Api.getPairedColdAddressesFrom('0x...');
const tokens = await x0Sdk.fetchTokensWithContractAddress('0x...', pairedWalletAddresses[0]);
const metaData = await x0Sdk.getNftMetadata('0x...', tokens[0]);
```

#### Defined in

[x0-sdk.ts:28](https://github.com/LOVO-product/x0-js-sdk/blob/422caa1/src/x0-sdk.ts#L28)

## Interfaces

### NftManager

• **NftManager**: Interface NftManager

#### Defined in

[nft-manager/interface.ts:1](https://github.com/LOVO-product/x0-js-sdk/blob/422caa1/src/nft-manager/interface.ts#L1)

## Variables

### contractAddresses

• `Const` **contractAddresses**: `Object`

contract addresses for supported blue chip NFTs

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Azuki` | string |
| `BAKC` | string |
| `BAYC` | string |
| `Beanz` | string |
| `CloneX` | string |
| `CoolCats` | string |
| `CreatureWorld` | string |
| `Cryptoadz` | string |
| `Doodles` | string |
| `InvisibleFriends` | string |
| `Karafuru` | string |
| `MAYC` | string |
| `MFERS` | string |
| `Mekaverse` | string |
| `MoonBirds` | string |
| `PudgyPenguins` | string |
| `VVO` | string |
| `WOW` | string |
| `goblintown` | string |

#### Defined in

[contracts.ts:29](https://github.com/LOVO-product/x0-js-sdk/blob/422caa1/src/contracts.ts#L29)
