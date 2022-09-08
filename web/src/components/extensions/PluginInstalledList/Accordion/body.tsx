// import Box from "@reearth/components/atoms/Box";
import Markdown from "@marketplace/components/atoms/Markdown";
import { styled, useTheme } from "@marketplace/theme";

export type Props = {
  children?: string;
};

const PluginAccordionItemBody: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const markdownTypographyStyle = {
    color: theme.main.text,
  };

  return (
    <Wrapper>
      <Markdown backgroundColor={theme.main.lightBackground} styles={markdownTypographyStyle}>
        {children ?? ""}
      </Markdown>
    </Wrapper>
  );
};

export default PluginAccordionItemBody;

const Wrapper = styled.div`
  padding: 24px;
`;
