import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
import { BlueChipContract, X0Web3 } from '../src';
// import Web3 from "web3";
dotenv.config();

describe(`X0Sdk`, () => {
  let sdkInstance: X0Web3;
  const harasAddress = '0x3955625c3804607033D43b83982872c982f7308e';
  const alchemyApiKey = process.env.ALCHEMY_API_KEY;

  beforeEach(() => {
    if (!alchemyApiKey) {
      throw new Error(`ALCHEMY_API_KEY is not defined`);
    }
    sdkInstance = X0Web3.initialize({
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

      it(`should return true for an owner with address string`, async () => {
        const artchitechAddress = '0x7BeF8662356116cb436429F47e53322B711F4E42';

        const isArchitectOwnerOfMoonBirds = await sdkInstance.isOwnerOf(
          '0x23581767a106ae21c074b2276D25e5C3e136a68b',
          artchitechAddress,
        );

        expect(isArchitectOwnerOfMoonBirds).toBe(true);

        const artchitechsMoonBirdsTokens = await sdkInstance.fetchTokensWithContractAddress(
          '0x23581767a106ae21c074b2276D25e5C3e136a68b',
          artchitechAddress,
        );
        expect(artchitechsMoonBirdsTokens.length).toBe(3);
      });

      it(`should return invalid contract address`, async () => {
        const artchitechAddress = '0x7BeF8662356116cb436429F47e53322B711F4E42';

        try {
          await sdkInstance.isOwnerOf(
            '0x23581767a106ae21c074b2276D25e5C3e136a68z',
            artchitechAddress,
          );
        } catch (e) {
          expect(e).toEqual(new Error('invalid contract address'));
        }
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

      it('should return Beanz, InvisibleFriends, MoonBirds need apiKey because they do not support Erc721', async () => {
        const sdk = X0Web3.initialize({
          provider: new ethers.providers.AlchemyProvider('mainnet', alchemyApiKey),
        });
        try {
          await sdk.isOwnerOf(BlueChipContract.Beanz, harasAddress);
          expect(true).toBe(false);
        } catch (e) {
          expect(e).toEqual(
            new Error(
              'Beanz, InvisibleFriends, MoonBirds need apiKey because they do not support Erc721',
            ),
          );
        }
      });
    });
  });
});
