import React from "react";
import CustomModal from ".";
import IconLoading from "@/assets/icons/IconLoading";

interface IModalWaitingProps {
  open?: boolean;
  onCancel?: any;
}

const ModalWaiting = ({ open, onCancel }: IModalWaitingProps) => {
  return (
    <CustomModal open={open} onCancel={onCancel} isProcessing={true}>
      <div className="flex flex-col items-center">
        <IconLoading />
        <p className="text-white text-base font-medium mt-4">
          Transfer in progress
        </p>
        <p className="text-secondary mt-1">
          Please wait, while we make final touches
        </p>
      </div>
    </CustomModal>
  );
};

export default ModalWaiting;
