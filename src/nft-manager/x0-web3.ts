import { ethers, providers } from 'ethers';
import {
  Erc721,
  Erc721Alternative,
  NftManager,
  BlueChipContract,
  contractAddresses,
} from '../index';
import { provider } from 'web3-core';

export interface X0Web3Config {
  /**
   * @description Beanz, InvisibleFriends, MoonBirds is required to use Erc721Alternative
   * @description Provider api key is required to use Erc721Alternative
   */
  apiKey?: string;

  /**
   * @description Use your own provider
   */
  provider: providers.Provider | provider;
}

/**
 * @example
 * ```typescript
 * const x0Web3 = new X0Web3({
 *     provider: new ethers.providers.AlchemyProvider('mainnet', alchemyApiKey),
 * });
 * ```
 */
export class X0Web3 {
  /**
   * @description Beanz, InvisibleFriends, MoonBirds is required to use Erc721Alternative
   */
  readonly apiKey?: string;

  readonly provider: providers.Provider | provider;

  /**
   * @description NftManager is a interface for fetching NFTs
   */
  private readonly nftManagers: { [key: string]: NftManager } = {};

  static abi = [
    'function balanceOf(address owner) view returns (uint256)',
    'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
    'function tokenURI(uint256 tokenId) view returns (string)',
  ];

  /**
   * @description Beanz, InvisibleFriends, MoonBirds does not support Erc721
   */
  static exceptionNfts = [
    BlueChipContract.Beanz,
    BlueChipContract.InvisibleFriends,
    BlueChipContract.MoonBirds,
  ].map((contractName) => contractAddresses[contractName]);

  static initialize(config: X0Web3Config) {
    return new X0Web3(config);
  }

  constructor(config: X0Web3Config) {
    this.apiKey = config.apiKey;
    this.provider = config.provider;
  }

  private getNftManager(contractAddress: string) {
    if (this.nftManagers[contractAddress]) {
      return this.nftManagers[contractAddress];
    }

    const nftManager = !X0Web3.exceptionNfts.includes(contractAddress)
      ? new Erc721(contractAddress, this.provider)
      : this.apiKey
      ? new Erc721Alternative(contractAddress, this.apiKey)
      : null;
    if (!nftManager) {
      throw new Error(
        'Beanz, InvisibleFriends, MoonBirds need apiKey because they do not support Erc721',
      );
    }

    this.nftManagers[contractAddress] = nftManager;
    return nftManager;
  }

  /**
   *
   * @param contract contract name of BlueChipContract
   * @param address wallet address
   * @returns tokens
   */
  async fetchTokens(contract: BlueChipContract, address: string): Promise<string[]> {
    return this.fetchTokensWithContractAddress(contractAddresses[contract], address);
  }

  /**
   *
   * @param contractAddress contract address
   * @param address wallet address
   * @returns tokens
   */
  async fetchTokensWithContractAddress(
    contractAddress: string,
    address: string,
  ): Promise<string[]> {
    const nftManager = this.getNftManager(contractAddress);
    return nftManager.fetchTokens(address);
  }

  /**
   *
   * @param contractAddress contract address
   * @param tokenId tokenId
   * @returns metadata
   */
  async getNftMetadata(
    contractAddress: string,
    tokenId: string,
  ): Promise<Record<string, any> | null> {
    const nftManager = this.getNftManager(contractAddress);
    return nftManager.tokenURI(tokenId);
  }

  /**
   *
   * @description check if the wallet address has a token of the contract
   * @param contract contract name of BlueChipContract
   * @param address  wallet address
   * @return true if the wallet address has NFTs
   */
  async isOwnerOf(contract: BlueChipContract, address: string): Promise<boolean>;
  /**
   *
   * @param contract contract address
   * @param address wallet address
   * @return true if the wallet address has NFTs
   */
  async isOwnerOf(contract: string, address: string): Promise<boolean>;
  async isOwnerOf(contract: BlueChipContract | string, address: string): Promise<boolean> {
    let contractAddress: string | undefined = undefined;

    if (contract in BlueChipContract) {
      contractAddress = contractAddresses[contract as BlueChipContract];
    } else if (ethers.utils.isAddress(contract)) {
      contractAddress = contract;
    }

    if (!contractAddress || !ethers.utils.isAddress(contractAddress))
      throw new Error('invalid contract address');
    const nftManager = this.getNftManager(contractAddress);
    return nftManager.isOwnerOf(address);
  }

  static validateAddress(address: string): void {
    if (!ethers.utils.isAddress(address)) {
      throw new Error(`Invalid Block Chain Address: ${address}`);
    }
  }
}
