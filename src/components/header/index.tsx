import IconArrowDown from "@/assets/icons/IconArrowDown";
import { useVenom } from "@/contexts/useVenom";
import { formatWallet } from "@/utils";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import DefaultAvatar from "../../../public/images/default_avatar.png";
import Logo from "../../../public/images/logo/logo.png";
import VenomToken from "../../../public/images/token/venom.png";
import CustomInput from "../input";
import cx from "classnames";
import { useRouter } from "next/router";
import MobileLogo from "../../../public/images/logo/logo_footer.png";
import IconHamburger from "@/assets/icons/IconHamburger";
import IconSearch from "@/assets/icons/IconSearch";
import IconCart from "@/assets/icons/IconCart";
import type { DrawerProps, RadioChangeEvent } from "antd";
import { Drawer, Radio, Space } from "antd";
import { useState } from "react";
import IconNoti from "@/assets/icons/IconNoti";
import IconWallet from "@/assets/icons/IconWallet";
import IconSetting from "@/assets/icons/IconSetting";
import DrawerWallet from "../custom-drawer/DrawerWallet";
import useShowModal from "@/hooks/useShowModal";

const Header = () => {
  const { account, login, isConnected } = useVenom();
  const {
    showModal: showDrawerWallet,
    onShow: onShowDrawerWallet,
    onHide: onHideDrawerWallet,
  } = useShowModal();
  const router = useRouter();
  const menus = [
    {
      href: "/",
      name: "Marketplace",
    },
    {
      href: "/explore",
      name: "Explore",
    },
    {
      href: "/ranking",
      name: "Ranking",
    },
  ];

  /* Drawer */
  const [open, setOpen] = useState(false);

  /* End Drawer */

  return (
    <div className="md:layout sticky top-0 z-50 bg-layer-1">
      <Drawer
        title={
          !isConnected ? (
            <Button
              onClick={login}
              className="btn-primary w-full text-[16px] text-[#0F131C] h-[2.5rem]"
            >
              Connect Wallet
            </Button>
          ) : (
            <div className="bg-layer-1 rounded-lg flex items-center p-2 space-x-2">
              <Image src={DefaultAvatar} alt="Avatar" width={24} height={24} />
              <span className="text-white font-medium">
                {formatWallet(account)}
              </span>
            </div>
          )
        }
        placement={"left"}
        closable={false}
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        key={0}
        className="drawer_custom text-[#94A7C6] text-[16px] font-[600]"
      >
        <ul className="flex flex-col gap-[1.5rem]">
          <li className="flex gap-[0.5rem]">
            <IconNoti />
            <p>Notification</p>
          </li>
          <li className="flex gap-[0.5rem]">
            <IconWallet />
            <p>Wallet</p>
          </li>
          <li className="flex gap-[0.5rem]">
            <IconSetting />
            <p>Settings</p>
          </li>
        </ul>
      </Drawer>
      <div className="w-full py-5 max-md:p-[16px] max-md:bg-[#131924]">
        {/* PC Design */}
        <div className="grid grid-cols-3 max-md:hidden">
          <Link href="/" className="cursor-pointer">
            <Image src={Logo} alt="Logo" />
          </Link>
          <div className="">
            <CustomInput
              iconSearch
              placeholder="Search..."
              className="w-full"
            />
          </div>
          <div className="bg-layer-3 rounded-lg p-2 flex items-center space-x-3 justify-self-end">
            <div className="flex items-center space-x-2 border-r border-solid border-focus pr-2">
              <Image src={VenomToken} alt="Venom" />
              <span className="text-white font-medium leading-6">VENOM</span>
              <IconArrowDown />
            </div>
            {!isConnected && (
              <Button className="btn-primary h-10" onClick={login}>
                Connect Wallet
              </Button>
            )}
            {isConnected && (
              <div
                className="bg-layer-1 rounded-lg flex items-center p-2 space-x-2 cursor-pointer"
                onClick={onShowDrawerWallet}
              >
                <Image
                  src={DefaultAvatar}
                  alt="Avatar"
                  width={24}
                  height={24}
                />
                <span className="text-white font-medium">
                  {formatWallet(account)}
                </span>
              </div>
            )}
          </div>
        </div>
        {/* End Pc Design */}

        {/* Mobile Design */}
        <div className="md:hidden flex justify-between">
          <div className="flex gap-[0.5rem]">
            <IconHamburger
              onClick={() => {
                setOpen(true);
              }}
            />
            <Link href="/" className="cursor-pointer">
              <Image
                className="w-[141px] h-[40px]"
                src={MobileLogo}
                alt="Logo"
              />
            </Link>
          </div>

          <div className="flex items-center gap-[1rem]">
            <IconSearch />
            <IconCart />
          </div>
        </div>
        {/* End Mobile Design */}
      </div>
      <div className="flex items-center justify-center space-x-3 pb-4 pt-1 md:pb-5">
        {menus.map((menu, index) => (
          <Link
            href={menu.href}
            key={index}
            className={cx(
              "text-secondary font-semibold p-[10px] text-base hover:text-primary",
              {
                "rounded-lg !text-primary": menu.href === router.pathname,
              }
            )}
          >
            {menu.name}
          </Link>
        ))}
      </div>
      <DrawerWallet open={showDrawerWallet} onClose={onHideDrawerWallet} />
    </div>
  );
};

export default Header;
