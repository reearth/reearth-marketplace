import styled from "@emotion/styled";
import { ComponentType } from "react";

export type Props = {
  header?: ComponentType;
  footer?: ComponentType;
  children?: React.ReactNode;
};

const CoreWrapper: React.FC<Props> = ({ header: Header, footer: Footer, children }) => {
  return (
    <Wrapper>
      {Header && <Header />}
      <Content>{children}</Content>
      {Footer && <Footer />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  > :first-child {
    flex: 1;
    width: 100%;
  }
`;

export default CoreWrapper;
