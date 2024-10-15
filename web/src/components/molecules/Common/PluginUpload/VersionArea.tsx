import Radio from "@marketplace/components/atoms/Radio";
import Space from "@marketplace/components/atoms/Space";
import ShadowCard from "@marketplace/components/molecules/Common/ShadowCard";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";

const radioOptions = [
  { label: "Classic", value: "Classic" },
  { label: "Visualizer", value: "Visualizer" },
];

const VersionArea: React.FC = () => {
  const t = useT();
  return (
    <ShadowCard>
      <div>
        <Space direction="vertical" size={"large"}>
          <ContentText>{t("Version")}</ContentText>
          <ContentText>{t("Which environment is your plugin developed for ?")}</ContentText>
        </Space>
        <RadioWrapper>
          <Radio.Group block options={radioOptions} defaultValue="Classic" optionType="button" />
        </RadioWrapper>
      </div>
    </ShadowCard>
  );
};

const ContentText = styled.p`
  font-size: 16px;
  line-height: 21.79px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
`;

const RadioWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  width: 100%;
`;

export default VersionArea;
