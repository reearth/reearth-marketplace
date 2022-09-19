import { useCallback, useState } from "react";

import Col from "@marketplace/components/atoms/Col";
import List from "@marketplace/components/atoms/List";
import Loading from "@marketplace/components/atoms/Loading";
import Modal from "@marketplace/components/atoms/Modal";
import Row from "@marketplace/components/atoms/Row";
import Select, { Option } from "@marketplace/components/atoms/Select";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";

type Props = {
  visible: boolean;
  workspaces?: Workspace[];
  onOpenPluginInReearth?: (workspaceId: string, projectId: string) => void;
  onCancel: () => void;
};

export type Workspace = {
  id: string;
  name: string;
  projects: Project[];
};

export type Project = {
  id: string;
  name: string;
};

const ModalContent: React.FC<Props> = ({
  visible,
  workspaces,
  onCancel,
  onOpenPluginInReearth,
}) => {
  const t = useT();
  const [workspaceId, selectWorkspace] = useState<string>("");
  const [projectId, selectProject] = useState<string>("");

  const workspaceOptions = workspaces?.map(ws => (
    <Option key={ws.id} value={ws.id}>
      {ws.name}
    </Option>
  ));

  const handleCancel = useCallback(() => {
    selectWorkspace("");
    selectProject("");
    onCancel();
  }, [onCancel]);

  return (
    <Modal
      title={
        <>
          <Row justify="center" style={{ margin: "24px 0" }}>
            {t("Choose one project to open this plugin")}
          </Row>
          <Row gutter={20} align="middle">
            <Col>{t("Workspace")}:</Col>
            <Col>
              <Select
                loading={!workspaceOptions}
                value={workspaceId}
                style={{ width: 250 }}
                onChange={selectWorkspace}>
                {workspaceOptions}
              </Select>
            </Col>
          </Row>
        </>
      }
      width="756px"
      visible={visible}
      onCancel={handleCancel}
      okText={t("Choose")}
      okButtonProps={{ disabled: !workspaceId }}
      bodyStyle={{ padding: "20px 32px", maxHeight: "582px", overflow: "scroll" }}
      onOk={() => onOpenPluginInReearth?.(workspaceId, projectId)}>
      {workspaces && workspaces.length > 0 ? (
        workspaceId && (
          <List
            dataSource={
              workspaceId
                ? workspaces
                    ?.find(ws => ws.id === workspaceId)
                    ?.projects.map(prj => {
                      return {
                        id: prj.id,
                        name: prj.name,
                      };
                    })
                : []
            }
            renderItem={prj => (
              <ListItem selected={prj.id === projectId} onClick={() => selectProject?.(prj.id)}>
                {prj.name}
              </ListItem>
            )}
          />
        )
      ) : (
        <Loading height={100} />
      )}
    </Modal>
  );
};

export default ModalContent;

const ListItem = styled(List.Item)<{ selected?: boolean }>`
  margin: 0 12px 10px 12px;
  cursor: pointer;
  background: ${({ selected }) => (selected ? "#1890ff" : "#F0F0F0")};
  ${({ selected }) => selected && "color: white;"}
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  padding: 12px 20px;

  :hover {
    background: #1890ff;
    color: white;
  }
`;
