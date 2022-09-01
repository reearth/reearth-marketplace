import styled from "@emotion/styled";

import Footer from "@/components/molecules/Common/Footer";
import Header from "@/components/molecules/Common/Header";

import AddNewPluginContent from "./AddNewPluginContent";
import { FileUploadType } from "./PackageArea";

export type Props = {
  isLoggedIn: boolean;
  pluginName: string;
  description: string;
  version: string;
  handleParsePlugin: (file?: FileUploadType) => void;
  handleClickSave: () => void;
  handleClickPublish: () => void;
};
const AddNewPluginPage: React.FC<Props> = ({
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
      <AddNewPluginContent
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
  background: rgba(250, 250, 250, 1);
`;

export default AddNewPluginPage;
