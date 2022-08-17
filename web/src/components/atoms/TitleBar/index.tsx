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
`;
const Contents = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const Title = styled.h1``;
const Desc = styled.p``;
export default TitleBar;
