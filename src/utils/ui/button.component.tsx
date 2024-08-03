import React from "react";

export interface IButtonProps {
  name: string;
  label: string;
  classNames?: string;
  onClick: () => void;
}

const Button = (props: IButtonProps) => {
  return (
    <>
      <button
        key={props.name}
        onClick={props.onClick}
        name={props.name}
        className={`px-4 py-2 rounded-md bg-[#d8b4fe] text-slate-700 hover:bg-[#9333ea] hover:text-white active:bg-[#d8b4fe] active:text-slate-700 ${props.classNames}`}
      >
        {props.label}
      </button>
    </>
  );
};

export default Button;
