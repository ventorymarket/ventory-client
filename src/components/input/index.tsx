import React from "react";
import { Input } from "antd";
import IconSearch from "@/assets/icons/IconSearch";
import cx from "classnames";

interface ICustomInputProps {
  placeholder?: string;
  onChange?: any;
  className?: string;
  type?: string;
  iconSearch?: boolean;
  value?: any;
  pattern?: string;
  maxLength?: any;
}

const CustomInput = ({
  placeholder,
  onChange,
  className,
  type,
  iconSearch,
  value,
  ...rest
}: ICustomInputProps) => {
  return (
    <Input
      value={value}
      type={type || "text"}
      placeholder={placeholder}
      onChange={onChange}
      {...rest}
      prefix={iconSearch ? <IconSearch /> : null}
      className={cx("custom-text-input", className)}
    />
  );
};

export default CustomInput;
