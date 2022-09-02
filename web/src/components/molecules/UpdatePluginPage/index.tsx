import styled from "@emotion/styled";
import Footer from "@marketplace/components/molecules/Common/Footer";
import Header from "@marketplace/components/molecules/Common/Header";

import UpdatePluginContent from "./UpdatePluginContent";

export type Props = {
  isLoggedIn: boolean;
  pluginName: string;
  description: string;
  version: string;
  handleParsePlugin: () => void;
  handleClickSave: () => void;
  handleClickPublish: () => void;
};
const UpdatePluginPage: React.FC<Props> = ({
  isLoggedIn,
  pluginName,
  description,
  version,
  handleParsePlugin,
  handleClickSave,
  handleClickPublish,
}) => {
  return (
    <Wrapper>
      <Header isLoggedIn={isLoggedIn} />
      <UpdatePluginContent
        pluginName={pluginName}
        description={description}
        version={version}
        handleParsePlugin={handleParsePlugin}
        handleClickSave={handleClickSave}
        handleClickPublish={handleClickPublish}
      />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
`;

export default UpdatePluginPage;
