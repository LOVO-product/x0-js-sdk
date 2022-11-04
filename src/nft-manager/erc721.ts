import { NftManager } from './interface';
import { ethers, providers } from 'ethers';
import axios from 'axios';
import { provider as providerType } from 'web3-core';
import Web3 from 'web3';

export interface X0Erc721Config {
  contractAddress: string;
  provider: providers.Provider | providerType;
}

/**
 * @description X0 Erc721 Contract
 */
interface Contract {
  balanceOf: (address: string) => Promise<number>;
  tokenOfOwnerByIndex: (address: string, index: number) => Promise<string>;
  tokenURI: (tokenId: string) => Promise<string>;
}

class EthersContract implements Contract {
  constructor(private contract: ethers.Contract) {}

  async balanceOf(address: string) {
    const res = await this.contract.balanceOf(address);
    return res.toNumber();
  }

  async tokenOfOwnerByIndex(address: string, index: number) {
    return this.contract.tokenOfOwnerByIndex(address, index);
  }

  async tokenURI(tokenId: string) {
    return this.contract.tokenURI(tokenId);
  }
}

class Web3Contract implements Contract {
  constructor(private contract: any) {}

  async balanceOf(address: string) {
    const res = await this.contract.methods.balanceOf(address).call();
    return Number(res);
  }

  async tokenOfOwnerByIndex(address: string, index: number) {
    return this.contract.methods.tokenOfOwnerByIndex(address, index).call();
  }

  async tokenURI(tokenId: string) {
    return this.contract.methods.tokenURI(tokenId).call();
  }
}

export class Erc721 implements NftManager {
  private readonly contract: Contract;

  constructor(
    private readonly contractAddress: string,
    private readonly provider: providers.Provider | providerType,
  ) {
    if (this.provider instanceof providers.Provider) {
      this.contract = new EthersContract(
        new ethers.Contract(this.contractAddress, Erc721.abi, this.provider),
      );
    } else {
      const web3 = new Web3(this.provider);
      this.contract = new Web3Contract(
        new web3.eth.Contract(Erc721.abi as any, this.contractAddress),
      );
    }
  }

  static abi = [
    {
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_tokenId', type: 'uint256' }],
      name: 'tokenURI',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'uint256', name: 'index', type: 'uint256' },
      ],
      name: 'tokenOfOwnerByIndex',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  private async fetchBalance(address: string): Promise<number> {
    const res = await this.contract.balanceOf(address);
    return res;
  }

  async isOwnerOf(address: string): Promise<boolean> {
    const balance = await this.fetchBalance(address);
    return balance > 0;
  }

  async fetchTokens(address: string): Promise<string[]> {
    const balance = await this.fetchBalance(address);
    const tokens = await Promise.all(
      new Array(balance).fill(0).map(async (_, i) => {
        const tokenIdInBigNumber = (await this.contract.tokenOfOwnerByIndex(address, i)) as any;
        return tokenIdInBigNumber.toNumber();
      }),
    );

    return tokens;
  }

  async tokenURI(tokenId: string): Promise<Record<string, any> | null> {
    const url = await this.contract.tokenURI(tokenId);
    const res = await axios.get(url);
    return res.data ?? null;
  }
}
