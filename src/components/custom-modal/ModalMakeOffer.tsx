import React from "react";
import CustomModal from ".";
import CustomImage from "../custom-image";
import IconVerified from "@/assets/icons/IconVerified";
import Image from "next/image";
import CustomInput from "../input";
import CustomSelect from "../select";
import { DURATION_OPTIONS } from "@/constants";
import { formatBalance } from "@/utils";

interface IModalMakeOffer {
  open: boolean;
  onCancel: any;
  nft?: any;
}

const CURRENCY_OPTIONS = [
  {
    label: (
      <div className="flex items-center space-x-1">
        <Image
          src="/images/token/venom.png"
          alt="token"
          width={16}
          height={16}
        />
        <span className="text-secondary">VENOM</span>
      </div>
    ),
    value: 1,
  },
];

const ModalMakeOffer = ({ open, onCancel, nft }: IModalMakeOffer) => {
  return (
    <CustomModal
      title="Make Offer"
      open={open}
      onCancel={onCancel}
      okText="Make Offer"
      width={504}
    >
      <div>
        <div className="rounded-lg border border-solid border-stroke bg-layer-2 p-2">
          <div className="flex items-center space-x-2">
            <CustomImage
              src="/images/demo_nft.png"
              alt="nft"
              className="w-[50px] h-[50px] rounded-lg"
            />
            <div className="flex-1 flex flex-col justify-between">
              <span className="text-lg font-medium text-white">
                {nft?.title}
              </span>
              <div className="flex items-center space-x-2">
                <IconVerified />
                <span className="text-secondary text-sm font-medium">
                  {nft?.collectionName}
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-layer-3 p-2 space-y-2 mt-3">
            {nft?.isListing ? (
              <div className="flex items-center justify-between">
                <span className="text-secondary text-xs font-medium">
                  Price
                </span>
                <div className="flex items-center space-x-1">
                  <Image
                    src="/images/token/venom.png"
                    alt="token"
                    width={12}
                    height={12}
                  />
                  <span className="text-white font-medium text-xs">
                    18.87 VENOM
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-white font-medium text-xs">Unlisted</span>
            )}

            <div className="flex items-center justify-between">
              <span className="text-secondary text-xs font-medium">
                Top offer
              </span>
              {nft?.offerPrice ? (
                <div className="flex items-center space-x-1">
                  <Image
                    src="/images/token/venom.png"
                    alt="token"
                    width={12}
                    height={12}
                  />
                  <span className="text-white font-medium text-xs">
                    {formatBalance(nft?.offerPrice) || 0} VENOM
                  </span>
                </div>
              ) : (
                <span className="text-secondary">--</span>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-5 mt-5">
          <p className="text-white text-lg font-medium">Other information</p>
          <div className="space-x-4 flex items-center">
            <CustomInput placeholder="Price" className="basis-2/3 h-[62px]" />
            <CustomSelect
              options={CURRENCY_OPTIONS}
              value={CURRENCY_OPTIONS[0].value}
              className="flex-1 h-[62px]"
            />
          </div>
          <CustomSelect
            className="h-[62px]"
            options={DURATION_OPTIONS}
            value={DURATION_OPTIONS[0].value}
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default ModalMakeOffer;
