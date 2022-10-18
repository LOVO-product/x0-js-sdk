import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
import { BlueChipContract, X0Sdk } from '../src';
dotenv.config();

describe(`X0Sdk`, () => {
  let sdkInstance: X0Sdk;
  const harasAddress = '0x3955625c3804607033D43b83982872c982f7308e';
  const alchemyApiKey = process.env.ALCHEMY_API_KEY;

  beforeEach(() => {
    if (!alchemyApiKey) {
      throw new Error(`ALCHEMY_API_KEY is not defined`);
    }
    sdkInstance = X0Sdk.initialize({
      apiKey: alchemyApiKey,
      provider: new ethers.providers.AlchemyProvider('mainnet', alchemyApiKey),
    });
  });

  describe(`for ERC721`, () => {
    describe(`isOwnerOf`, () => {
      it(`should successfully return true for an owner`, async () => {
        const isHaraOwnerOfVvo = await sdkInstance.isOwnerOf(BlueChipContract.VVO, harasAddress);
        expect(isHaraOwnerOfVvo).toBe(true);

        const harasVvoTokens = await sdkInstance.fetchTokens(BlueChipContract.VVO, harasAddress);
        expect(harasVvoTokens.length).toBe(7);
      });

      it(`should return false for others`, async () => {
        const isHaraOwnerOfBayc = await sdkInstance.isOwnerOf(BlueChipContract.BAYC, harasAddress);
        expect(isHaraOwnerOfBayc).toBe(false);
        const harasBaycTokens = await sdkInstance.fetchTokens(BlueChipContract.BAYC, harasAddress);
        expect(harasBaycTokens.length).toBe(0);
      });
    });
  });

  describe(`for MoonBirds, Beanz, and Invisible friends`, () => {
    describe(`isOwnerOf`, () => {
      it(`should return true for an owner`, async () => {
        const artchitechAddress = '0x7BeF8662356116cb436429F47e53322B711F4E42';

        const isArchitectOwnerOfMoonBirds = await sdkInstance.isOwnerOf(
          BlueChipContract.MoonBirds,
          artchitechAddress,
        );

        expect(isArchitectOwnerOfMoonBirds).toBe(true);

        const artchitechsMoonBirdsTokens = await sdkInstance.fetchTokens(
          BlueChipContract.MoonBirds,
          artchitechAddress,
        );
        expect(artchitechsMoonBirdsTokens.length).toBe(3);
      });

      it(`should return false for others`, async () => {
        const isHaraOwnerOfMoonBirds = await sdkInstance.isOwnerOf(
          BlueChipContract.MoonBirds,
          harasAddress,
        );
        expect(isHaraOwnerOfMoonBirds).toBe(false);
        const harasMoonBirdsTokens = await sdkInstance.fetchTokens(
          BlueChipContract.MoonBirds,
          harasAddress,
        );
        expect(harasMoonBirdsTokens.length).toBe(0);
      });
    });
  });
});
