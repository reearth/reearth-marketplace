import styled from "@emotion/styled";
import { useAuth } from "@marketplace/auth/hooks";
import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Dropdown from "@marketplace/components/atoms/Dropdown";
import Icon from "@marketplace/components/atoms/Icon";
import Menu, { MenuProps } from "@marketplace/components/atoms/Menu";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import React from "react";
import { useNavigate } from "react-router-dom";

export type Props = {
  isLoggedIn: boolean;
  myUserId?: string;
};
const Header: React.FC<Props> = ({ isLoggedIn, myUserId }) => {
  const navigate = useNavigate();
  // const [currentLang, updateLang] = useState<string>();
  // const handleLangMenuClick: MenuProps["onClick"] = (e) => {
  //   updateLang(e.key);
  // };
  const handleUserMenuClick: MenuProps["onClick"] = () => {};

  const { login, logout } = useAuth();
  // const langMenu = (
  //   <Menu
  //     theme="dark"
  //     onClick={handleLangMenuClick}
  //     items={[
  //       {
  //         label: "En",
  //         key: 1,
  //       },
  //       {
  //         label: "Ja",
  //         key: 2,
  //       },
  //     ]}
  //   />
  // );
  const userMenu = isLoggedIn ? (
    <Menu
      theme="dark"
      onClick={handleUserMenuClick}
      items={[
        {
          label: "Profile",
          key: 1,
          icon: <Icon icon="user" style={{ paddingRight: "5px" }} />,
          onClick: () => navigate(`/${myUserId}`),
        },
        {
          label: "My Plugins",
          key: 2,
          icon: <Icon icon="upload" style={{ paddingRight: "5px" }} />,
          onClick: () => navigate(`/myplugins`),
        },
        {
          label: "Log Out",
          key: 3,
          icon: <Icon icon="logout" style={{ paddingRight: "5px" }} />,
          onClick: logout,
        },
      ]}
    />
  ) : (
    <Menu
      theme="dark"
      onClick={handleUserMenuClick}
      items={[
        {
          label: "Log In",
          key: 1,
          icon: <Icon icon="user" style={{ paddingRight: "5px" }} />,
          onClick: login,
        },
      ]}
    />
  );
  return (
    <Wrapper>
      <Row align="middle" style={{ height: "100%" }} justify="space-between">
        <Col>
          <Title onClick={() => navigate("/")}>Re: Earth Marketplace</Title>
        </Col>
        <Col>
          <Space size="middle">
            <Button type="link" size="large" onClick={() => navigate("/myplugins/new")}>
              <Icon icon="upload" />
            </Button>
            {/* TODO: Dots Nine is needed? */}
            {/* <Button>
            <Space size="small">
              <Icon icon="" />
            </Space>
          </Button> */}
            {/* TODO: Lang support */}
            {/* <Dropdown overlay={langMenu}>
              <Space size="small">
                {currentLang}
                <Icon icon="downFilled" />
              </Space>
            </Dropdown> */}
            {/* TODO: isLoggedIn */}
            <Dropdown overlay={userMenu}>
              {/* TODO: User Icon */}
              <Space size="small" style={{ cursor: "pointer" }}>
                {/* TODO: User Name */}
                User
                <Icon icon="downFilled" />
              </Space>
            </Dropdown>
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

export default Header;
