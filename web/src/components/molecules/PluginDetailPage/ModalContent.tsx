import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Divider from "@marketplace/components/atoms/Divider";
import Modal from "@marketplace/components/atoms/Modal";
import Row from "@marketplace/components/atoms/Row";
import { useEffect, useState } from "react";

type Props = {
  title: string;
  visible: boolean;
  workspaces?: Workspace[];
  onPluginInstall?: (workspaceId: string, projectId: string) => void;
  onCancel: () => void;
  handleClickChoose: (projectId: string) => void;
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
  title,
  visible,
  workspaces,
  onCancel,
  onPluginInstall,
  handleClickChoose,
}) => {
  const [workspaceId, selectWorkspace] = useState<string>("");
  useEffect(() => {
    selectWorkspace("");
  }, [workspaces]);

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      okText="Choose"
      okButtonProps={{ disabled: !workspaceId }}
      onOk={() => handleClickChoose}>
      <Row>
        <Col>
          Workspace: {(workspaceId && workspaces?.find(ws => ws.id === workspaceId)?.name) || "-"}
        </Col>
        {workspaces?.map(ws => (
          <button
            key={ws.id}
            onClick={() => {
              selectWorkspace(ws.id);
            }}>
            {ws.name}
          </button>
        ))}
      </Row>
      <Divider />
      <Row>
        {workspaceId &&
          workspaces
            ?.find(ws => ws.id === workspaceId)
            ?.projects.map(prj => {
              return (
                <Col span={24} key={prj.id}>
                  <Button onClick={() => onPluginInstall?.(workspaceId, prj.id)} block>
                    {prj.name}
                  </Button>
                </Col>
              );
            })}
      </Row>
    </Modal>
  );
};

export default ModalContent;
