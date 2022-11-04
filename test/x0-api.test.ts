import * as dotenv from 'dotenv';
import { X0Api } from '../src/index';
dotenv.config();

describe(`X0Api`, () => {
  jest.setTimeout(60000);
  const x0ApiKey = process.env.X0_API_KEY;
  let x0Api: X0Api;
  const x0Address = '0x268Fc17e40123701B9A5a71dB9e77bF5Ae07D5d6';
  const coldAddress = '0xc0f02369E30ABA6291b4bBb59E453308bf8C049e'; // TODO: change to cold wallet address that has some VVO NFTs
  beforeAll(() => {
    if (!x0ApiKey) {
      throw new Error('Missing X0_API_KEY');
    }
    x0Api = new X0Api({ url: 'https://api-dev.x0.xyz/v1', apiKey: x0ApiKey });
  });

  it('should be defined', () => {
    expect(x0Api).toBeDefined();
    expect(x0Api.getX0ConnectionsBy).toBeDefined();
  });

  describe('getX0ConnectionsBy', () => {
    it('should return invalid address error', async () => {
      try {
        await x0Api.getX0ConnectionsBy('0x123');
        expect(true).toBeFalsy();
      } catch (e: any) {
        expect(e.message).toEqual('Invalid Block Chain Address: 0x123');
      }
    });
    it('should return connections', async () => {
      const res = await x0Api.getX0ConnectionsBy(x0Address);
      expect(res).toBeDefined();
    });
  });

  describe('isPair', () => {
    it('should return true', async () => {
      const res = await x0Api.isPair(x0Address, coldAddress);
      expect(res).toBeTruthy();
    });

    it('should return false', async () => {
      const res = await x0Api.isPair(x0Address, '0xDB762136866B65043c8fBbECFF745C8c24b6D14A');
      expect(res).toBeFalsy();
    });
  });

  describe('getPairedColdAddressesFrom', () => {
    it('should return cold addresses', async () => {
      const res = await x0Api.getPairedColdAddressesFrom(x0Address);
      expect(res).toBeDefined();
      expect(res).toContain(coldAddress);
    });

    it('should validate address', async () => {
      try {
        await x0Api.getPairedColdAddressesFrom('0x123');
        expect(true).toBeFalsy();
      } catch (e: any) {
        expect(e.message).toEqual('Invalid Block Chain Address: 0x123');
      }
    });
  });
});
