import styled from "@emotion/styled";

import AddNewPluginContent from "./AddNewPluginContent";
import { FileUploadType } from "./PackageArea";

export type Props = {
  pluginName: string;
  description: string;
  version: string;
  handleParsePlugin: (file?: FileUploadType) => void;
  handleClickSave: () => void;
  handleClickPublish: () => void;
};
const AddNewPluginPage: React.FC<Props> = ({
  pluginName,
  description,
  version,
  handleParsePlugin,
  handleClickSave,
  handleClickPublish,
}) => {
  return (
    <Wrapper>
      <AddNewPluginContent
        pluginName={pluginName}
        description={description}
        version={version}
        handleParsePlugin={handleParsePlugin}
        handleClickSave={handleClickSave}
        handleClickPublish={handleClickPublish}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  background: rgba(250, 250, 250, 1);
`;

export default AddNewPluginPage;
