import { ethers, providers } from 'ethers';

export const fetchTokens = async (
  provider: providers.AlchemyWebSocketProvider,
  contractAddress: string,
  address: string,
) => {
  const abi = ['function balanceOf(address owner) view returns (uint256)'];

  const contract = new ethers.Contract(contractAddress, abi, provider);
  const res = await contract.balanceOf(address);
  return res;
};
