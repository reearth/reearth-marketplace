import styled from "@emotion/styled";
import Footer from "@marketplace/components/molecules/Common/Footer";
import Header from "@marketplace/components/molecules/Common/Header";

import PluginDetailContent from "./PluginDetailContent";

export type Props = {
  isLoggedIn: boolean;
  pluginName: string;
  developerLink: string;
  version: string;
  publishedDate: string;
  handleClickChoose: (projectId: string) => void;
};
const PluginDetailPage: React.FC<Props> = ({
  isLoggedIn,
  pluginName,
  developerLink,
  version,
  publishedDate,
  handleClickChoose,
}) => {
  return (
    <Wrapper>
      <Header isLoggedIn={isLoggedIn} />
      <PluginDetailContent
        pluginName={pluginName}
        developerLink={developerLink}
        version={version}
        publishedDate={publishedDate}
        handleClickChoose={handleClickChoose}
      />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
`;

export default PluginDetailPage;
