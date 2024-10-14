import React, { useState } from "react";
import { imgData } from "../App";

const Activate = () => {
  const query = new URLSearchParams(window.location.search);
  const data = query.get("data");
  const handleVisa = (idx) => {
    const company = imgData[idx];
    const finalData = { ...JSON.parse(data), companyData: company };
    return (window.location.href = `/confirm?data=${JSON.stringify(
      finalData
    )}`);
  };
  const [choice, setChoice] = useState(JSON.parse(data).tameenFor);
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-5 pt-3">
      <div className="w-fit flex items-center justify-center">
        <span
          className={`  px-8 py-2 rounded-l-lg ${
            choice === "ضد الغير"
              ? "bg-blue-500 text-white cursor-pointer"
              : "text-black bg-gray-300 cursor-pointer"
          }`}
          onClick={() => setChoice("ضد الغير")}
        >
          ضد الغير
        </span>
        <span
          className={` px-8 py-2 rounded-r-lg ${
            choice === "شامل"
              ? "bg-blue-500 text-white cursor-pointer"
              : "bg-gray-300 text-black cursor-pointer"
          }`}
          onClick={() => setChoice("شامل")}
        >
          شامل
        </span>
      </div>
      {imgData.map((imgSrc, i) => {
        return (
          <img
            src={imgSrc.src}
            alt="activate"
            className="p-2 cursor-pointer border shadow-lg rounded-lg"
            onClick={() => handleVisa(i)}
          />
        );
      })}
    </div>
  );
};

export default Activate;
