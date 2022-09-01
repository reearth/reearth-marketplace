import React, { useState } from "react";

import { useAuth } from "@/auth/hooks";
import TopPage from "@/components/molecules/TopPage";

import useHooks from "./hooks";

export type Props = {};

const Top: React.FC<Props> = () => {
  const { isAuthenticated } = useAuth();
  const [searchText, updateSearchText] = useState<string>("");
  const handleSearch = (text: string) => {
    updateSearchText(text);
  };
  const { plugins } = useHooks(searchText);
  return <TopPage isLoggedIn={isAuthenticated} plugins={plugins} onSearch={handleSearch} />;
};

export default Top;
