import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Icon from "@marketplace/components/atoms/Icon";
import Row from "@marketplace/components/atoms/Row";
import { styled } from "@marketplace/theme";
import { useNavigate } from "react-router-dom";

import MyPluginsTable from "./MyPluginsTable";
import type { Plugin } from "@marketplace/components/organisms/MyPlugins";

export type Props = {
  plugins?: Plugin[];
  handlePublishClick: (id: string, active: boolean) => void;
};

const MyPluginsPage: React.FC<Props> = ({ plugins, handlePublishClick }) => {
  const navigate = useNavigate();
  console.log(plugins);
  return (
    <Wrapper>
      <TitleArea justify="space-between" align="middle">
        <Col>
          <Title>My Plugins</Title>
        </Col>
        <Col>
          <Button type="primary" onClick={() => navigate("/myplugins/new")}>
            <Icon icon="plus" />
            New Plugin
          </Button>
        </Col>
      </TitleArea>
      <MyPluginsTable data={plugins} handlePublishClick={handlePublishClick} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 48px;
  padding-bottom: 72px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 20px;
`;

const TitleArea = styled(Row)`
  margin-bottom: 24px;
`;

export default MyPluginsPage;
