import { ethers, providers } from 'ethers';
import { BlueChipContract, contractAddresses } from './contracts';

export interface XoSdkConfig {
  apiKey: string;
  provider: providers.Provider;
}

export class XoSdk {
  readonly apiKey: string;
  readonly provider: providers.Provider;

  static abi = [
    'function balanceOf(address owner) view returns (uint256)',
    'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
  ];

  static initialize(config: XoSdkConfig) {
    return new XoSdk(config);
  }

  private constructor(config: XoSdkConfig) {
    this.apiKey = config.apiKey;
    this.provider = config.provider;
  }

  private async fetchBalance(contractAddress: string, address: string): Promise<number> {
    const contractInstance = new ethers.Contract(contractAddress, XoSdk.abi, this.provider);
    const res = await contractInstance.balanceOf(address);
    return res.toNumber();
  }

  async isOwnerOf(contract: BlueChipContract, address: string): Promise<boolean> {
    const balance = await this.fetchBalance(contractAddresses[contract], address);
    return balance > 0;
  }

  async getX0Address(address: string): Promise<string> {
    return address;
  }

  async fetchTokens(contract: BlueChipContract, address: string): Promise<number[]> {
    return this.fetchTokensWithContractAddress(contractAddresses[contract], address);
  }

  async fetchTokensWithContractAddress(
    contractAddress: string,
    address: string,
  ): Promise<number[]> {
    const balance = await this.fetchBalance(contractAddress, address);
    const contractInstance = new ethers.Contract(contractAddress, XoSdk.abi, this.provider);

    const tokens = await Promise.all(
      new Array(balance).fill(0).map(async (_, i) => {
        const tokenIdInBigNumber = await contractInstance.tokenOfOwnerByIndex(address, i);
        return tokenIdInBigNumber.toNumber();
      }),
    );

    return tokens;
  }
}
