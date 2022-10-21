import * as dotenv from 'dotenv';
import { X0ApiSdk } from '../src/X0-api-sdk';
dotenv.config();

describe(`X0ApiSdk`, () => {
  const x0ApiKey = process.env.ALCHEMY_API_KEY;
  let x0ApiSdk: X0ApiSdk;
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
      const res = await x0ApiSdk.getX0ConnectionsThrough(
        '0xe34Dc6491F9c6127156730c2e0f7ae34D1e8c73b',
      );
      expect(res.address).toBe('0xe34Dc6491F9c6127156730c2e0f7ae34D1e8c73b');
    });
  });

  describe('isPair', () => {
    it('should return true', async () => {
      const res = await x0ApiSdk.isPair(
        '0xe34Dc6491F9c6127156730c2e0f7ae34D1e8c73b',
        '0x17942F2717cd65c4086595B825f3Ff760148475D',
      );
      expect(res).toBeTruthy();
    });
  });

  it('should return false', async () => {
    const res = await x0ApiSdk.isPair(
      '0xe34Dc6491F9c6127156730c2e0f7ae34D1e8c73b',
      '0xe34Dc6491F9c6127156730c2e0f7ae34D1e8c73b',
    );
    expect(res).toBeFalsy();
  });
});
