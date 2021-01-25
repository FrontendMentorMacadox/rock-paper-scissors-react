import React from "react";
import { useGlobalContext } from "./context";

const Option = ({ icon, label, className, ...props }) => {
  return (
    <div className={`option ${className}`} {...props}>
      <div className='sheet'></div>
      <img src={icon} alt='' />
    </div>
  );
};

export default Option;
