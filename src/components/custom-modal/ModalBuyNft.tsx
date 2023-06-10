import IconCopy from "@/assets/icons/IconCopy";
import IconInfo from "@/assets/icons/IconInfo";
import IconVerified from "@/assets/icons/IconVerified";
import { REFUNDABLE_FEE } from "@/constants";
import { useVenom } from "@/contexts/useVenom";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { formatBalance, formatWallet } from "@/utils";
import { Tooltip } from "antd";
import Image from "next/image";
import CustomModal from ".";
import VenomToken from "../../../public/images/token/venom.png";
import Venom from "../../../public/images/venom.png";
import CustomImage from "../custom-image";

interface IModalBuyNft {
  open: boolean;
  onCancel: any;
  nft?: any;
  handleBuy?: any;
}

const ModalBuyNft = ({ open, onCancel, nft, handleBuy }: IModalBuyNft) => {
  const [text, copy] = useCopyToClipboard();
  const { account, balance } = useVenom();
  const estimatedFund = Number(nft?.listingPrice) + REFUNDABLE_FEE;

  return (
    <CustomModal
      title="Checkout"
      open={open}
      onCancel={onCancel}
      okText="Buy Now"
      onOk={handleBuy}
    >
      <div>
        <p className="text-secondary text-base">You decide to buy</p>
        <div className="text-white flex justify-between items-center space-x-2 py-8 border-b border-solid border-stroke">
          <CustomImage
            src={nft?.imageUrl}
            alt="nft"
            width={50}
            height={50}
            className="rounded-lg"
          />
          <div className="flex-1 flex flex-col justify-between truncate">
            <span className="text-lg font-medium truncate">{nft?.title}</span>
            <div className="flex items-center space-x-2">
              <IconVerified />
              <span className="text-secondary text-sm font-medium truncate">
                {nft?.collectionName}
              </span>
            </div>
          </div>
          <div className="space-x-1 flex items-center">
            <Image src={VenomToken} alt="token" width={14} height={14} />
            <span className="text-sm ">
              {formatBalance(nft?.listingPrice)} VENOM
            </span>
          </div>
        </div>
        <div className="border-b border-solid border-stroke pb-5">
          <div className="mt-5">
            <p className="text-secondary text-base">Your wallet:</p>
            <div className="bg-layer-2 rounded-lg p-4 flex items-center space-x-2 mt-5">
              <Image src={Venom} alt="Venom" />
              <div className="text-lg">
                <span className="text-secondary">Venom</span>
                <div className="text-white flex items-center font-medium space-x-2">
                  <span>{formatWallet(account)}</span>
                  <Tooltip title="Copied" placement="right" trigger={["click"]}>
                    <IconCopy
                      className="cursor-pointer"
                      onClick={copy as any}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-white mt-4">
            <div className="flex items-center space-x-1">
              <span className="text-secondary text-base">Refundable fee</span>
              <Tooltip title="Maximum fee amount is specified by dApp being required to pay for the logic executable smart contracts chain. Most commonly this fee will be partially refunded on a user's wallet.">
                <IconInfo />
              </Tooltip>
            </div>
            <div className="space-x-1 flex items-center font-medium text-base">
              <Image src={VenomToken} alt="token" width={14} height={14} />
              <span className="text-sm ">
                {formatBalance(REFUNDABLE_FEE)} VENOM
              </span>
            </div>
          </div>
        </div>
        {Number(balance * 10 ** 9) <= Number(estimatedFund) ? (
          <p className="mt-4 text-secondary">Not enough fund in VENOM</p>
        ) : (
          <div className="flex items-center justify-between text-white mt-4">
            <span>You will pay</span>
            <div className="space-x-1 flex items-center font-medium text-base">
              <Image src={VenomToken} alt="token" width={14} height={14} />
              <span className="text-sm ">
                {formatBalance(estimatedFund)} VENOM
              </span>
            </div>
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default ModalBuyNft;
