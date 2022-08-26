import React from "react";

import Top from "@/components/organisms/Top";

export type Props = {};
const Root: React.FC<Props> = () => {
  const isLoggedIn = false;
  return <Top isLoggedIn={isLoggedIn} />;
};

export default Root;