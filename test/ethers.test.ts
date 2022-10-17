import { ethers } from 'ethers';
import { XoSdk } from '../src';
import { BlueChipContract } from '../src/contracts';

describe(`NFT Query`, () => {
  it(`fetchTokens`, async () => {
    const provider = new ethers.providers.AlchemyProvider(
      'mainnet',
      '0RFvC1kJM_33G5GAnthpilrsLM_2Kk2m',
    );

    const sdkInstance = XoSdk.initialize({ apiKey: 'api key', provider });

    const tokens1 = await sdkInstance.fetchTokensWithContractAddress(
      '0xa0768DC386712ed355f41D56bdbc05bfBb9C797b',
      '0x3955625c3804607033D43b83982872c982f7308e',
    );

    expect(tokens1.length).toBe(7);

    const tokens2 = await sdkInstance.fetchTokens(
      BlueChipContract.VVO,
      '0x3955625c3804607033D43b83982872c982f7308e',
    );
    expect(tokens1).toEqual(tokens2);
  });
});
