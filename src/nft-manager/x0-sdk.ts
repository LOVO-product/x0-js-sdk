import { X0Web3 } from './x0-web3';
import { X0Api } from '../api/x0-api';

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
   * @description Fetches to the blockchain and returns the owner of the token and the token's metadata
   * @private
   */
  private x0Web3: X0Web3;

  /**
   * @description Fetch to X0 API and returns the connections cold wallet address
   * @private
   */
  private x0Api: X0Api;
  constructor(x0Web3: X0Web3, x0Api: X0Api) {
    this.x0Web3 = x0Web3;
    this.x0Api = x0Api;
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
    const pairedWalletAddresses = await this.x0Api.getPairedColdAddressesFrom(x0WalletAddress);
    if (pairedWalletAddresses.length === 0) {
      throw new Error(`No paired wallet addresses found for x0 address: ${x0WalletAddress}`);
    }
    const tokens: string[] = [];
    await Promise.all(
      pairedWalletAddresses.map(async (coldWalletAddress) => {
        const data = await this.x0Web3.fetchTokensWithContractAddress(
          contractAddress,
          coldWalletAddress,
        );
        tokens.push(...data);
      }),
    );
    if (tokens.length === 0) {
      throw new Error(`No tokens found for contract address: ${contractAddress}`);
    }
    return await Promise.all(
      tokens.map(async (token) => {
        return this.x0Web3.getNftMetadata(contractAddress, token);
      }),
    );
  }
}
