import React from "react";

export interface IModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalWidthSizes;
}

export enum ModalWidthSizes {
  small = "w-[150px]",
  medium = "w-[300px]",
  large = "w-[500px]",
  xlarge = "w-[800px]",
}

const Modal = (props: IModalProps) => {
  return (
    <div
      onClick={props.onClose}
      className={`fixed inset-0 flex justify-center items-center
      transition-colors ${props.open ? "visible bg-black/20" : "invisible"}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`bg-white relative rounded-xl shadow p-6 transition-all
        ${props.open ? "scale-100 opacity-100" : "scale-110 opacity 0"} ${
          props.size ? props.size : ModalWidthSizes.medium
        }`}
      >
        <button
          onClick={props.onClose}
          className="absolute top-1 right-1 w-5 h-5 p-1 text-[#f43f5e] rounded-md hover:bg-slate-300 flex justify-center items-center"
        >
          &times;
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
