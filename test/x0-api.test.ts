import * as dotenv from 'dotenv';
import { X0Api } from '../src/index';
dotenv.config();

describe(`X0Api`, () => {
  const x0ApiKey = process.env.ALCHEMY_API_KEY;
  let x0Api: X0Api;
  const x0Address = '0x268Fc17e40123701B9A5a71dB9e77bF5Ae07D5d6';
  const coldAddress = '0x571aab2bec12edC2cfA02C989b2DA47912B7a0c6';
  beforeAll(() => {
    if (!x0ApiKey) {
      throw new Error('Missing X0_API_KEY in .env');
    }
    x0Api = new X0Api(x0ApiKey, { url: 'https://api-dev.x0.xyz/v1' });
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
  });

  it('should return false', async () => {
    const res = await x0Api.isPair(x0Address, '0xDB762136866B65043c8fBbECFF745C8c24b6D14A');
    expect(res).toBeFalsy();
  });
});
