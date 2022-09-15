import Button from "@marketplace/components/atoms/Button";
import Dropdown from "@marketplace/components/atoms/Dropdown";
import Icon from "@marketplace/components/atoms/Icon";
import Menu, { MenuProps } from "@marketplace/components/atoms/Menu";
import Search from "@marketplace/components/atoms/Search";
import Space from "@marketplace/components/atoms/Space";
import { PluginSort } from "@marketplace/components/organisms/Top/hooks";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";
import { useState } from "react";

export type Props = {
  onSearch: (value: string) => void;
  isLoggedIn: boolean;
  isFavSelected: boolean;
  handleFavButtonClick: (isFaved: boolean) => void;
};

// const displayMenuItems: Array<{ label: string; key: number }> = [
//   {
//     label: "",
//     key: 1,
//   },
//   {
//     label: "",
//     key: 2,
//   },
// ];

const SearchArea: React.FC<Props> = ({
  onSearch,
  isLoggedIn,
  isFavSelected,
  handleFavButtonClick,
}) => {
  const t = useT();
  // TODO: onSearchへのソートの渡し方
  // const [displayMenuState, updateDisplayMenuState] = useState(1);
  const [_, updateOrderMenuState] = useState(1);

  // const handleDisplayMenuClick: MenuProps["onClick"] = (e) => {
  //   updateDisplayMenuState(Number(e.key));
  // };

  const handleOrderMenuClick: MenuProps["onClick"] = e => {
    updateOrderMenuState(Number(e.key));
  };

  // const displayMenu = <Menu onClick={handleDisplayMenuClick} items={displayMenuItems} />;

  const orderMenuItems: Array<{ label: string; key: number; value: PluginSort }> = [
    {
      label: t("Downloads Ascending"),
      key: 1,
      value: PluginSort.DownloadsAsc,
    },
    {
      label: t("Downloads Descending"),
      key: 2,
      value: PluginSort.DownloadsDesc,
    },
    {
      label: t("Name Ascending"),
      key: 3,
      value: PluginSort.NameAsc,
    },
    {
      label: t("Name Descending"),
      key: 4,
      value: PluginSort.NameDesc,
    },
    {
      label: t("Published Ascending"),
      key: 5,
      value: PluginSort.PublishedatAsc,
    },
    {
      label: t("Published Descending"),
      key: 6,
      value: PluginSort.PublishedatDesc,
    },
  ];
  const orderMenu = <Menu onClick={handleOrderMenuClick} items={orderMenuItems} />;

  return (
    <StyledSpace size={16}>
      <StyledSearch placeholder={t("search text")} allowClear onSearch={onSearch} />
      {/* TODO: implement this after tag function is coming */}
      {/* <Dropdown overlay={displayMenu}>
        <Button>
          <Space size="small">
            表示
            <Icon icon="downOutlined" />
          </Space>
        </Button>
      </Dropdown> */}
      <Dropdown overlay={orderMenu}>
        <StyledButton>
          {t("Order")}
          <Icon icon="downOutlined" style={{ fontSize: "8px" }} />
        </StyledButton>
      </Dropdown>
      {isLoggedIn ? (
        <StyledButton onClick={() => handleFavButtonClick(!isFavSelected)}>
          {t("Liked")}
          <Icon icon="heart" />
        </StyledButton>
      ) : null}
    </StyledSpace>
  );
};

const StyledSpace = styled(Space)`
  width: 100%;
  padding-bottom: 24px;
`;

const StyledSearch = styled(Search)`
  width: 432px;

  * {
    color: ${({ theme }) => theme.main.weakText};
    background: transparent;
  }

  :hover {
    background: transparent;
  }

  .ant-input-affix-wrapper,
  .ant-input-search-button {
    border: 1px solid ${({ theme }) => theme.main.border};
  }
`;

const StyledButton = styled(Button)`
  border-radius: 8px;
  color: ${({ theme }) => theme.main.weakText};
  font-weight: bold;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.main.border};

  :hover {
    background: transparent;
  }
`;

export default SearchArea;
