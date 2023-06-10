import IconGallery from "@/assets/icons/IconGallery";
import IconGame from "@/assets/icons/IconGame";
import IconGameplay from "@/assets/icons/IconGameplay";
import IconHome from "@/assets/icons/IconHome";
import IconMenuDisabled from "@/assets/icons/IconMenuDisabled";
import IconRocket from "@/assets/icons/IconRocket";
import { Divider } from "antd";
import Link from "next/link";
import React from "react";

const LeftSideMenu = () => {
  const leftSideMenu = [
    {
      href: "/",
      icon: <IconHome />,
    },
    {
      href: "/",
      icon: <IconRocket />,
    },
    {
      href: "/",
      icon: <IconGame />,
    },
    {
      href: "/mint-nft",
      icon: <IconGallery />,
    },
  ];
  return (
    <div className="sticky top-[164px] max-md:hidden">
      <div className="bg-layer-3 rounded-lg p-2 flex flex-col items-center">
        <div className="w-10 h-10 flex items-center justify-center">
          <IconMenuDisabled />
        </div>
        <Divider className="border-focus my-3" />
        <div className="flex flex-col space-y-2">
          {leftSideMenu.map((menu, index) => (
            <Link
              href={menu.href}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-layer-focus"
              key={index}
            >
              {menu.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSideMenu;
