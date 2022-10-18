import { providers } from 'ethers';
import { BlueChipContract, contractAddresses } from './contracts';
import { Erc721 } from './nft-manager/erc721';
import { Erc721Alternative } from './nft-manager/erc721-alternative';
import { NftManager } from './nft-manager/interface';

export interface X0SdkConfig {
  apiKey: string;
  provider: providers.Provider;
}

export class X0Sdk {
  readonly apiKey: string;
  readonly provider: providers.Provider;

  private readonly nftManagers: { [key: string]: NftManager } = {};
  static abi = [
    'function balanceOf(address owner) view returns (uint256)',
    'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
  ];

  static exceptionNfts = [
    BlueChipContract.Beanz,
    BlueChipContract.InvisibleFriends,
    BlueChipContract.MoonBirds,
  ].map((contractName) => contractAddresses[contractName]);

  static initialize(config: X0SdkConfig) {
    return new X0Sdk(config);
  }

  private constructor(config: X0SdkConfig) {
    this.apiKey = config.apiKey;
    this.provider = config.provider;
  }

  private getNftManager(contractAddress: string) {
    if (this.nftManagers[contractAddress]) {
      return this.nftManagers[contractAddress];
    }

    const nftManager = X0Sdk.exceptionNfts.includes(contractAddress)
      ? new Erc721Alternative(contractAddress, this.apiKey)
      : new Erc721(contractAddress, this.provider);
    this.nftManagers[contractAddress] = nftManager;
    return nftManager;
  }

  async isOwnerOf(contract: BlueChipContract, address: string): Promise<boolean> {
    const contractAddress = contractAddresses[contract];
    const nftManager = this.getNftManager(contractAddress);
    return nftManager.isOwnerOf(address);
  }

  async getX0Address(address: string): Promise<string> {
    return address;
  }

  async fetchTokens(contract: BlueChipContract, address: string): Promise<string[]> {
    return this.fetchTokensWithContractAddress(contractAddresses[contract], address);
  }

  async fetchTokensWithContractAddress(
    contractAddress: string,
    address: string,
  ): Promise<string[]> {
    const nftManager = this.getNftManager(contractAddress);
    return nftManager.fetchTokens(address);
  }
}
