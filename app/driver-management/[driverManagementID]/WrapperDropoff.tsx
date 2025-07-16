"use client";
import React from "react";
import useLocalStorageState from "use-local-storage-state";

const WrapperDropoff = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [show] = useLocalStorageState<number | null>("Select Vehicle", {
    defaultValue: null,
  });
  return (
    <div className={typeof show !== "number" ? "hidden" : "block"}>
      {children}
    </div>
  );
};

export default WrapperDropoff;
