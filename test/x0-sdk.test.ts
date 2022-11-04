import { X0Sdk } from '../src';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import Web3 from 'web3';
dotenv.config();

describe(`X0Sdk`, () => {
  jest.setTimeout(60000);
  const x0ApiKey = process.env.X0_API_KEY!;
  const alchemyApiKey = process.env.ALCHEMY_API_KEY!;
  let x0Sdk: X0Sdk;
  const x0Address = '0x268Fc17e40123701B9A5a71dB9e77bF5Ae07D5d6';
  // const coldAddress = '0x571aab2bec12edC2cfA02C989b2DA47912B7a0c6';
  const contractAddress = '0xa0768DC386712ed355f41D56bdbc05bfBb9C797b';

  beforeAll(() => {
    if (!(alchemyApiKey && x0ApiKey)) {
      throw new Error('Missing ALCHEMY_API_KEY or X0_API_KEY');
    }

    const provider = new ethers.providers.AlchemyProvider('mainnet', alchemyApiKey);
    x0Sdk = new X0Sdk({ provider, x0ApiKey, x0ApiUrl: 'https://api-dev.x0.xyz/v1' });
  });

  describe(`getMetadataFrom`, () => {
    it('wrong contract address', async () => {
      try {
        await x0Sdk.getMetadataFrom('0x0123', x0Address);
        expect(true).toBeFalsy();
      } catch (e: any) {
        expect(e.message).toEqual('Invalid Block Chain Address: 0x0123');
      }
    });

    it('wrong wallet address', async () => {
      try {
        await x0Sdk.getMetadataFrom(contractAddress, '0x0123');
        expect(true).toBeFalsy();
      } catch (e: any) {
        expect(e.message).toEqual('Invalid Block Chain Address: 0x0123');
      }
    });

    it('No paired wallet addresses found for x0 address', async () => {
      try {
        await x0Sdk.getMetadataFrom(contractAddress, '0x26bc28C861d5dd3085c3CCe1e113aa4ec9d1a28B');
        expect(true).toBeFalsy();
      } catch (e: any) {
        expect(e.message).toEqual(
          'No paired wallet addresses found for x0 address: 0x26bc28C861d5dd3085c3CCe1e113aa4ec9d1a28B',
        );
      }
    });

    it('paired wallet addresses found for x0 address', async () => {
      const value = ['1', '2'];
      jest.spyOn(x0Sdk, 'fetchTokensWithContractAddress').mockResolvedValueOnce(value);
      const results = await x0Sdk.getMetadataFrom(contractAddress, x0Address);
      let index = 0;
      results.forEach((result: Record<string, any>) => {
        expect(result['TokenID']).toEqual(value[index]);
        index++;
      });
    });
  });

  describe('fetchTokensWithContractAddress', () => {
    it('wrong contract address', async () => {
      try {
        await x0Sdk.fetchTokensWithContractAddress('0x0123', x0Address);
        expect(true).toBeFalsy();
      } catch (e: any) {
        expect(e.message).toEqual('Invalid Block Chain Address: 0x0123');
      }
    });

    it('wrong wallet address', async () => {
      try {
        await x0Sdk.fetchTokensWithContractAddress(contractAddress, '0x0123');
        expect(true).toBeFalsy();
      } catch (e: any) {
        expect(e.message).toEqual('Invalid Block Chain Address: 0x0123');
      }
    });

    it('get tokens of paired wallet addresses', async () => {
      const results = await x0Sdk.fetchTokensWithContractAddress(contractAddress, x0Address);
      expect(results.length).toEqual(3);
    });
  });

  describe('Web3.js test', () => {
    it('compatible test by web3.js', async () => {
      const provider = new Web3.providers.HttpProvider(
        'https://eth-mainnet.alchemyapi.io/v2/' + alchemyApiKey,
      );
      const Web3X0Sdk = new X0Sdk({ provider, x0ApiKey });
      const value = ['1', '2'];
      jest.spyOn(Web3X0Sdk, 'fetchTokensWithContractAddress').mockResolvedValueOnce(value);
      const results = await Web3X0Sdk.getMetadataFrom(contractAddress, x0Address);
      let index = 0;
      results.forEach((result: Record<string, any>) => {
        expect(result['TokenID']).toEqual(value[index]);
        index++;
      });
    });
  });
});
