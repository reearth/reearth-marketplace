// import { useAuth } from "@marketplace/auth/hooks";
import TopPage from "@marketplace/components/molecules/TopPage";
// import { useState } from "react";

import useHooks from "./hooks";

export type Props = {
  showBanner?: boolean;
};

const Top: React.FC<Props> = ({ showBanner }) => {
  // const { isAuthenticated } = useAuth();
  // const [searchText, updateSearchText] = useState<string>("");
  // const handleSearch = (text: string) => {
  //   updateSearchText(text);
  // };
  // const { plugins } = useHooks(searchText);
  const { plugins } = useHooks();
  return <TopPage plugins={plugins} showBanner={showBanner} />;
};

export default Top;
