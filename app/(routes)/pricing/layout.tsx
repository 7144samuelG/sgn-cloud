import NavBar from "@/app/(marketing)/_components/navbar";
import React from "react";

const PricingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default PricingLayout;
