import styled from "@emotion/styled";

import HeaderBanner from "@/assets/header.png";
import Breadcrumb from "@/components/atoms/Breadcrumb";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Image from "@/components/atoms/Image";
import Space from "@/components/atoms/Space";
import PluginsList from "@/components/molecules/PluginsList";

export type Props = {};
const UserPageContents: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Breadcrumb
        style={{
          paddingBottom: "24px",
        }}
      >
        <Breadcrumb.Item>
          <a href="/">Top</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Developer</Breadcrumb.Item>
      </Breadcrumb>
      <HeaderBannerSpace>
        <Image src={HeaderBanner} preview={false} />
        <UserIcon>
          <UserInitial>D</UserInitial>
        </UserIcon>
      </HeaderBannerSpace>
      <DeveloperInfo size="small" direction="vertical">
        <Title>Re: Earth Team</Title>
        <Description>
          Descriptions are here.Descriptions are here.Descriptions are
          here.Descriptions are here.Descriptions are here.Descriptions are
          here.
        </Description>
        <AdditionalInfo>
          <Button
            type="link"
            size="middle"
            href=""
            style={{ color: "rgba(0, 0, 0, 0.45)", padding: 0 }}
          >
            <Icon icon="desktop" />
            https://hoge.com
          </Button>
        </AdditionalInfo>
        <AdditionalInfo>
          <Button
            type="link"
            size="middle"
            href=""
            style={{ color: "rgba(0, 0, 0, 0.45)", padding: 0 }}
          >
            <Icon icon="email" />
            https://hoge.com
          </Button>
        </AdditionalInfo>
      </DeveloperInfo>
      <MyPlugins>
        <PluginsList />
      </MyPlugins>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 48px;
  padding-bottom: 72px;
`;

const HeaderBannerSpace = styled.div`
  width: 100%;
`;

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
`;

const Description = styled.p`
  max-width: 445px;
`;

const AdditionalInfo = styled.div``;

const MyPlugins = styled.div``;

export default UserPageContents;
