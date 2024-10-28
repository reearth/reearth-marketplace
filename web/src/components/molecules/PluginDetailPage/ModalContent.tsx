import { useCallback, useState } from "react";

import Col from "@marketplace/components/atoms/Col";
import List from "@marketplace/components/atoms/List";
import Loading from "@marketplace/components/atoms/Loading";
import Modal from "@marketplace/components/atoms/Modal";
import Row from "@marketplace/components/atoms/Row";
import Select, { Option } from "@marketplace/components/atoms/Select";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";
import { Plugin } from "@marketplace/types";

type Props = {
  visible: boolean;
  workspaces?: Workspace[];
  onOpenPluginInReearth?: ({
    projectId,
    isCorePlugin,
  }: {
    projectId: string;
    isCorePlugin: boolean;
  }) => void;
  onCancel: () => void;
  plugin?: Plugin;
};

export type Workspace = {
  id: string;
  name: string;
  projects: Project[];
};

export type Project = {
  id: string;
  name: string;
  coreSupport: boolean;
};

const ModalContent: React.FC<Props> = ({
  visible,
  workspaces,
  onCancel,
  onOpenPluginInReearth,
  plugin,
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

  const getProjectsByPluginCore = ({
    selectedWorkspaceId,
    workspaces,
    plugin,
  }: {
    selectedWorkspaceId: string;
    workspaces: Workspace[];
    plugin?: Plugin;
  }): { id: string; name: string }[] | [] => {
    if (selectedWorkspaceId && workspaces.length) {
      const selectedWorkspace = workspaces.find(ws => ws.id === workspaceId);
      if (!selectedWorkspace) return [];

      if (plugin) {
        return selectedWorkspace.projects
          .filter(project => project.coreSupport === plugin.isCorePlugin)
          .map(project => ({
            id: project.id,
            name: project.name,
          }));
      }

      return selectedWorkspace.projects.map(project => ({
        id: project.id,
        name: project.name,
      }));
    }
    return [];
  };

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
      open={visible}
      onCancel={handleCancel}
      okText={t("Choose")}
      cancelText={t("Cancel")}
      okButtonProps={{ disabled: !workspaceId || !projectId || !plugin }}
      style={{ padding: "20px 32px", maxHeight: "582px", overflow: "scroll" }}
      onOk={() =>
        plugin && onOpenPluginInReearth?.({ projectId, isCorePlugin: plugin.isCorePlugin })
      }>
      {workspaces?.length ? (
        workspaceId && (
          <List
            dataSource={getProjectsByPluginCore({
              workspaces,
              selectedWorkspaceId: workspaceId,
              plugin,
            })}
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
  background: ${({ selected }) => (selected ? "#1677ff" : "#F0F0F0")};
  ${({ selected }) => selected && "color: white;"}
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  padding: 12px 20px;

  :hover {
    background: #1677ff;
    color: white;
  }
`;
