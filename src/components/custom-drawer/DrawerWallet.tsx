import IconBookmarkOutline from "@/assets/icons/IconBookmarkOutline";
import IconPersonOutline from "@/assets/icons/IconPersonOutline";
import IconPieOutline from "@/assets/icons/IconPieOutline";
import IconSettingOutline from "@/assets/icons/IconSettingOutline";
import IconTrophyOutline from "@/assets/icons/IconTrophyOutline";
import IconWalletOutline from "@/assets/icons/IconWalletOutline";
import CustomDrawer from ".";
import IconArrowForward from "@/assets/icons/IconArrowForward";
import { useVenom } from "@/contexts/useVenom";
import { formatWallet } from "@/utils";
import IconCopy from "@/assets/icons/IconCopy";
import { Button, Tooltip } from "antd";
import IconOff from "@/assets/icons/IconOff";
import Image from "next/image";
import CustomImage from "../custom-image";
import Venom from "../../../public/images/venom.png";
import VenomToken from "../../../public/images/token/venom.png";
import Link from "next/link";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

interface IDrawerWalletProps {
  open?: boolean;
  onClose?: () => void;
}

const DrawerWallet = ({ open, onClose }: IDrawerWalletProps) => {
  const { account, logout, balance } = useVenom();
  const [copiedValue, copy] = useCopyToClipboard();
  const menus = [
    {
      icon: <IconPersonOutline />,
      name: "My Profile",
      href: `/user/${account}`,
    },
    {
      icon: <IconBookmarkOutline />,
      name: "Watchlist",
      href: "/",
    },
    {
      icon: <IconTrophyOutline />,
      name: "Rewards",
      href: "/",
    },
    {
      icon: <IconPieOutline />,
      name: "Portfolio",
      href: "/",
    },
    {
      icon: <IconSettingOutline />,
      name: "Setting",
      href: "/",
    },
  ];
  return (
    <CustomDrawer title="My Wallet" open={open} onClose={onClose}>
      <div className="flex flex-col items-start justify-between h-full">
        <div className="flex items-center space-x-4">
          <CustomImage
            src="/images/default_avatar.png"
            className="rounded-full"
            alt="avatar"
            width={60}
            height={60}
          />
          <div className="flex flex-col items-start">
            <span className="text-white text-xl font-semibold">Daniel</span>
            <div className="flex items-center space-x-3">
              <span className="text-secondary font-medium">
                {formatWallet(account)}
              </span>
              <Tooltip title="Copied" placement="right" trigger={["click"]}>
                <IconCopy
                  className="cursor-pointer "
                  onClick={(e) => copy(account)}
                />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="w-full mt-5 space-y-2 flex-1">
          {menus.map((menu, index) => (
            <Link
              className="flex items-center justify-between space-x-3 w-full px-2 py-3 rounded-lg cursor-pointer hover:bg-layer-3"
              key={index}
              href={menu.href}
              onClick={onClose}
            >
              {menu.icon}
              <span className="flex-1 text-secondary text-lg font-medium">
                {menu.name}
              </span>
              <IconArrowForward />
            </Link>
          ))}
        </div>
        <div className="w-full">
          <h4 className="text-xl text-white font-semibold">Connected Wallet</h4>
          <div className="rounded-lg border border-solid border-stroke p-4 mt-5 w-full">
            <div className="flex items-center space-x-2 justify-between">
              <Image src={Venom} alt="Venom" />
              <div className="flex-1">
                <span className="text-secondary">Venom</span>
                <div className="flex items-center space-x-3">
                  <span className="text-white font-medium">
                    {formatWallet(account)}
                  </span>
                  <Tooltip title="Copied" placement="right" trigger={["click"]}>
                    <IconCopy
                      className="cursor-pointer"
                      onClick={(e) => copy(account)}
                    />
                  </Tooltip>
                </div>
              </div>
              <Button
                className="w-12 btn-secondary"
                onClick={() => {
                  logout();
                  onClose && onClose();
                }}
              >
                <IconOff />
              </Button>
            </div>
            <div className="rounded-lg bg-layer-1 p-4 flex items-center space-x-1 mt-3">
              <Image src={VenomToken} alt="token" />
              <span className="text-white font-medium">{balance} VENOM</span>
            </div>
            <div className="flex space-x-2 mt-3">
              <Button className="btn-secondary basis-1/2">Swap VENOM</Button>
              <Button className="btn-secondary basis-1/2">Add funds</Button>
            </div>
          </div>
        </div>
      </div>
    </CustomDrawer>
  );
};

export default DrawerWallet;
