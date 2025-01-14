import React from 'react';

const ShinyButton = ({ btnTxt, children, classNames, addType = 'button' }) => {
  return (
    <button
      className={`lg:h-12 md:h-11 h-10 ${classNames} w-full border-none bg-[linear-gradient(325deg,#0044ff_0%,#2ccfff_55%,#0044ff_90%)] bg-[280%_auto] px-6 py-2 font-medium text-white shadow-[0px_0px_20px_rgba(71,184,255,0.5),0px_5px_5px_-1px_rgba(58,125,233,0.25),inset_4px_4px_8px_rgba(175,230,255,0.5),inset_-4px_-4px_8px_rgba(19,95,216,0.35)] transition-[background] duration-700 hover:bg-right-top focus:outline-none focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus-visible:ring-2 dark:focus:ring-blue-500 dark:focus:ring-offset-black`}
      type={addType}
    >
      {btnTxt}
      {children}
    </button>
  );
};

export default ShinyButton;
