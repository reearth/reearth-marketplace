import Top from "@marketplace/components/organisms/Top";
import React from "react";

export type Props = {
  showBanner?: boolean;
};
const Root: React.FC<Props> = ({ showBanner }) => {
  return <Top showBanner={showBanner} />;
};

export default Root;
