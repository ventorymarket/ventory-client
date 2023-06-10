import CustomModal from ".";
import { useState } from "react";
import { useVenom } from "@/contexts/useVenom";
import { Address } from "everscale-inpage-provider";
import { toast } from "react-hot-toast";
import Sell from "../../contexts/abi/Sell.abi.json";
import useProviderSigner from "@/contexts/useProviderSigner";
import { delay } from "@/helper/delay";
import CustomImage from "../custom-image";
import IconVerified from "@/assets/icons/IconVerified";
import Image from "next/image";
import VenomToken from "../../../public/images/token/venom.png";
import { NumericFormat } from "react-number-format";
import { formatBalance } from "@/utils";

interface IModalCancelNFT {
  open: boolean;
  onCancel: any;
  nft: any;
  manager: any;
}
const ModalCancelNFT = ({ open, onCancel, nft, manager }: IModalCancelNFT) => {
  const [loading, setLoading] = useState(false);
  const { account, provider } = useVenom();
  const { getInfoNFT } = useProviderSigner();
  const handleListing = async () => {
    try {
      setLoading(true);
      const contract = new provider.Contract(Sell, new Address(manager));
      const res = (await contract.methods
        .cancelOrder()
        .send({ from: account, amount: "1000000000" })) as any;
      delay(2000);
      const nftData = await getInfoNFT(nft.nftId);
      if (
        nftData?.manager?._address == nftData?.owner?._address &&
        nftData?.owner?._address == account
      )
        toast.success("Delist successfully!");
      else {
        toast.error("Delist failed!");
      }
    } catch (err) {
      console.log(err);
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
      title="Remove Listing"
      open={open}
      onCancel={onCancel}
      destroyOnClose={true}
      loading={loading}
      width={500}
      okText="Remove Listing"
      onOk={handleListing}
    >
      <div className="pt-5">
        <div className="text-white flex justify-between items-center space-x-2 pb-8 border-b border-solid border-stroke">
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
          {
            <div className="space-x-1 flex items-center">
              <Image src={VenomToken} alt="token" width={14} height={14} />
              <span className="text-sm">
                <NumericFormat
                  value={formatBalance(nft?.listingPrice || 0)}
                  displayType="text"
                  thousandSeparator=","
                />{" "}
                VENOM
              </span>
            </div>
          }
        </div>
        <h4 className="text-base font-semibold text-[white] leading-6 mb-3 mt-3">
          Remove Listing?
        </h4>
        <p className="text-[#BABAC7] leading-5">
          Canceling your listing will unpublish this sale from Ventory and
          requires a transaction to make sure it will never be fulfillable.
        </p>
      </div>
    </CustomModal>
  );
};

export default ModalCancelNFT;
