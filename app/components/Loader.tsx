import React from "react";

interface LoaderProps {
  textCSS?: string;
}

const Loader = ({ textCSS }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className={"spinner-color"}></div>
      <div className={"text-sm text-[#6a67af]"}>Loading...</div>
    </div>
  );
};

export default Loader;
