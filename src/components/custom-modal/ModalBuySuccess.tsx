import CustomModal from ".";
import { useState } from "react";
import { useVenom } from "@/contexts/useVenom";
import useProviderSigner from "@/contexts/useProviderSigner";
import CustomImage from "../custom-image";
import { useRouter } from "next/router";
import { formatWallet } from "@/utils";
import Link from "next/link";

interface IModalBuySuccess {
  open: boolean;
  onCancel: any;
  nft: any;
}
const ModalBuySuccess = ({ open, onCancel, nft }: IModalBuySuccess) => {
  const [loading, setLoading] = useState(false);
  const { account } = useVenom();
  const router = useRouter();
  const handleGotoProfile = () => {
    router.push(`/user/${account}`);
    onCancel();
  };
  return (
    <CustomModal
      title={<p className="text-center">Success</p>}
      open={open}
      onCancel={onCancel}
      destroyOnClose={true}
      loading={loading}
      width={500}
      okText="My Profile"
      onOk={handleGotoProfile}
    >
      <div>
        <div className="text-white flex flex-col items-center space-y-4 pb-4">
          <p className="text-secondary text-base">
            Your buying process was successfully completed!
          </p>
          <CustomImage
            src={nft?.imageUrl}
            alt="nft"
            className="rounded-lg w-full"
          />
          <div className="w-full flex flex-col gap-2 px-5 py-4 rounded-lg border border-solid border-stroke">
            <div className="flex items-center justify-between space-x-2">
              <span className="text-secondary text-lg font-medium">Item</span>
              <span className="text-white text-base font-medium">
                {nft?.title}
              </span>
            </div>
            <div className="flex items-center justify-between space-x-2">
              <span className="text-secondary text-lg font-medium">
                Address
              </span>
              <Link
                href={`/nft/${nft?.nftId}`}
                className="text-white text-base font-medium hover:text-primary"
              >
                {formatWallet(nft?.nftId)}
              </Link>
            </div>
          </div>
        </div>
        <div className="text-secondary text-base flex flex-row gap-1">
          Go to{" "}
          <Link href={`/user/${account}`} className="text-primary">
            My Profile
          </Link>{" "}
          to check your item
        </div>
      </div>
    </CustomModal>
  );
};

export default ModalBuySuccess;
