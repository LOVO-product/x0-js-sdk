import { ethers, providers } from 'ethers';
import { BlueChipContract, contractAddresses } from './contracts';
import { Erc721, Erc721Alternative, NftManager } from './nft-manager';

export interface X0SdkConfig {
  /**
   * @description Beanz, InvisibleFriends, MoonBirds is required to use Erc721Alternative
   * @description Provider api key is required to use Erc721Alternative
   */
  apiKey?: string;

  /**
   * @description Use your own provider
   */
  provider: providers.Provider;
}

/**
 * @example
 * ```typescript
 * const x0Sdk = new X0Sdk({ provider: new ethers.providers.AlchemyProvider('mainnet', 'YOUR_PROVIDER_API_KEY') });
 * const x0Api = new X0Api('YOUR_X0_API_KEY');
 * const pairedWalletAddresses = await x0Api.getPairedColdAddressesFrom('0x...');
 * const tokens = await x0Sdk.fetchTokensWithContractAddress('0x...', pairedWalletAddresses[0]);
 * const metaData = await x0Sdk.getNftMetadata('0x...', tokens[0]);
 * ```
 */
export class X0Sdk {
  /**
   * @description Beanz, InvisibleFriends, MoonBirds is required to use Erc721Alternative
   */
  readonly apiKey?: string;

  readonly provider: providers.Provider;

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

    const nftManager = !X0Sdk.exceptionNfts.includes(contractAddress)
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
}
