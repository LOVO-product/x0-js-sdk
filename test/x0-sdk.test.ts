import {X0Api, X0Sdk, X0Web3} from "../src";
import {ethers} from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

describe(`X0Sdk`, () => {
    jest.setTimeout(60000);
    const x0ApiKey = process.env.X0_API_KEY;
    const alchemyApiKey = process.env.ALCHEMY_API_KEY;
    let x0Api: X0Api;
    let x0Web3: X0Web3;
    let x0Sdk: X0Sdk;
    const x0Address = '0x268Fc17e40123701B9A5a71dB9e77bF5Ae07D5d6';
    // const coldAddress = '0x571aab2bec12edC2cfA02C989b2DA47912B7a0c6';
    const contractAddress = '0xa0768DC386712ed355f41D56bdbc05bfBb9C797b';

    beforeAll(() => {
        if (!(alchemyApiKey && x0ApiKey)) {
            throw new Error('Missing ALCHEMY_API_KEY or X0_API_KEY');
        }
        x0Web3 = new X0Web3({
            provider: new ethers.providers.AlchemyProvider('mainnet', alchemyApiKey),
        });
        x0Api = new X0Api(x0ApiKey, { url: 'https://api-dev.x0.xyz/v1' });
        x0Sdk = new X0Sdk(x0Web3, x0Api);
    })

    describe(`getMetadataFrom`, () => {
        it('wrong contract address', async () => {
            try {
                await x0Sdk.getMetadataFrom('0x0123', x0Address);
                expect(true).toBeFalsy();
            } catch (e: any) {
                expect(e.message).toEqual('Invalid Block Chain Address: 0x0123');
            }
        })

        it('wrong wallet address', async () => {
            try {
                await x0Sdk.getMetadataFrom(contractAddress, '0x0123');
                expect(true).toBeFalsy();
            } catch (e: any) {
                expect(e.message).toEqual('Invalid Block Chain Address: 0x0123');
            }
        })

        it('No paired wallet addresses found for x0 address', async () => {
            try {
                await x0Sdk.getMetadataFrom(contractAddress, '0x26bc28C861d5dd3085c3CCe1e113aa4ec9d1a28B');
                expect(true).toBeFalsy();
            } catch (e: any) {
                expect(e.message).toEqual('No paired wallet addresses found for x0 address: 0x26bc28C861d5dd3085c3CCe1e113aa4ec9d1a28B');
            }
        })

        it('paired wallet addresses found for x0 address', async () => {
            const value = ['1','2'];
            jest.spyOn(x0Web3, 'fetchTokensWithContractAddress').mockResolvedValueOnce(value)
            const results = await x0Sdk.getMetadataFrom(contractAddress, x0Address);
            let index = 0;
            results.forEach((result: Record<string, any>)=>{
                expect(result['TokenID']).toEqual(value[index]);
                index++;
            })
        })
    })
});