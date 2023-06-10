import React from "react";
import CustomDrawer from ".";
import { Button, Collapse } from "antd";
import IconArrowDown from "@/assets/icons/IconArrowDown";
import cx from "classnames";
import IconVerified from "@/assets/icons/IconVerified";
import CustomCheckBox from "../checkbox";
import CustomImage from "../custom-image";
import VenomToken from "../../../public/images/token/venom.png";
import Image from "next/image";
import IconTrash from "@/assets/icons/IconTrash";
import useAddToCard from "@/hooks/useAddToCart";
import Blank from "../../../public/images/blank.png";
import Link from "next/link";
const { Panel } = Collapse;

interface IDrawerCartProps {
  open?: boolean;
  onClose?: () => void;
}

const DrawerCart = ({ open, onClose }: IDrawerCartProps) => {
  const { items } = useAddToCard();
  const CartItem = () => {
    return (
      <div className="flex items-center justify-between space-x-2 py-2">
        <CustomImage
          src="/images/demo_nft.png"
          alt="nft"
          className="w-[50px] h-[50px] rounded-lg"
        />
        <div className="flex flex-col justify-between text-white flex-1">
          <span className="text-lg font-medium">Milady #4639</span>
          <div className="flex items-center space-x-1">
            <Image src={VenomToken} alt="token" />
            <span className="font-medium text-xs">18.87 VENOM</span>
          </div>
        </div>
        <Button className="btn-secondary w-12">
          <IconTrash />
        </Button>
      </div>
    );
  };

  return (
    <CustomDrawer
      open={open}
      onClose={onClose}
      title={
        <div className="flex flex-1 items-center pr-3">
          <div className="flex items-center flex-1 space-x-2">
            <h1 className="text-3xl font-semibold text-white">Cart</h1>
            {!!items?.length && (
              <div className="bg-error rounded text-white text-sm font-semibold w-6 h-6 flex justify-center items-center">
                6
              </div>
            )}
          </div>
          <span className="text-primary font-medium cursor-pointer">Reset</span>
        </div>
      }
    >
      <div className="flex flex-col justify-between h-full">
        {items?.length ? (
          <Collapse
            ghost
            expandIconPosition="end"
            className="w-full flex-1 overflow-y-auto rounded-none"
            expandIcon={({ isActive }) => (
              <IconArrowDown
                className={cx(
                  { "rotate-180": isActive },
                  "transition-all duration-300"
                )}
              />
            )}
          >
            <Panel
              header={
                <div className="flex items-center space-x-3">
                  <CustomCheckBox />
                  <div className="flex items-center space-x-2">
                    <IconVerified />
                    <span className="font-medium text-secondary text-sm">
                      Milady
                    </span>
                  </div>
                </div>
              }
              className="filter-header"
              key={1}
            >
              <div className="flex flex-col space-y-3">
                <CartItem />
                <CartItem />
                <CartItem />
              </div>
            </Panel>
            <Panel
              header={
                <div className="flex items-center space-x-3">
                  <CustomCheckBox />
                  <div className="flex items-center space-x-2">
                    <IconVerified />
                    <span className="font-medium text-secondary text-sm">
                      Milady
                    </span>
                  </div>
                </div>
              }
              className="filter-header"
              key={2}
            >
              <div className="flex flex-col space-y-3">
                <CartItem />
                <CartItem />
                <CartItem />
              </div>
            </Panel>
            <Panel
              header={
                <div className="flex items-center space-x-3">
                  <CustomCheckBox />
                  <div className="flex items-center space-x-2">
                    <IconVerified />
                    <span className="font-medium text-secondary text-sm">
                      Milady
                    </span>
                  </div>
                </div>
              }
              className="filter-header"
              key={3}
            >
              <div className="flex flex-col space-y-3">
                <CartItem />
                <CartItem />
                <CartItem />
              </div>
            </Panel>
          </Collapse>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1">
            <Image src={Blank} alt="Blank" />
            <p className="text-lg text-white font-semibold mt-6">
              Nothing in your Cart
            </p>
            <p className="text-secondary">
              To add any items, please go to{" "}
              <Link href="/explore" className="text-primary">
                Explore
              </Link>
            </p>
          </div>
        )}
        {items?.length ? (
          <div className="space-y-3 mt-4">
            <div className="bg-layer-3 rounded-lg flex justify-between items-center py-4 px-5 text-white font-medium">
              <span>Total Price</span>
              <div className="flex items-center space-x-2">
                <Image src={VenomToken} alt="token" />
                <span>232 VENOM</span>
              </div>
            </div>
            <Button className="btn-primary w-full">Buy Now</Button>
          </div>
        ) : null}
      </div>
    </CustomDrawer>
  );
};

export default DrawerCart;
