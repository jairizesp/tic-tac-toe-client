export interface IBoxProps {
  value: number;
  click: () => void;
}

const Box = (props: IBoxProps) => {
  return (
    <div
      className="flex justify-center items-center cursor-pointer border
       border-slate-400 w-[100px] h-[100px]
       [&:nth-child(1)]:border-r-0 [&:nth-child(2)]:border-r-0 text-sm
       hover:bg-[#d946ef] hover:text-white"
      onClick={props.click}
    >
      {props.value}
    </div>
  );
};

export default Box;
