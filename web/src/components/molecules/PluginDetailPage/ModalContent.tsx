import Button from "@marketplace/components/atoms/Button";
import Col from "@marketplace/components/atoms/Col";
import Divider from "@marketplace/components/atoms/Divider";
import Modal from "@marketplace/components/atoms/Modal";
import Row from "@marketplace/components/atoms/Row";
import { useState } from "react";

type Props = {
  title: string;
  visible: boolean;
  onCancel: () => void;
  handleClickChoose: (projectId: string) => void;
};
const ModalContent: React.FC<Props> = ({
  title,
  visible,
  onCancel,
  handleClickChoose,
}) => {
  const [projectId, selectProject] = useState<string>("");
  const projects = [
    {
      id: "2332",
      name: "hoge",
    },
  ];
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      okText="Choose"
      okButtonProps={{ disabled: !projectId }}
      onOk={() => handleClickChoose}
    >
      <Row>
        <Col>Workspace: </Col>
      </Row>
      <Divider />
      <Row>
        {projects.map((project) => {
          return (
            <Col span={24} key={project.id}>
              <Button onClick={() => selectProject(project.id)} block>
                {project.name}
              </Button>
            </Col>
          );
        })}
      </Row>
    </Modal>
  );
};

export default ModalContent;
