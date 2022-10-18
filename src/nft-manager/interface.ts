export interface NftManager {
  isOwnerOf(address: string): Promise<boolean>;
  fetchTokens(address: string): Promise<string[]>;
}
