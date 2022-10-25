export interface NftManager {
  /**
   *
   * @param address wallet address
   * @returns true if the address owns at least one token
   */
  isOwnerOf(address: string): Promise<boolean>;

  /**
   *
   * @param address wallet address
   * @returns tokens
   */
  fetchTokens(address: string): Promise<string[]>;

  /**
   *
   * @param tokenId tokenId
   * @returns metadata
   */
  tokenURI(tokenId: string): Promise<Record<string, any> | null>;
}
