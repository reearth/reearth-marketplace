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
                <SectionContent href="https://discord.gg/XJhYkQQDAu" target="_blank">
                  Discord
                </SectionContent>
                <SectionContent
                  href="https://github.com/reearth/reearth/discussions"
                  target="_blank">
                  Discussion
                </SectionContent>
                <SectionContent href="https://reearth.io/blog/tags/event" target="_blank">
                  Events
                </SectionContent>
              </Section>
            </Col>
            <Col flex={1} style={{ maxWidth: "300px" }}>
              <SectionTitle>Support</SectionTitle>
              <Section direction="vertical">
                <SectionContent href="https://docs2.reearth.io/getting-started" target="_blank">
                  Getting Started
                </SectionContent>
                <SectionContent href="https://docs2.reearth.io/reference" target="_blank">
                  Reference
                </SectionContent>
                <SectionContent
                  href="https://docs.reearth.io/developer-guide/intro/about"
                  target="_blank">
                  Developer Guide
                </SectionContent>
                <SectionContent href="https://docs.reearth.io/tutorial/home" target="_blank">
                  Tutorial
                </SectionContent>
                <SectionContent href="https://reearth.io/docs/terms-of-use" target="_blank">
                  Terms of Use
                </SectionContent>
              </Section>
            </Col>
            <Col flex={1} style={{ maxWidth: "300px" }}>
              <SectionTitle>Developers</SectionTitle>
              <Section direction="vertical">
                <SectionContent href="https://github.com/reearth/reearth" target="_blank">
                  Github
                </SectionContent>
                <SectionContent
                  href="https://github.com/reearth/reearth/projects/1"
                  target="_blank">
                  Road Maps
                </SectionContent>
                <SectionContent
                  href="https://github.com/reearth/reearth/blob/main/CHANGELOG.md"
                  target="_blank">
                  Changelog
                </SectionContent>
                <SectionContent
                  href="https://github.com/reearth/reearth/blob/main/CODE_OF_CONDUCT.md"
                  target="_blank">
                  Code of Conduct
                </SectionContent>
              </Section>
            </Col>
            <Col flex={1} style={{ maxWidth: "300px" }}>
              <SectionTitle>Company</SectionTitle>
              <Section direction="vertical">
                <SectionContent href="https://eukarya.io/" target="_blank">
                  Website
                </SectionContent>
                <SectionContent href="https://www.facebook.com/EukaryaInc" target="_blank">
                  Facebook
                </SectionContent>
                <SectionContent href="https://twitter.com/eukaryaofficial" target="_blank">
                  Twitter
                </SectionContent>
                <SectionContent href="https://reearth.io/docs/privacy-policy" target="_blank">
                  Privacy Policy
                </SectionContent>
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
