import { ethers } from 'ethers';
import { Erc721 } from '../src/nft-manager/erc721';
import { Erc721Alternative } from '../src/nft-manager/erc721-alternative';

describe(`ERC721 & Alternative`, () => {
  describe(`ERC721`, () => {
    it(`fetchTokens should fetch correct balance`, async () => {
      const provider = new ethers.providers.AlchemyProvider(
        'mainnet',
        '0RFvC1kJM_33G5GAnthpilrsLM_2Kk2m',
      );

      const VVO = new Erc721('0xa0768DC386712ed355f41D56bdbc05bfBb9C797b', provider);
      const tokenIds = await VVO.fetchTokens('0x3955625c3804607033D43b83982872c982f7308e');
      expect(tokenIds.length).toBe(7);
    });
  });

  describe(`ERC721 Alternative`, () => {
    it(`fetchTokens should fetch correct balanace`, async () => {
      const VVO = new Erc721Alternative(
        '0xa0768DC386712ed355f41D56bdbc05bfBb9C797b',
        '0RFvC1kJM_33G5GAnthpilrsLM_2Kk2m',
      );

      const tokenIds = await VVO.fetchTokens('0x3955625c3804607033D43b83982872c982f7308e');
      expect(tokenIds.length).toBe(7);
    });
  });
});
