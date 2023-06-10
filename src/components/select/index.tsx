import React from "react";
import { Select, SelectProps } from "antd";
import cx from "classnames";
import IconArrowDown from "@/assets/icons/IconArrowDown";

const CustomSelect = ({ className, ...rest }: SelectProps) => {
  return (
    <Select
      className={cx("custom-select", className)}
      suffixIcon={<IconArrowDown />}
      bordered={false}
      popupClassName="custom-popup"
      {...rest}
    />
  );
};

export default CustomSelect;
