import { useNavigate } from "react-router-dom";

import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Icon from "@marketplace/components/atoms/Icon";
import Row from "@marketplace/components/atoms/Row";
import type { Plugin } from "@marketplace/components/organisms/MyPlugins";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";

import MyPluginsTable from "./MyPluginsTable";

export type Props = {
  plugins?: Plugin[];
  onPublish: (id: string, active: boolean) => Promise<void>;
  onPageChange: (page: number) => void;
  totalCount: number;
  page: number;
  pageSize: number;
};

const MyPluginsPage: React.FC<Props> = ({
  plugins,
  onPublish,
  onPageChange,
  totalCount,
  page,
  pageSize,
}) => {
  const t = useT();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ContentWrapper>
        <TitleArea justify="space-between" align="middle">
          <Col>
            <Title>{t("My Plugins")}</Title>
          </Col>
          <Col>
            <Button type="primary" onClick={() => navigate("/myplugins/new")}>
              <Icon icon="plus" />
              {t("New Plugin")}
            </Button>
          </Col>
        </TitleArea>
        <MyPluginsTable
          plugins={plugins}
          onPublish={onPublish}
          onPageChange={onPageChange}
          totalCount={totalCount}
          page={page}
          pageSize={pageSize}
        />
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

const Title = styled.h1`
  font-weight: bold;
  font-size: 20px;
`;

const TitleArea = styled(Row)`
  margin-bottom: 24px;
`;

export default MyPluginsPage;
