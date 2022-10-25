import { NftManager } from './interface';
import { Contract, ethers, providers } from 'ethers';
import axios from 'axios';

export interface X0Erc721Config {
  contractAddress: string;
  provider: providers.Provider;
}

export class Erc721 implements NftManager {
  private readonly contract: Contract;

  constructor(
    private readonly contractAddress: string,
    private readonly provider: providers.Provider,
  ) {
    this.contract = new ethers.Contract(this.contractAddress, Erc721.abi, this.provider);
  }

  static abi = [
    'function balanceOf(address owner) view returns (uint256)',
    'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
    'function tokenURI(uint256 tokenId) view returns (string)',
  ];

  private async fetchBalance(address: string): Promise<number> {
    const res = await this.contract.balanceOf(address);
    return res.toNumber();
  }

  async isOwnerOf(address: string): Promise<boolean> {
    const balance = await this.fetchBalance(address);
    return balance > 0;
  }

  async fetchTokens(address: string): Promise<string[]> {
    const balance = await this.fetchBalance(address);

    const tokens = await Promise.all(
      new Array(balance).fill(0).map(async (_, i) => {
        const tokenIdInBigNumber = await this.contract.tokenOfOwnerByIndex(address, i);
        return tokenIdInBigNumber.toNumber();
      }),
    );

    return tokens;
  }

  async tokenURI(tokenId: string): Promise<Record<string, any> | null> {
    const metaData = await this.contract.tokenURI(tokenId);
    const res = await axios.get(metaData);
    return res.data ?? null;
  }
}
