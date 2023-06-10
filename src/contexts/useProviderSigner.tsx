import { useVenom } from "./useVenom";
import nftAbi from "./abi/NFT.abi.json";
import Sell from "./abi/Sell.abi.json";
import { Address } from "everscale-inpage-provider";
import NFTAbiDevnet from "./abi/CollectionSimilar.abi.json";

const useProviderSigner = () => {
  const { provider } = useVenom();
 

  const getNftJson = async (nft_adress: any) => {
    try {
      const nftContract = new provider.Contract(
        nftAbi,
        new Address(nft_adress)
      );
      const result = (await nftContract.methods
        .getJson({ answerId: 0 } as never)
        .call()) as { json: string };
      const json = JSON.parse(result.json ?? "{}");
      return json;
    } catch (e) {
      console.log(e);
    }
  };

  const getInfoNFT = async (nft_adress: any) => {
    try {
      const nftContract = new provider.Contract(
        nftAbi,
        new Address(nft_adress)
      );
      const result = (await nftContract.methods
        .getInfo({ answerId: 0 } as never)
        .call()) as any;
      return result;
    } catch (e) {
      console.log(e);
    }
  };

  const getInfoManager = async (manager_adress: any) => {
    try {
      const nftContract = new provider.Contract(
        Sell,
        new Address(manager_adress)
      );
      const result = (await nftContract.methods
        .getOfferInfo({ answerId: 0 } as never)
        .call()) as any;
      return result;
    } catch (error) {
      return null;
    }
  };

  const getAllNFTsByCodehash = async (nft_adress: any) => {
    try {
      const nftContract = new provider.Contract(NFTAbiDevnet, nft_adress);
      const { codeHash: codeHash1 } = await nftContract.methods
        .nftCodeHash({ answerId: 0 } as never)
        .call({ responsible: true });
      const codeHash = BigInt(codeHash1).toString(16);
      const res = await provider?.getAccountsByCodeHash({ codeHash });
      return res;
    } catch (error) {
      return null;
    }
  };

  const getNFTsInCollection = async (nft_adress: any) => {
    try {
      let hasNext = nft_adress;
      let results = [];
      while (hasNext) {
        const res = await getAllNFTsByCodehash(hasNext);
        hasNext = res?.continuation;
        console.log(res, hasNext);
        for (let nft of res?.accounts) {
          results.push(nft);
        }
      }
      console.log(results);
      return results;
    } catch (ex) {
      console.log(ex);
    }
    return [];
  };

  return {
    getNftJson,
    getInfoNFT,
    getInfoManager,
    getNFTsInCollection,
    getAllNFTsByCodehash
  };
};

export default useProviderSigner;
