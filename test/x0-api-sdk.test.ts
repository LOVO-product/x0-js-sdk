import * as dotenv from 'dotenv';
import { X0ApiSdk } from '../src/X0-api-sdk';
dotenv.config();

describe(`X0ApiSdk`, () => {
  const x0ApiKey = process.env.ALCHEMY_API_KEY;
  let x0ApiSdk: X0ApiSdk;
  const x0Address = '0x268Fc17e40123701B9A5a71dB9e77bF5Ae07D5d6';
  const coldAddress = '0x571aab2bec12edC2cfA02C989b2DA47912B7a0c6';
  beforeAll(() => {
    if (!x0ApiKey) {
      throw new Error('Missing X0_API_KEY in .env');
    }
    x0ApiSdk = new X0ApiSdk(x0ApiKey, { url: 'https://api-dev.x0.xyz/v1' });
  });

  it('should be defined', () => {
    expect(x0ApiSdk).toBeDefined();
    expect(x0ApiSdk.getX0ConnectionsThrough).toBeDefined();
  });

  describe('getX0ConnectionsThrough', () => {
    it('should return invalid address error', async () => {
      await x0ApiSdk.getX0ConnectionsThrough('0x123').catch((error) => {
        expect(error.message).toEqual('Invalid Block Chain Address: 0x123');
      });
    });
    it('should return connections', async () => {
      const res = await x0ApiSdk.getX0ConnectionsThrough(x0Address);
      expect(res.address).toBe(x0Address);
    });
  });

  describe('isPair', () => {
    it('should return true', async () => {
      const res = await x0ApiSdk.isPair(x0Address, coldAddress);
      expect(res).toBeTruthy();
    });
  });

  it('should return false', async () => {
    const res = await x0ApiSdk.isPair(x0Address, '0xDB762136866B65043c8fBbECFF745C8c24b6D14A');
    expect(res).toBeFalsy();
  });
});
