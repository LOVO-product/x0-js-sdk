import { NftManager } from './interface';
import { Alchemy, Network } from 'alchemy-sdk';

export class Erc721Alternative implements NftManager {
  private readonly alchemy: Alchemy;
  constructor(private readonly contractAddress: string, apiKey: string) {
    this.alchemy = new Alchemy({
      apiKey,
      network: Network.ETH_MAINNET,
    });
  }

  async isOwnerOf(address: string): Promise<boolean> {
    const tokens = await this.fetchTokens(address);
    return tokens.length > 0;
  }

  async fetchTokens(address: string): Promise<string[]> {
    const tokens = await this.alchemy.nft.getNftsForOwner(address, {
      contractAddresses: [this.contractAddress],
    });
    return tokens.ownedNfts.map((token) => token.tokenId);
  }

  async tokenURI(tokenId: string): Promise<Record<string, any> | null> {
    const res = await this.alchemy.nft.getNftMetadata(this.contractAddress, tokenId);
    return res.rawMetadata ?? null;
  }
}
