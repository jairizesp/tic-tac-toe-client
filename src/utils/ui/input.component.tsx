import React, { ChangeEvent } from "react";

export interface InputProps {
  placeholder: string;
  type: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  classNames?: string;
}

const Input = (props: InputProps) => {
  return (
    <>
      <input
        className={
          `w-full border border-slate-300 rounded-md p-4 text-xs outline-none focus:outline-none` +
          props.classNames
        }
        autoComplete="off"
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        name={props.name}
      />
    </>
  );
};

export default Input;
