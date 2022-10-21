import axios, { AxiosInstance } from 'axios';
import { ethers } from 'ethers';

export interface X0ApiConfig {
  /**
   * To change the base URL for the API, set this value.
   */
  url?: string;
}

/**
 * The Connection object returned by the API.
 */
interface Connection {
  walletAddressCold: string;
  walletAddressX0: string;
}

export class X0ApiSdk {
  private axiosInstance: AxiosInstance;

  /**
   * X0 API base URL
   */
  private baseUrl = 'https://api.x0.xyz/v1';

  /**
   * The API key used to authenticate with the API.
   */
  private apiKey: string;

  constructor(apiKey: string, config?: X0ApiConfig) {
    this.apiKey = apiKey;
    this.axiosInstance = axios.create({
      baseURL: config?.url ?? this.baseUrl,
      headers: {
        'x-api-key': this.apiKey,
      },
    });
  }

  /**
   *
   * @param address - The address of the wallet to get connections
   * @returns X0 connections through the address
   */
  async getX0ConnectionsThrough(address: string): Promise<GetConnectionsResponse> {
    this._validateAddress(address);
    const response = await this.axiosInstance.get<GetConnectionsResponse>(
      `/wallets/${address}/connections`,
    );
    return response.data;
  }

  private _validateAddress(address: string): void {
    if (!ethers.utils.isAddress(address)) {
      throw new Error(`Invalid Block Chain Address: ${address}`);
    }
  }

  /**
   *
   * @param x0Address - The address of the X0 wallet
   * @param coldAddress - The address of the COLD wallet
   * @returns true if the x0 and cold addresses are a pair
   */
  async isPair(x0Address: string, coldAddress: string): Promise<boolean> {
    this._validateAddress(x0Address);
    this._validateAddress(coldAddress);
    const wallet = await this.getX0ConnectionsThrough(x0Address);
    if (!wallet.connectionsX0) {
      return false;
    }
    const result = wallet.connectionsX0.filter(
      (connection: Connection) => connection.walletAddressCold === coldAddress,
    );
    return result.length > 0;
  }
}

/**
 * Expoted types
 */

/**
 * The Response from the API when fetching connections.
 */
interface GetConnectionsResponse {
  /**
   * The wallet address of the wallet.
   */
  address: string;

  /**
   * Type of wallet, either 'COLD' or 'X0'
   */
  type: string | null;

  /**
   * The connections of the X0 wallet.
   */
  connectionsX0?: Connection[];

  /**
   * The connections of the Cold wallet.
   */
  connectionsCold?: Connection[];
  updatedAt: string;
  createdAt: string;
}
