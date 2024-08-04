import { useLocation, useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {location.pathname === "/board" ? (
        <span
          onClick={() => navigate(-1)}
          className="text-[#9333ea] w-8 h-8 rounded-md px-8 pb-3 hover:bg-[#e9d5ff] flex justify-center items-center text-6xl cursor-pointer absolute top-4 left-4"
        >
          &#8592;
        </span>
      ) : null}
    </>
  );
};

export default BackButton;
