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

/**
 * ```ts
 * import { X0Api } from '@x0/x0-api-sdk';
 * const x0Api = new X0Api('YOUR_API_KEY');
 * ```
 */
export class X0Api {
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
  async getX0ConnectionsBy(address: string): Promise<Connection[]> {
    this._validateAddress(address);
    const response = await this.axiosInstance.get<Connection[]>(`wallets/${address}/connections`);
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
    const connections = await this.getX0ConnectionsBy(x0Address);
    if (!connections) {
      return false;
    }
    const result = connections.filter((connection: Connection) => {
      return (
        connection.walletAddressCold === coldAddress || connection.walletAddressX0 === coldAddress
      );
    });
    return result.length > 0;
  }
}
