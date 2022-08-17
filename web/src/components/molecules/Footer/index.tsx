import styled from "@emotion/styled";

import Space from "@/components/atoms/Space";
import Row from "@/components/atoms/Row";
import Col from "@/components/atoms/Col";

export type Props = {};
const Footer: React.FC<Props> = () => {
  return (
    <Wrapper align="center" direction="vertical">
      <FooterMenuRow justify="space-between" style={{ width: "100%" }}>
        <Col span={4}>
          <SectionTitle>Community</SectionTitle>
          <Section direction="vertical">
            <SectionContent>Discord</SectionContent>
            <SectionContent>Discord</SectionContent>
            <SectionContent>Discord</SectionContent>
          </Section>
        </Col>
        <Col span={4}>
          <SectionTitle>Community</SectionTitle>
          <Section direction="vertical">
            <SectionContent>Discord</SectionContent>
            <SectionContent>Discord</SectionContent>
            <SectionContent>Discord</SectionContent>
          </Section>
        </Col>
        <Col span={4}>
          <SectionTitle>Community</SectionTitle>
          <Section direction="vertical">
            <SectionContent>Discord</SectionContent>
            <SectionContent>Discord</SectionContent>
            <SectionContent>Discord</SectionContent>
          </Section>
        </Col>
        <Col span={4}>
          <SectionTitle>Community</SectionTitle>
          <Section direction="vertical">
            <SectionContent>Discord</SectionContent>
            <SectionContent>Discord</SectionContent>
            <SectionContent>Discord</SectionContent>
          </Section>
        </Col>
      </FooterMenuRow>
      <Space align="center" direction="horizontal">
        Logo
      </Space>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 509px;
  width: 100%;
  background: #303846;
  padding: 47.5px 360px;
  color: #fff;
  margin: 0 auto;
`;

const FooterMenuRow = styled(Row)`
  max-width: 1200px;
`;
const SectionTitle = styled.h4`
  color: #c7c5c5;
`;

const Section = styled(Space)``;

const SectionContent = styled.a`
  color: #c7c5c5;
`;
export default Footer;
