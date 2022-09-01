import styled from "@emotion/styled";
import Breadcrumb from "@marketplace/components/atoms/Breadcrumb";
import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Divider from "@marketplace/components/atoms/Divider";
import Icon from "@marketplace/components/atoms/Icon";
import Image from "@marketplace/components/atoms/Image";
import Layout, { Sider, Content } from "@marketplace/components/atoms/Layout";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import Tabs, { TabPane } from "@marketplace/components/atoms/Tabs";

export type Props = {
  pluginName: string;
  developerLink: string;
  version: string;
  publishedDate: string;
};
const PluginDetailContent: React.FC<Props> = ({
  pluginName,
  developerLink,
  version,
  publishedDate,
}) => {
  const onTabsChange = () => {};
  return (
    <Wrapper>
      <Breadcrumb
        style={{
          paddingBottom: "24px",
        }}>
        <Breadcrumb.Item>
          <a href="/">Top</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{pluginName}</Breadcrumb.Item>
      </Breadcrumb>
      <Layout hasSider style={{ minHeight: "400px", width: "66.6%", maxWidth: "800px" }}>
        <Content style={{ height: "1000px", width: "100%" }}>
          <Image
            width="100%"
            height="auto"
            src="error"
            fallback="data:image/png;base64,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"
          />
          <PluginDocs>
            <Tabs defaultActiveKey="1" onChange={onTabsChange}>
              <TabPane tab="Readme" key="1">
                Readme
              </TabPane>
              <TabPane tab="Change log" key="2">
                Change log
              </TabPane>
            </Tabs>
          </PluginDocs>
        </Content>
        <Sider
          theme="light"
          reverseArrow
          width="33.3%"
          style={{
            overflow: "auto",
            position: "fixed",
            right: 0,
            maxWidth: "400px",
            padding: "0 24px",
          }}>
          <Title>{pluginName}Test</Title>
          <LikesDownloaded justify="end">
            <Space>
              <Col>
                <Icon icon="heart" />
                {/* TODO: number from API */}
                100
              </Col>
              <Col>
                <Icon icon="arrowDown" />
                {/* TODO: number from API */}
                100
              </Col>
            </Space>
          </LikesDownloaded>
          <Divider style={{ margin: "24px 0" }} />
          <ActionButtons justify="space-between" wrap={false}>
            <Col flex="none" style={{ marginRight: "12px" }}>
              <Button type="primary" size="large" ghost>
                <Icon icon="heart" />
              </Button>
            </Col>
            <Col flex="auto">
              <Button type="primary" size="large" block>
                <Icon icon="logout" />
                Open Plugin in your project
              </Button>
            </Col>
          </ActionButtons>
          <Description>Description</Description>
          <PluginInfo align="middle" justify="space-between">
            <Col>Developer</Col>
            <Col>
              <Button type="link">{developerLink}Link</Button>
            </Col>
          </PluginInfo>
          <PluginInfo>
            <Col>Version</Col>
            <Col>{version}</Col>
          </PluginInfo>
          <PluginInfo>
            <Col>Publish date</Col>
            <Col>{publishedDate}</Col>
          </PluginInfo>
          <Button type="link" size="middle" style={{ padding: 0, marginTop: 12 }} danger>
            <Row align="bottom" justify="space-between" wrap={false}>
              <Col>Report this plugin</Col>
              <Col span={4}>
                <Icon icon="exclamation" />
              </Col>
            </Row>
          </Button>
        </Sider>
      </Layout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 24px;
  padding-bottom: 48px;
  min-height: 400px;
  width: 100%;
`;

const PluginDocs = styled.div``;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

const LikesDownloaded = styled(Row)``;

const ActionButtons = styled(Row)``;

const Description = styled.p`
  margin: 24px 0;
  font-size: 16px;
`;

const PluginInfo = styled(Row)`
  margin-top: 12px;
  font-size: 16px;
`;

export default PluginDetailContent;
