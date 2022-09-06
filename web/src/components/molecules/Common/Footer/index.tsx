import Logo from "@marketplace/assets/logo.png";
import Col from "@marketplace/components/atoms/Col";
import Image from "@marketplace/components/atoms/Image";
import Row from "@marketplace/components/atoms/Row";
import Space from "@marketplace/components/atoms/Space";
import { styled } from "@marketplace/theme";

export type Props = {};
const Footer: React.FC<Props> = () => {
  return (
    <Wrapper>
      <FooterMenuRow
        justify="space-around"
        wrap
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        align="middle">
        <Col span={18} offset={4} style={{ marginTop: "47px" }}>
          <Row>
            <Col flex={1} style={{ maxWidth: "300px" }}>
              <SectionTitle>Community</SectionTitle>
              <Section direction="vertical">
                <SectionContent>Discord</SectionContent>
                <SectionContent>Discussion</SectionContent>
                <SectionContent>Events</SectionContent>
                <SectionContent>Road Maps</SectionContent>
              </Section>
            </Col>
            <Col flex={1} style={{ maxWidth: "300px" }}>
              <SectionTitle>Support</SectionTitle>
              <Section direction="vertical">
                <SectionContent>Getting Started</SectionContent>
                <SectionContent>Reference</SectionContent>
                <SectionContent>Developer Guide</SectionContent>
                <SectionContent>Tutorial</SectionContent>
                <SectionContent>Terms of Use</SectionContent>
              </Section>
            </Col>
            <Col flex={1} style={{ maxWidth: "300px" }}>
              <SectionTitle>Developers</SectionTitle>
              <Section direction="vertical">
                <SectionContent>Github</SectionContent>
                <SectionContent>Road Maps</SectionContent>
                <SectionContent>Changelog</SectionContent>
                <SectionContent>Code of Conduct</SectionContent>
              </Section>
            </Col>
            <Col flex={1} style={{ maxWidth: "300px" }}>
              <SectionTitle>Company</SectionTitle>
              <Section direction="vertical">
                <SectionContent>Website</SectionContent>
                <SectionContent>Facebook</SectionContent>
                <SectionContent>Twitter</SectionContent>
                <SectionContent>Privacy Policy</SectionContent>
              </Section>
            </Col>
          </Row>
        </Col>
      </FooterMenuRow>

      <div style={{ margin: "32px auto 0", width: "100%", textAlign: "center" }}>
        <Row align="middle" justify="center">
          <Space direction="vertical" size="large">
            <Col>
              <Image src={Logo} preview={false} width="120px" />
            </Col>
            <Col>© 2022 Re:Earth contributors.</Col>
          </Space>
        </Row>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 509px;
  width: 100%;
  background: #303846;
  color: #fff;
  margin: 0 auto;
`;

const FooterMenuRow = styled(Row)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;
const SectionTitle = styled.h4`
  color: #c7c5c5;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Section = styled(Space)``;

const SectionContent = styled.a`
  color: #c7c5c5;
  margin-bottom: 12px;
`;
export default Footer;
