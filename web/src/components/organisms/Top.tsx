import React from "react";

import TopPage from "@/components/molecules/TopPage";

import useHooks from "./hooks";

export type Props = {
  isLoggedIn: boolean;
};

const Top: React.FC<Props> = ({ isLoggedIn }) => {
  const { plugins } = useHooks();
  return <TopPage isLoggedIn={isLoggedIn} plugins={plugins} />;
};

export default Top;
