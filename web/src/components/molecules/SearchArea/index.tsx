import styled from "@emotion/styled";
import { useState } from "react";

import Button from "@/components/atoms/Button";
import Space from "@/components/atoms/Space";
import Icon from "@/components/atoms/Icon";
import Search from "@/components/atoms/Search";
import Dropdown from "@/components/atoms/Dropdown";
import Menu, { MenuProps } from "@/components/atoms/Menu";

export type Props = {
  onSearch: (value: string) => void;
};

const SearchArea: React.FC<Props> = ({ onSearch }) => {
  const [displayMenuState, updateDisplayMenuState] = useState(1);
  const [orderMenuState, updateOrderMenuState] = useState(1);

  const handleDisplayMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
    updateDisplayMenuState(Number(e.key));
  };

  const handleOrderMenuClick: MenuProps["onClick"] = (e) => {
    console.log("click", e);
    updateOrderMenuState(Number(e.key));
  };
  const displayMenu = (
    <Menu
      onClick={handleDisplayMenuClick}
      items={[
        {
          label: "",
          key: 1,
        },
        {
          label: "",
          key: 2,
        },
      ]}
    />
  );
  const orderMenu = (
    <Menu
      onClick={handleOrderMenuClick}
      items={[
        {
          label: "名前降順",
          key: 1,
        },
        {
          label: "",
          key: 2,
        },
      ]}
    />
  );

  return (
    <StyledSpace size={16}>
      <StyledSearch placeholder="search text" allowClear onSearch={onSearch} />
      <Dropdown overlay={displayMenu}>
        <Button>
          <Space size="small">
            表示
            <Icon icon="downOutlined" />
          </Space>
        </Button>
      </Dropdown>
      <Dropdown overlay={orderMenu}>
        <Button>
          <Space size="small">
            順番
            <Icon icon="downOutlined" />
          </Space>
        </Button>
      </Dropdown>
      <Button>
        <Space size="small">
          お気に入り
          <Icon icon="heart" />
        </Space>
      </Button>
    </StyledSpace>
  );
};

const StyledSpace = styled(Space)`
  width: 100%;
  padding-bottom: 24px;
`;

const StyledSearch = styled(Search)`
  max-width: 432px;
`;

export default SearchArea;
