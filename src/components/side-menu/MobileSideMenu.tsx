import IconGallery from "@/assets/icons/IconGallery";
import IconGame from "@/assets/icons/IconGame";
import IconGameplay from "@/assets/icons/IconGameplay";
import IconHome from "@/assets/icons/IconHome";
import IconMenuDisabled from "@/assets/icons/IconMenuDisabled";
import IconRocket from "@/assets/icons/IconRocket";
import IconNetWork from "@/assets/icons/IconNetwork";
import { Divider } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

const LeftSideMenu = () => {
  const { pathname } = useRouter();

  const leftSideMenu = [
    {
      href: "/",
      icon: <IconHome active={pathname === "/"} />,
    },
    {
      href: "/explore",
      icon: <IconRocket active={pathname === "/explore"} />,
    },
    {
      href: "/play",
      icon: <IconGame active={pathname === "/play"} />,
    },
    {
      href: "/mint-nft",
      icon: <IconGallery active={pathname === "/mint-nft"} />,
    },
    {
      href: "/ranking",
      icon: <IconNetWork active={pathname === "/ranking"} />,
    },
  ];
  return (
    <div className="md:hidden z-[11] shadow-mobileMenu border-solid border rounded-[8px] border-[#1D2535] fixed bottom-[1rem] max-md:left-[50%] max-md:translate-x-[-50%]">
      <div className="bg-[#131924] p-[16px] rounded-[8px]">
        <div className="flex items-center gap-[16px]">
          {leftSideMenu.map((menu, index) => (
            <Link
              href={menu.href}
              className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                pathname === menu.href && "bg-[#0F131C]"
              }`}
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
