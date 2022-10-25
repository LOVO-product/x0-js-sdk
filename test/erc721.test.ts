import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
import { BlueChipContract, contractAddresses } from '../src';
import { Erc721 } from '../src/nft-manager/erc721';
import { Erc721Alternative } from '../src/nft-manager/erc721-alternative';
dotenv.config();

describe(`ERC721 & Alternative`, () => {
  const alchemyApiKey = process.env.ALCHEMY_API_KEY;

  describe(`ERC721`, () => {
    it(`fetchTokens should fetch correct balance`, async () => {
      const provider = new ethers.providers.AlchemyProvider('mainnet', alchemyApiKey);

      const VVO = new Erc721(contractAddresses[BlueChipContract.VVO], provider);
      const tokenIds = await VVO.fetchTokens('0x3955625c3804607033D43b83982872c982f7308e');
      expect(tokenIds.length).toBe(7);
    });

    it('tokenURI should fetch correct metadata', async () => {
      const provider = new ethers.providers.AlchemyProvider('mainnet', alchemyApiKey);

      const VVO = new Erc721(contractAddresses[BlueChipContract.VVO], provider);
      const metadata = await VVO.tokenURI('0');
      expect(metadata?.TokenID).toBe('0');
    });
  });

  describe(`ERC721 Alternative`, () => {
    it(`fetchTokens should fetch correct balanace`, async () => {
      if (!alchemyApiKey) {
        throw new Error(`ALCHEMY_API_KEY is not defined`);
      }

      const VVO = new Erc721Alternative(contractAddresses[BlueChipContract.VVO], alchemyApiKey);

      const tokenIds = await VVO.fetchTokens('0x3955625c3804607033D43b83982872c982f7308e');
      expect(tokenIds.length).toBe(7);
    });

    it('tokenURI should fetch correct metadata', async () => {
      if (!alchemyApiKey) {
        throw new Error(`ALCHEMY_API_KEY is not defined`);
      }

      const VVO = new Erc721Alternative(contractAddresses[BlueChipContract.VVO], alchemyApiKey);
      const metadata = await VVO.tokenURI('0');
      expect(metadata?.tokenId).toBe('0');
    });
  });
});
