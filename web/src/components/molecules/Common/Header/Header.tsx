import { useNavigate } from "react-router-dom";

import Col from "@marketplace/components/atoms/Col";
import Dropdown from "@marketplace/components/atoms/Dropdown";
import Icon from "@marketplace/components/atoms/Icon";
import Menu, { MenuProps } from "@marketplace/components/atoms/Menu";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import Tooltip from "@marketplace/components/atoms/Tooltip";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";

export type Lang = "en" | "ja" | "und";

export type Props = {
  username?: string;
  lang: Lang;
  isLoggedIn: boolean;
  // myUserId?: string;
  login?: () => void;
  logout?: () => void;
  onLangUpdate?: (lang: Lang) => Promise<void>;
};
const Header: React.FC<Props> = ({ username, lang, isLoggedIn, login, logout, onLangUpdate }) => {
  const t = useT();
  const navigate = useNavigate();

  const handleLangMenuClick: MenuProps["onClick"] = e => {
    onLangUpdate?.(e.key as Lang);
  };

  const DisplayLang = {
    und: t("Auto"),
    en: "English",
    ja: "日本語",
  };

  const langMenu = (
    <Menu
      theme="dark"
      onClick={handleLangMenuClick}
      items={[
        {
          label: DisplayLang["und"],
          key: "und",
        },
        {
          label: DisplayLang["en"],
          key: "en",
        },
        {
          label: DisplayLang["ja"],
          key: "ja",
        },
      ]}
    />
  );

  const userMenu = (
    <Menu
      theme="dark"
      items={[
        {
          label: t("My Page"),
          key: 1,
          icon: <Icon icon="user" style={{ paddingRight: "5px" }} />,
          onClick: () => navigate(`/mypage`),
        },
        {
          label: t("My Plugins"),
          key: 2,
          icon: <Icon icon="upload" style={{ paddingRight: "5px" }} />,
          onClick: () => navigate(`/myplugins`),
        },
        {
          label: t("Log Out"),
          key: 3,
          icon: <Icon icon="logout" style={{ paddingRight: "5px" }} />,
          onClick: logout,
        },
      ]}
    />
  );

  return (
    <Wrapper>
      <Row align="middle" style={{ height: "100%" }} justify="space-between">
        <Col>
          <Title onClick={() => navigate("/")}>{t("Re:Earth Marketplace")}</Title>
        </Col>
        <Col>
          <Space size="middle">
            {isLoggedIn && (
              <Tooltip placement="bottom" title={t("Upload new plugin")} mouseEnterDelay={0.5}>
                <div
                  style={{ padding: "10px", display: "flex", cursor: "pointer" }}
                  onClick={() => navigate("/myplugins/new")}>
                  <Icon icon="upload" style={{ fontSize: "20px" }} />
                </div>
              </Tooltip>
            )}
            {/* TODO: Dots Nine is needed? */}
            {/* <Button>
            <Space size="small">
              <Icon icon="" />
            </Space>
          </Button> */}
            <Dropdown overlay={langMenu} trigger={["click"]} placement="bottomCenter">
              <Space size="small" style={{ cursor: "pointer" }}>
                {DisplayLang[lang]}
                <Icon icon="downFilled" />
              </Space>
            </Dropdown>
            {isLoggedIn ? (
              <Dropdown overlay={userMenu} trigger={["click"]} placement="bottomCenter">
                <UserWrapper>
                  <NameIcon>{username?.charAt(0).toUpperCase()}</NameIcon>
                  <UserName>{username}</UserName>
                  <Icon icon="downFilled" />
                </UserWrapper>
              </Dropdown>
            ) : (
              <LoginWrapper onClick={login}>{t("Log in")}</LoginWrapper>
            )}
          </Space>
        </Col>
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background: #070707;
  color: #fff;
  padding: 0 20px;
  height: 48px;
`;

const Title = styled.h1`
  color: #df3013;
  font-size: 14px;
  cursor: pointer;
`;

const NameIcon = styled.div`
  height: 24px;
  width: 24px;
  background: #3f3d45;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const UserName = styled.p`
  margin: 0 10px;
`;

const LoginWrapper = styled.div`
  padding: 4px;
  display: flex;
  cursor: pointer;
`;

export default Header;
