import React from "react";

import TopPage from "@/components/molecules/TopPage";

export type Props = {
  isLoggedIn: boolean;
};
const Top: React.FC<Props> = ({ isLoggedIn }) => {
  return <TopPage isLoggedIn={isLoggedIn} />;
};

export default Top;
