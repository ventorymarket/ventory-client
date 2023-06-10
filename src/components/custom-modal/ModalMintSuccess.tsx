import CustomModal from ".";
import { useState } from "react";
import { useVenom } from "@/contexts/useVenom";
import useProviderSigner from "@/contexts/useProviderSigner";
import CustomImage from "../custom-image";
import { useRouter } from "next/router";
import { formatWallet } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import Success from "../../../public/images/Success.png";

interface IModalMintSuccess {
  open: boolean;
  onCancel: any;
  nft: any;
}
const ModalMintSuccess = ({ open, onCancel, nft }: IModalMintSuccess) => {
  const [loading, setLoading] = useState(false);
  const { account } = useVenom();
  const router = useRouter();
  const handleGotoProfile = () => {
    router.push(`/user/${account}`);
    onCancel();
  };
  return (
    <CustomModal
      title="Mint Success"
      open={open}
      onCancel={onCancel}
      destroyOnClose={true}
      loading={loading}
      width={350}
      okText="My Profile"
      onOk={handleGotoProfile}
    >
      <div className="pt-5">
        <div className="text-white flex flex-col space-x-2 pb-4">
          {/* <CustomImage
            src={nft?.preview?.source}
            alt="nft"
            className="rounded-lg w-full"
          /> */}
          <Image src={Success} alt="token" />
          {/* <div className="flex-1 !ml-0 flex flex-col gap-2 mt-5 px-4 py-2 rounded-lg border border-solid border-stroke">
            <div className="flex items-center justify-between space-x-2">
              <span className="text-secondary text-sm font-medium">
                {"Item"}
              </span>
              <span className="text-secondary text-sm font-medium">
                {nft?.name}
              </span>
            </div>
            <div className="flex items-center justify-between space-x-2">
              <span className="text-secondary text-sm font-medium">
                {"Address"}
              </span>
              <Link
                href={`/nft/${nft?.address}`}
                className="text-secondary text-sm font-medium hover:text-primary"
              >
                {formatWallet(nft?.address)}
              </Link>
            </div>
          </div> */}
        </div>
        <div className="text-[#BABAC7] flex flex-row gap-1">
          Go to <div className="text-primary">My Profile</div> to check your
          item
        </div>
      </div>
    </CustomModal>
  );
};

export default ModalMintSuccess;
