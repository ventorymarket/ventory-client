import IconCart from "@/assets/icons/IconCart";
import IconNoti from "@/assets/icons/IconNoti";
import IconSetting from "@/assets/icons/IconSetting";
import IconUserDisabled from "@/assets/icons/IconUserDisabled";
import useShowModal from "@/hooks/useShowModal";
import { Divider } from "antd";
import DrawerCart from "../custom-drawer/DrawerCart";

const RightSideMenu = () => {
  const {
    showModal: showDrawerCart,
    onShow: onShowDrawerCart,
    onHide: onHideDrawerCart,
  } = useShowModal();
  const leftSideMenu = [
    {
      icon: <IconNoti />,
      href: "/",
    },
    {
      icon: <IconCart />,
      href: "/",
      onClick: onShowDrawerCart,
    },
    // {
    //   icon: <IconWallet />,
    //   href: "/",
    //   onClick: isAuthenticated ? onShowDrawerWallet : login,
    // },
    {
      icon: <IconSetting />,
      href: "/",
    },
  ];

  return (
    <div className="sticky top-[164px] max-md:hidden">
      <div className="bg-layer-3 rounded-lg p-2 flex flex-col items-center">
        <div className="w-10 h-10 flex items-center justify-center">
          <IconUserDisabled />
        </div>
        <Divider className="border-focus my-3" />
        <div className="flex flex-col space-y-2">
          {leftSideMenu.map((menu, index) => (
            <div
              // href={menu.href}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-layer-focus cursor-pointer"
              key={index}
              onClick={menu.onClick}
            >
              {menu.icon}
            </div>
          ))}
        </div>
        <DrawerCart open={showDrawerCart} onClose={onHideDrawerCart} />
      </div>
    </div>
  );
};

export default RightSideMenu;
