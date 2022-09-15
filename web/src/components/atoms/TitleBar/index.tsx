import HeaderBanner from "@marketplace/assets/header.png";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";

export type Props = {};
const TitleBar: React.FC<Props> = () => {
  const t = useT();
  return (
    <Wrapper>
      <Contents>
        <Title>{t("Re:Earth Plugin Marketplace")}</Title>
        <Desc>{t("Make Re:Earth the way you want it")}</Desc>
      </Contents>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 159px;
  background: url(${HeaderBanner}) center center;
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
  margin-bottom: 48px;
`;
const Contents = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const Title = styled.h1`
  padding: 48px 0 10px;
  color: #fff;
`;
const Desc = styled.p``;

export default TitleBar;
