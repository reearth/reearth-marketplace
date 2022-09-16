import NoPluginCover from "@marketplace/assets/noPluginCover.png";
import Breadcrumb from "@marketplace/components/atoms/Breadcrumb";
import Button from "@marketplace/components/atoms/Button";
import Carousel from "@marketplace/components/atoms/Carousel";
import Col from "@marketplace/components/atoms/Col";
import Divider from "@marketplace/components/atoms/Divider";
import Icon from "@marketplace/components/atoms/Icon";
import Image from "@marketplace/components/atoms/Image";
import Layout from "@marketplace/components/atoms/Layout";
import Loading from "@marketplace/components/atoms/Loading";
import Markdown from "@marketplace/components/atoms/Markdown";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import Tabs, { TabPane } from "@marketplace/components/atoms/Tabs";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";
import { useMemo } from "react";

export type { Workspace, Project } from "./ModalContent";

export type Props = {
  plugin?: {
    id: string;
    name: string;
    cover: string;
    author: string;
    like: number;
    images: string[];
    description: string;
    readme: string;
    liked: boolean;
    version: string | undefined;
    downloads: number;
    updatedAt: Date;
    installed: boolean | undefined;
  };
  isLoggedIn: boolean;
  handleClickLike: (isLiked: boolean) => void;
  onExtPluginInstall?: (pluginId: string) => void;
  onToggleModal?: (shown: boolean) => void;
  onBack?: () => void;
};

const PluginDetailPage: React.FC<Props> = ({
  plugin,
  isLoggedIn,
  handleClickLike,
  onExtPluginInstall,
  onToggleModal,
  onBack,
}) => {
  const t = useT();
  const {
    id,
    name: pluginName,
    version,
    author,
    like: likes,
    liked: isLiked,
    description,
    readme,
    images,
    downloads,
    updatedAt: updatedDate,
    installed,
  } = plugin ?? {};

  const date = useMemo(() => {
    if (!updatedDate) return undefined;
    const d = new Date(updatedDate);
    if (isNaN(d.getTime())) return undefined;
    return d;
  }, [updatedDate]);

  return (
    <>
      <Wrapper>
        <InnerWrapper>
          <Breadcrumb
            style={{
              paddingBottom: "24px",
            }}>
            <Breadcrumb.Item>
              <StyledLink
                style={{ cursor: "pointer" }}
                onClick={e => {
                  e.preventDefault();
                  onBack?.();
                }}>
                {t("Top")}
              </StyledLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{pluginName}</Breadcrumb.Item>
          </Breadcrumb>
          {plugin ? (
            <StyledLayout hasSider>
              <Row wrap={false} style={{ width: "100%" }} justify="start">
                <Col flex={3} style={{ maxWidth: "736px" }}>
                  <Carousel autoplay>
                    {images && images.length > 0 ? (
                      images?.map((image, idx) => (
                        <Image
                          key={id + "-" + idx}
                          src={image}
                          fallback={NoPluginCover}
                          wrapperStyle={{
                            height: "414px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          preview={false}
                        />
                      ))
                    ) : (
                      <Image
                        key={id}
                        width="100%"
                        height="auto"
                        style={{ minHeight: "200px" }}
                        src={NoPluginCover}
                        fallback="data:image/png;base64,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"
                        preview={false}
                      />
                    )}
                  </Carousel>
                  <PluginDocs>
                    <Tabs defaultActiveKey="1">
                      <TabPane tab={t("Readme")} key="1">
                        <Markdown>{readme}</Markdown>
                      </TabPane>
                      {/* TODO: after developing function for posting changelogs */}
                      {/* <TabPane tab="Change log" key="2">
                      Change log
                    </TabPane> */}
                    </Tabs>
                  </PluginDocs>
                </Col>
                <Col
                  flex={2}
                  style={{
                    padding: "0 24px",
                    maxWidth: "400px",
                  }}>
                  <Title>{pluginName}</Title>
                  <LikesDownloaded justify="end">
                    <Space>
                      <Col>
                        <StyledIcon icon="heartOutlined" />
                        {likes}
                      </Col>
                      <Col>
                        <StyledIcon icon="arrowDown" />
                        {downloads}
                      </Col>
                    </Space>
                  </LikesDownloaded>
                  <Divider style={{ margin: "24px 0" }} />
                  <ActionButtons justify="space-between" wrap={false}>
                    <Col flex="none" style={{ marginRight: "12px" }}>
                      <Button
                        type="primary"
                        size="large"
                        ghost
                        disabled={!isLoggedIn}
                        onClick={() => isLiked && handleClickLike(isLiked)}>
                        {isLiked ? (
                          <Icon icon="heartFilled" style={{ color: "#B02838" }} />
                        ) : (
                          <Icon icon="heartOutlined" />
                        )}
                      </Button>
                    </Col>
                    <Col flex="auto">
                      <InstallButton
                        type="primary"
                        size="large"
                        block
                        onClick={() =>
                          onExtPluginInstall
                            ? onExtPluginInstall(`${id}~${version}`)
                            : onToggleModal?.(true)
                        }
                        disabled={!isLoggedIn || installed}>
                        <Icon icon="download" />
                        {installed
                          ? t("Already installed")
                          : onExtPluginInstall
                          ? t("Install")
                          : t("Open Plugin in your project")}
                      </InstallButton>
                    </Col>
                  </ActionButtons>
                  <Description>
                    <Col style={{ paddingBottom: "8px" }}>{t("Description")}</Col>
                    <Col>{description}</Col>
                  </Description>
                  <PluginInfo align="middle" justify="space-between">
                    <Col>{t("Developer")}</Col>
                    <Col>{author}</Col>
                  </PluginInfo>
                  <PluginInfo align="middle" justify="space-between">
                    <Col>{t("Version")}</Col>
                    <Col>v{version}</Col>
                  </PluginInfo>
                  <PluginInfo align="middle" justify="space-between">
                    <Col>{t("Update date")}</Col>
                    <Col>
                      {date ? `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}` : ""}
                    </Col>
                  </PluginInfo>
                  <ReportButton
                    type="link"
                    size="middle"
                    danger
                    href={window.REEARTH_MARKETPLACE_CONFIG?.reportUrl}
                    target="_blank">
                    <Row align="bottom" justify="space-between" wrap={false}>
                      <Col>{t("Report this plugin")}</Col>
                      <Col span={4}>
                        <Icon icon="exclamation" />
                      </Col>
                    </Row>
                  </ReportButton>
                </Col>
              </Row>
            </StyledLayout>
          ) : (
            <Loading height={400} size="lg" />
          )}
        </InnerWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background: ${({ theme }) => theme.main.background};
  &&,
  h1 {
    color: ${({ theme }) => theme.main.text};
  }
`;

const InnerWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 24px;
  padding-bottom: 48px;
  min-height: 400px;
  width: 100%;

  .ant-breadcrumb-separator,
  .ant-breadcrumb-link,
  .ant-breadcrumb li a {
    color: ${({ theme }) => theme.main.text};
    user-select: none;
  }
  .ant-breadcrumb li a {
    :hover {
      color: ${({ theme }) => theme.main.weakText};
    }
  }
`;

const StyledLayout = styled(Layout)`
  min-height: 400px;
  min-width: 800px;
  margin: 0 auto;
  background: transparent;
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

const PluginDocs = styled.div`
  * {
    color: ${({ theme }) => theme.main.text};
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

const LikesDownloaded = styled(Row)`
  color: ${({ theme }) => theme.main.weakText};
`;

const ActionButtons = styled(Row)``;

const InstallButton = styled(Button)`
  .ant-btn-block {
    background: transparent;
  }
`;

const ReportButton = styled(Button)`
  padding: 0;
  margintop: 12;
`;

const Description = styled.div`
  margin: 24px 0;
  font-size: 16px;
`;

const PluginInfo = styled(Row)`
  margin-top: 12px;
  font-size: 16px;
`;

const StyledIcon = styled(Icon)`
  margin-right: 2px;
`;

export default PluginDetailPage;
