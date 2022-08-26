import styled from "@emotion/styled";

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
  background: #070707;
  color: #fff;
`;
const Contents = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const Title = styled.h1`
  padding: 48px 0 10px;
  color: #fff;
  margin: 0;
`;
const Desc = styled.p`
  margin: 0;
`;
export default TitleBar;
