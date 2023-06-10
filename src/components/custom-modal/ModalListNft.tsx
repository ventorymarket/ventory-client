import React, { useState } from "react";
import CustomModal from ".";
import IconPricetag from "@/assets/icons/IconPricetag";
import CustomImage from "../custom-image";
import IconVerified from "@/assets/icons/IconVerified";
import VenomToken from "../../../public/images/token/venom.png";
import Image from "next/image";
import CustomInput from "../input";
import nftAbi from "../../contexts/abi/NFT.abi.json";
import sellRoot from "../../contexts/abi/SellRoot.abi.json";
import { useVenom } from "@/contexts/useVenom";
import { Address } from "everscale-inpage-provider";
import { delay } from "@/helper/delay";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import useProviderSigner from "@/contexts/useProviderSigner";
import { contractMarket } from "@/constants/market";
import { formatBalance } from "@/utils";
interface IModalListNft {
  open: boolean;
  onCancel: any;
  nft: any;
}

const ModalListNft = ({ open, onCancel, nft }: IModalListNft) => {
  const { account, provider } = useVenom();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<any>("");
  const router = useRouter();
  const { getInfoNFT } = useProviderSigner();
  const id = router.query.id;

  const nft_adress = nft?.nftId || id;
  const changeManage = async () => {
    const nftContract = new provider.Contract(nftAbi, new Address(nft_adress));
    try {
      setLoading(true);
      const sellRootABI = new provider.Contract(
        sellRoot,
        new Address(contractMarket)
      );
      const payload = (await sellRootABI.methods
        .generatePayload({ answerId: 0, price: price * 10 ** 9 } as never)
        .call()) as any;
      (await nftContract.methods
        .changeManager({
          newManager: contractMarket,
          sendGasTo: account,
          callbacks: [
            [
              contractMarket,
              {
                value: payload.totalValueWithNftGas.toString(),
                payload: payload.payload,
              },
            ],
          ],
        } as never)
        .send({
          from: account,
          amount: (
            Number(payload.totalValueWithNftGas) +
            1 * 10 ** 8
          ).toString(),
        })) as any;
      delay(2000);
      const nft = await getInfoNFT(nft_adress);
      if (
        nft?.manager?._address != nft?.owner?._address &&
        nft?.manager?._address != account &&
        nft?.manager?._address != contractMarket
      )
        toast.success("List successfully!");
      else {
        toast.error("List failed!");
      }
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
      onCancel();
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }
  };
  return (
    <CustomModal
      title="List for Sale"
      open={open}
      onCancel={onCancel}
      okText="List Now"
      onOk={changeManage}
      loading={loading}
      disabled={!Boolean(Number(price))}
    >
      <div className="bg-layer-2 rounded-lg p-2 flex items-center">
        <div className="rounded-lg flex items-center justify-center space-x-2 text-white font-medium basis-1/2 py-3 bg-layer-1 hover:bg-layer-1 text-base cursor-pointer">
          <IconPricetag />
          <span>Fixed Price</span>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-secondary text-base">You decide to list:</p>
        <div className="text-white flex justify-between items-center space-x-2 py-8 border-b border-solid border-stroke">
          <CustomImage
            src="/images/demo_nft.png"
            alt="nft"
            width={50}
            height={50}
            className="rounded-lg"
          />
          <div className="flex-1 flex flex-col justify-between">
            <span className="text-lg font-medium">{nft?.title}</span>
            <div className="flex items-center space-x-2">
              <IconVerified />
              <span className="text-secondary text-sm font-medium">
                {nft?.collectionName}
              </span>
            </div>
          </div>
          {nft?.isListing && (
            <div className="space-x-1 flex items-center">
              <Image src={VenomToken} alt="token" width={14} height={14} />
              <span className="text-sm ">{`${
                formatBalance(nft?.listingPrice) || 0
              } VENOM`}</span>
            </div>
          )}
        </div>
      </div>
      <div className="border-b border-solid border-stroke py-5 space-y-5">
        <div className="flex items-center justify-between text-white font-medium">
          <span className="text-base">Collection floor</span>
          <div className="space-x-1 flex items-center">
            <Image src={VenomToken} alt="token" width={14} height={14} />
            <span className="text-sm ">{`${
              formatBalance(nft?.floorPriceListing) || "--"
            } VENOM`}</span>
          </div>
        </div>
        <CustomInput
          placeholder="Price"
          pattern="[0-9\.]*$"
          value={price}
          onChange={(e: any) => {
            if (!e.target.value) setPrice("");
            if (e.target.value && e.target.validity.valid)
              setPrice(e.target.value);
          }}
        />
      </div>
      <div className="text-white mt-5">
        <p className="text-lg font-medium">Fee</p>
        <div className="flex items-center justify-between mt-5">
          <span className="text-secondary text-base">
            Creator Royalties (5%)
          </span>
          <div className="space-x-1 flex items-center">
            <Image src={VenomToken} alt="token" width={14} height={14} />
            <span className="text-sm ">{`${(price * 5) / 100} VENOM`}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-secondary text-base">Platform (2.5%)</span>
          <div className="space-x-1 flex items-center">
            <Image src={VenomToken} alt="token" width={14} height={14} />
            <span className="text-sm ">{`${(price * 2.5) / 100} VENOM`}</span>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ModalListNft;
