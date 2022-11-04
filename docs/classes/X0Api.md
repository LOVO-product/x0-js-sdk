[@lovo-product/x0-js-sdk](../README.md) / [Exports](../modules.md) / X0Api

# Class: X0Api

**`Example`**

```typescript
import { X0Api } from '@x0/x0-api';
const x0Api = new X0Api({
    apiKey: 'YOUR_API_KEY',
});
```

## Table of contents

### Constructors

- [constructor](X0Api.md#constructor)

### Properties

- [axiosInstance](X0Api.md#axiosinstance)
- [baseUrl](X0Api.md#baseurl)

### Methods

- [getPairedColdAddressesFrom](X0Api.md#getpairedcoldaddressesfrom)
- [getX0ConnectionsBy](X0Api.md#getx0connectionsby)
- [isPair](X0Api.md#ispair)

## Constructors

### constructor

• **new X0Api**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `X0ApiConfig` |

#### Defined in

[api/x0-api.ts:41](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/api/x0-api.ts#L41)

## Properties

### axiosInstance

• `Private` **axiosInstance**: `AxiosInstance`

#### Defined in

[api/x0-api.ts:34](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/api/x0-api.ts#L34)

___

### baseUrl

• `Private` **baseUrl**: `string` = `'https://api.x0.xyz/v1'`

X0 API base URL

#### Defined in

[api/x0-api.ts:39](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/api/x0-api.ts#L39)

## Methods

### getPairedColdAddressesFrom

▸ **getPairedColdAddressesFrom**(`x0Address`): `Promise`<`string`[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x0Address` | `string` | The address of the X0 wallet |

#### Returns

`Promise`<`string`[]\>

Cold addresses connected to the X0 wallet

#### Defined in

[api/x0-api.ts:66](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/api/x0-api.ts#L66)

___

### getX0ConnectionsBy

▸ **getX0ConnectionsBy**(`address`): `Promise`<`Connection`[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | The address of the wallet to get connections |

#### Returns

`Promise`<`Connection`[]\>

X0 connections through the address

#### Defined in

[api/x0-api.ts:55](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/api/x0-api.ts#L55)

___

### isPair

▸ **isPair**(`x0Address`, `coldAddress`): `Promise`<`boolean`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x0Address` | `string` | The address of the X0 wallet |
| `coldAddress` | `string` | The address of the COLD wallet |

#### Returns

`Promise`<`boolean`\>

true if the x0 and cold addresses are a pair

#### Defined in

[api/x0-api.ts:82](https://github.com/LOVO-product/x0-js-sdk/blob/b225294/src/api/x0-api.ts#L82)
