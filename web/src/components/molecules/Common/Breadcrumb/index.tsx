import { Link } from "react-router-dom";

import Breadcrumb from "@marketplace/components/atoms/Breadcrumb";

export type Props = {
  rootLink: string;
  rootName: string;
  currentName: string;
};

const MarketplaceBreadCrumb: React.FC<Props> = ({ rootLink, rootName, currentName }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to={rootLink}>{rootName}</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{currentName}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default MarketplaceBreadCrumb;
