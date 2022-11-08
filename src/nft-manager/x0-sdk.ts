import { X0Web3 } from './x0-web3';
import { X0Api } from '../api/x0-api';
import { providers } from 'ethers';
import { provider } from 'web3-core';

interface X0SdkConfig {
  /**
   * @description The Ethereum provider to use for the SDK.
   */
  provider: providers.Provider | provider;

  /**
   * @description X0 API Key
   */
  x0ApiKey: string;

  /**
   * @description X0 API URL
   * @default 'https://api.x0.xyz/v1'
   */
  x0ApiUrl?: string;
}

/**
 * @example
 * ```typescript
 * const provider = new ethers.providers.AlchemyProvider('mainnet', alchemyApiKey);
 * x0Sdk = new X0Sdk({ provider, x0ApiKey });
 * const metadata = await x0Sdk.getMetadataFrom(contractAddress, x0Address);
 * ```
 */

/**
 * @example
 * ```typescript
 * const provider = new Web3.providers.HttpProvider(
 *         'https://eth-mainnet.alchemyapi.io/v2/' + alchemyApiKey,
 *       );
 * const Web3X0Sdk = new X0Sdk({ provider, x0ApiKey });
 * const metadata = await Web3X0Sdk.getMetadataFrom(contractAddress, x0Address);
 * ```
 */
export class X0Sdk {
  /**
   * @description Fetches to the blockchain and returns the owner of the token and the token's metadata
   * @private
   */
  private x0Web3: X0Web3;

  /**
   * @description Fetch to X0 API and returns the connections cold wallet address
   * @private
   */
  private x0Api: X0Api;

  constructor({ provider, x0ApiKey, x0ApiUrl }: X0SdkConfig) {
    this.x0Web3 = new X0Web3({ provider });
    this.x0Api = new X0Api({
      apiKey: x0ApiKey,
      url: x0ApiUrl,
    });
  }

  /**
   * @description Find All NFTs token for a given x0 address
   * @param contractAddress
   * @param x0WalletAddress
   */
  async fetchTokensWithContractAddress(contractAddress: string, x0WalletAddress: string) {
    X0Web3.validateAddress(contractAddress);
    X0Web3.validateAddress(x0WalletAddress);
    const pairedWalletAddresses = await this.x0Api.getPairedColdAddressesFrom(x0WalletAddress);
    const tokens: string[] = [];
    await Promise.all(
      [x0WalletAddress, ...pairedWalletAddresses].map(async (walletAddress) => {
        const data = await this.x0Web3.fetchTokensWithContractAddress(
          contractAddress,
          walletAddress,
        );
        tokens.push(...data);
      }),
    );
    return tokens;
  }
  /**
   * @description Find All NFTs metadata for a given x0 address
   * @returns the owner of token's metadata
   * @param contractAddress
   * @param x0WalletAddress
   */
  public async getMetadataFrom(contractAddress: string, x0WalletAddress: string): Promise<any> {
    X0Web3.validateAddress(contractAddress);
    X0Web3.validateAddress(x0WalletAddress);
    const tokens = await this.fetchTokensWithContractAddress(contractAddress, x0WalletAddress);
    if (tokens.length === 0) {
      return [];
    }
    return await Promise.all(
      tokens.map(async (token) => {
        return this.x0Web3.getNftMetadata(contractAddress, token);
      }),
    );
  }
}
