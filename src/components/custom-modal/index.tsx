import { Button, Modal, ModalProps } from "antd";
import React from "react";
import cx from "classnames";

interface ICustomModalProps extends ModalProps {
  isProcessing?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const CustomModal = ({
  title,
  className,
  children,
  cancelText = "Cancel",
  okText = "Confirm",
  width = 435,
  onCancel,
  open,
  isProcessing = false,
  onOk,
  loading,
  disabled = false,
  ...rest
}: ICustomModalProps) => {
  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      closable={false}
      width={width}
      className={cx("custom-modal", className)}
      {...rest}
    >
      <div className="w-full p-8">
        {!isProcessing && (
          <h4 className="text-xl text-white font-medium mb-4">{title}</h4>
        )}
        {children}
        {!isProcessing && (
          <div className="mt-5 flex items-center space-x-2">
            <Button
              className="btn-secondary basis-1/2"
              onClick={onCancel as any}
            >
              {cancelText}
            </Button>
            <Button
              disabled={disabled}
              loading={loading}
              onClick={onOk as any}
              className="btn-primary basis-1/2"
            >
              {okText}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CustomModal;
