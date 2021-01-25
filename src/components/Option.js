import React from "react";

const Option = ({ icon, label, className, ...props }) => {
  console.log('im displaying: ', icon)
  return (
    <div className={`option ${className}`} {...props}>
      <div className='sheet'></div>
      <img src={icon} alt='' />
    </div>
  );
};

export default Option;
