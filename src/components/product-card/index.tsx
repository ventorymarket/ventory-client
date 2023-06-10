import IconCart from "@/assets/icons/IconCart";
import IconVerified from "@/assets/icons/IconVerified";
import { GRID_MODE, REFUNDABLE_FEE } from "@/constants";
import { Button } from "antd";
import Image from "next/image";
import VenomToken from "../../../public/images/token/venom.png";
import CustomImage from "../custom-image";
import Link from "next/link";
import { useVenom } from "@/contexts/useVenom";
import { formatBalance } from "@/utils";
import ModalBuyNft from "@/components/custom-modal/ModalBuyNft";
import useShowModal from "@/hooks/useShowModal";
import ModalListNft from "@/components/custom-modal/ModalListNft";
import ModalCancelNFT from "../custom-modal/ModalDeList";
import ModalMakeOffer from "../custom-modal/ModalMakeOffer";
import ModalBuySuccess from "../custom-modal/ModalBuySuccess";
import ModalWaiting from "../custom-modal/ModalWaiting";
import { Address } from "everscale-inpage-provider";
import { toast } from "react-hot-toast";
interface IProductCardProps {
  gridMode?: GRID_MODE;
}

const ProductCard = (props: any) => {
  const {
    collectionName,
    nftId,
    title,
    imageUrl,
    avatar,
    numberLike,
    listingPrice,
    ownerAddress,
    creatorAddress,
    isListing,
    isLike,
    handleLikeNft,
    isActive,
    nftStatus,
    verify,
    isOnWallet = false,
    collectionAddress,
    royaltyFee,
    timeListing,
    ranking,
    top = 0,
    isOnBulkAction,
    onSelectNft,
    selectedNft,
    disabledCheckbox,
    offerPrice,
    id,
    managerNft,
    gridMode,
  } = props;

  const { account, provider, balance } = useVenom();

  const renderPrice = () => {
    if (!isListing)
      return (
        <div className="flex items-center space-x-1">
          <Image src={VenomToken} alt="Venom" width={12} height={12} />
          <span className="text-white text-xs font-medium">Unlisted</span>
        </div>
      );
    return (
      <div className="flex justify-between leading-[18px]">
        <span className="text-secondary text-xs font-medium">Price</span>
        <div className="flex items-center space-x-1">
          <Image src={VenomToken} alt="Venom" width={12} height={12} />
          <span className="text-white text-xs font-medium">
            {formatBalance(listingPrice)} VENOM
          </span>
        </div>
      </div>
    );
  };
  const {
    showModal: showModalBuyNft,
    onHide: onHideModalBuyNft,
    onShow: onShowModalBuyNft,
  } = useShowModal();
  const {
    showModal: showModalListNft,
    onHide: onHideModalListNft,
    onShow: onShowModalListNft,
  } = useShowModal();
  const {
    showModal: showModalCancelNFT,
    onHide: onHideModalCancelNFT,
    onShow: onShowModalCancelNFT,
  } = useShowModal();

  const {
    showModal: showModalMakeOffer,
    onHide: onHideModalMakeOffer,
    onShow: onShowModalMakeOffer,
  } = useShowModal();
  const {
    showModal: showModalBuySuccess,
    onHide: onHideModalBuySuccess,
    onShow: onShowModalBuySuccess,
  } = useShowModal();
  const {
    showModal: showModalWaiting,
    onHide: onHideModalWaiting,
    onShow: onShowModalWaiting,
  } = useShowModal();

  const estimatedFund = Number(listingPrice) + REFUNDABLE_FEE;

  const handleBuy = async () => {
    onShowModalWaiting();
    onHideModalBuyNft();
    try {
      const callData = {
        sender: new Address(account),
        recipient: new Address(managerNft),
        amount: estimatedFund.toString(),
        bounce: true,
      };
      const res = await provider?.sendMessage(callData);
      if (res) {
        console.log(res);

        toast.success("Bought successfully!");
        onShowModalBuySuccess();
      }
    } catch (error) {
      console.log(error);
    } finally {
      onHideModalWaiting();
    }
  };

  return (
    <div>
      <Link href={`/nft/${nftId}`}>
        <div className="bg-layer-2 border border-solid rounded-lg p-2 border-stroke cursor-pointer group">
          <div className="flex flex-col space-y-2">
            <div className="aspect-square w-full overflow-hidden relative rounded-lg">
              <CustomImage
                src={imageUrl}
                alt="Nft"
                className="object-cover w-full h-full group-hover:scale-110 !transition !duration-300 !ease-in-out group-hover:blur-sm"
                wrapperClassName="w-full h-full"
              />

              {isListing ? (
                <>
                  {account !== ownerAddress ? (
                    <div className="items-center space-x-2 w-[90%] hidden group-hover:flex absolute bottom-3 right-1/2 translate-x-1/2 z-5">
                      <Button className="btn-secondary w-12">
                        <IconCart />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          onShowModalBuyNft();
                        }}
                        className="btn-primary flex-1"
                      >
                        Buy
                      </Button>
                    </div>
                  ) : (
                    <div className="items-center space-x-2 w-[90%] hidden group-hover:flex absolute bottom-3 right-1/2 translate-x-1/2 z-5">
                      {/* <Button className="btn-secondary w-12">
                        <IconCart />
                      </Button> */}
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          onShowModalCancelNFT();
                        }}
                        className="btn-primary flex-1"
                      >
                        Cancel List
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {account !== ownerAddress ? (
                    <div className="items-center w-[90%] hidden group-hover:flex absolute bottom-3 right-1/2 translate-x-1/2 z-5">
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          // onShowModalMakeOffer();
                        }}
                        className="btn-primary flex-1"
                      >
                        Make Offer
                      </Button>
                    </div>
                  ) : (
                    <div className="items-center w-[90%] hidden group-hover:flex absolute bottom-3 right-1/2 translate-x-1/2 z-5">
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          onShowModalListNft();
                        }}
                        className="btn-primary flex-1"
                      >
                        List for Sale
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between space-x-1">
                <IconVerified />
                <span className="text-secondary text-sm leading-5 flex-1 flex justify-start">
                  {collectionName}
                </span>
                {!!ranking && (
                  <div className="rounded-lg bg-primary text-semi-black font-medium text-xs p-1">
                    {`#${ranking}`}
                  </div>
                )}
              </div>
              <span className="text-white text-base font-medium leading-6">
                {title}
              </span>
            </div>
            <>
              {gridMode === GRID_MODE.SMALL && renderPrice()}
              {(gridMode === GRID_MODE.LARGE || !gridMode) && (
                <div className="bg-layer-3 rounded-lg p-2 flex flex-col space-y-2">
                  {renderPrice()}
                  <div className="flex justify-between leading-[18px]">
                    <span className="text-secondary text-xs font-medium">
                      Top offer
                    </span>
                    {offerPrice ? (
                      <div className="flex items-center space-x-1">
                        <Image
                          src={VenomToken}
                          alt="Venom"
                          width={12}
                          height={12}
                        />
                        <span className="text-white text-xs font-medium">
                          {formatBalance(offerPrice)} VENOM
                        </span>
                      </div>
                    ) : (
                      <span className="text-secondary">--</span>
                    )}
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      </Link>
      <ModalBuyNft
        open={showModalBuyNft}
        onCancel={onHideModalBuyNft}
        nft={props}
        handleBuy={handleBuy}
      />
      <ModalBuySuccess
        open={showModalBuySuccess}
        nft={props}
        onCancel={onHideModalBuySuccess}
      />
      <ModalListNft
        open={showModalListNft}
        onCancel={onHideModalListNft}
        nft={props}
      />
      <ModalCancelNFT
        open={showModalCancelNFT}
        onCancel={onHideModalCancelNFT}
        nft={props}
        manager={props?.managerNft || ""}
      />
      <ModalMakeOffer
        open={showModalMakeOffer}
        onCancel={onHideModalMakeOffer}
        nft={props}
      />
      <ModalWaiting open={showModalWaiting} onCancel={onHideModalWaiting} />
    </div>
  );
};

export default ProductCard;
