import HeaderBanner from "@marketplace/assets/header.png";
import Breadcrumb from "@marketplace/components/atoms/Breadcrumb";
// import Button from "@marketplace/components/atoms/Button";
// import Icon from "@marketplace/components/atoms/Icon";
import Image from "@marketplace/components/atoms/Image";
import Space from "@marketplace/components/atoms/Space";
import PluginsList from "@marketplace/components/molecules/PluginsList";
import type { MyDataType, Plugin } from "@marketplace/components/organisms/User";
import { styled } from "@marketplace/theme";
import { Link } from "react-router-dom";

export type Props = {
  myData?: MyDataType;
  plugins?: Plugin[];
  onPluginSelect?: (pluginId: string) => void;
};

const UserPageContents: React.FC<Props> = ({ myData, plugins, onPluginSelect }) => {
  return (
    <Wrapper>
      <InnerWrapper>
        <Breadcrumb
          style={{
            paddingBottom: "24px",
          }}>
          <Breadcrumb.Item>
            <StyledLink to="/">Top</StyledLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{myData ? myData.displayName : ""}</Breadcrumb.Item>
        </Breadcrumb>
        <HeaderBannerSpace>
          <Image src={HeaderBanner} preview={false} />
          <UserIcon>
            <UserInitial>
              {myData?.displayName ? myData.displayName.substring(0, 1).toUpperCase() : ""}
            </UserInitial>
          </UserIcon>
        </HeaderBannerSpace>
        <DeveloperInfo size="small" direction="vertical">
          <Title>{myData ? myData.displayName : ""}</Title>
          <Description>{myData ? myData.description : ""}</Description>
          {/* <AdditionalInfo>
            <StyledButton type="link" size="middle" href="">
              <Icon icon="desktop" />
              https://hoge.com
            </StyledButton>
          </AdditionalInfo>
          <AdditionalInfo>
            <StyledButton type="link" size="middle" href="">
              <Icon icon="email" />
              https://hoge.com
            </StyledButton>
          </AdditionalInfo> */}
        </DeveloperInfo>
        <MyPlugins>
          <PluginsList plugins={plugins ? plugins : undefined} onPluginSelect={onPluginSelect} />
        </MyPlugins>
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${({ theme }) => theme.main.background};
`;

const InnerWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 48px;
  padding-bottom: 72px;
  color: ${({ theme }) => theme.main.text};

  .ant-breadcrumb-separator,
  .ant-breadcrumb-link,
  .ant-breadcrumb li a {
    color: ${({ theme }) => theme.main.text};
    :hover {
      color: ${({ theme }) => theme.main.weakText};
    }
  }
`;

const HeaderBannerSpace = styled.div`
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

// const StyledButton = styled(Button)`
//   color: ${({ theme }) => theme.main.weakText};
//   padding: 0;
// `;

const UserIcon = styled.div`
  width: 110px;
  height: 110px;
  background: #3f3d45;
  border-radius: 50%;
  position: relative;
  display: flex;
  border: solid 5px #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  margin-top: -70px;
  margin-left: 82px;
`;

const UserInitial = styled.p`
  color: #fff;
  font-weight: bold;
  font-size: 28px;
  align-self: center;
  justify-self: center;
  width: 100%;
  text-align: center;
  margin: 0;
`;

const DeveloperInfo = styled(Space)`
  width: 100%;
  margin-top: 32px;
  padding-left: 82px;
  margin-bottom: 100px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.main.text};
`;

const Description = styled.p`
  max-width: 445px;
`;

// const AdditionalInfo = styled.div``;

const MyPlugins = styled.div``;

export default UserPageContents;
