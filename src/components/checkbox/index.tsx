import { Checkbox, CheckboxProps } from "antd";
import React from "react";
import cx from "classnames";

const CustomCheckBox = ({
  children,
  value,
  className,
  ...props
}: CheckboxProps) => {
  return (
    <Checkbox
      value={value}
      {...props}
      className={cx("custom-ant-checkbox", className)}
    >
      {children}
    </Checkbox>
  );
};

export default CustomCheckBox;
