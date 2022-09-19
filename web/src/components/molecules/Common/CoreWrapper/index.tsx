import { ComponentType } from "react";

import { styled } from "@marketplace/theme";

export type Props = {
  className?: string;
  header?: ComponentType;
  footer?: ComponentType;
  children?: React.ReactNode;
};

const CoreWrapper: React.FC<Props> = ({
  className = "light",
  header: Header,
  footer: Footer,
  children,
}) => {
  return (
    <Wrapper className={className}>
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

  > :first-of-type {
    flex: 1;
    width: 100%;
  }
`;

export default CoreWrapper;
