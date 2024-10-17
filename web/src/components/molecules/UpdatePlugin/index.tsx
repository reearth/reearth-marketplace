import { useCallback, useState } from "react";

import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
// import { TextArea } from "@marketplace/components/atoms/Input";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import Breadcrumb from "@marketplace/components/molecules/Common/Breadcrumb";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";

import PackageArea from "../Common/PluginUpload/PackageArea";
import { RcFile as RcFileType } from "../Common/PluginUpload/SettingArea";

export type RcFile = RcFileType;

export type Props = {
  pluginName: string;
  version: string;
  githubUrl?: string;
  isLoading: boolean;
  onGithubUrlChange: (url: string) => void;
  onParsePlugin: (file?: File) => Promise<void>;
  onPluginSave: () => void;
  onRemove?: () => void;
};

const UpdatePlugin: React.FC<Props> = ({
  pluginName,
  version,
  githubUrl,
  isLoading,
  onGithubUrlChange,
  onParsePlugin,
  onPluginSave,
  onRemove,
}) => {
  const t = useT();
  const [currentTab, updateTab] = useState<1 | 2>(1);

  const handlePageChange = useCallback(() => {
    updateTab(currentTab === 1 ? 2 : 1);
  }, [currentTab]);

  return (
    <Wrapper>
      <ContentWrapper>
        <TopRow align="middle" justify="space-between">
          <Col>
            <Breadcrumb
              rootLink="/myplugins"
              rootName={t("Plugins List")}
              currentName={t("Update Plugin")}
            />
          </Col>
          <Col>
            <Space size="middle">
              <Button
                type="default"
                size="large"
                onClick={onPluginSave}
                loading={isLoading}
                disabled={pluginName === ""}>
                {/* disabled={currentTab !== 2}> */}
                {t("Save")}
              </Button>
            </Space>
          </Col>
        </TopRow>
        {currentTab === 1 && (
          <PackageArea
            githubUrl={githubUrl}
            onChangeGithubUrl={onGithubUrlChange}
            onRemove={onRemove}
            onParsePlugin={onParsePlugin}
          />
        )}
        {currentTab === 2 && (
          <PageTwo>
            <Button onClick={handlePageChange} style={{ marginBottom: "12px" }}>
              {t("Back")}
            </Button>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Title>{t("Plugin Name")}</Title>
              <PluginInfo>{pluginName}</PluginInfo>
              <Title>{t("Version")}</Title>
              <PluginInfo>{version}</PluginInfo>
              {/* <Title>{t("Changelog")}</Title>
              <StyledTextArea rows={4} defaultValue={changelog} /> */}
            </Space>
          </PageTwo>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(250, 250, 250, 1);
  padding-top: 48px;
  padding-bottom: 72px;
`;

const ContentWrapper = styled.div`
  width: 1200px;
`;

const TopRow = styled(Row)`
  padding: 0;
  margin-bottom: 32px;
`;

const PageTwo = styled.div`
  background: rgba(255, 255, 255, 1);
  padding: 32px;
`;

const Title = styled.p`
  font-size: 16px;
  width: 100%;
`;

const PluginInfo = styled.h1`
  font-size: 16px;
  font-weight: bold;
`;

// const StyledTextArea = styled(TextArea)`
//   width: 100%;
// `;

export default UpdatePlugin;
