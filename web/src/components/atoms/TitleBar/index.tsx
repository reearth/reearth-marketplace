import styled from "@emotion/styled";
import HeaderBanner from "@marketplace/assets/header.png";

export type Props = {};
const TitleBar: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Contents>
        <Title>Re: Earthプラグインマーケットプレイス</Title>
        <Desc>あなたのRe: Earthをもっと自由に</Desc>
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
