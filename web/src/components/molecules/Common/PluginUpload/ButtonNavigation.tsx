import Button from "@marketplace/components/atoms/Button";
import Icon from "@marketplace/components/atoms/Icon";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";
import { Tabs } from "@marketplace/types";

type Props = {
  currentTab: Tabs;
  handleNextButtonPress: () => void;
  handlePrevButtonPress: () => void;
  handlePluginSave: () => void;
  handlePluginPublish: () => void;
  isLoading: boolean;
  pluginUploaded: boolean;
};

const ButtonNavigation: React.FC<Props> = ({
  currentTab,
  handleNextButtonPress,
  handlePrevButtonPress,
  handlePluginSave,
  handlePluginPublish,
  isLoading,
  pluginUploaded,
}) => {
  const t = useT();

  return (
    <ButtonWrapper>
      <div>
        {[Tabs.Package, Tabs.Settings].includes(currentTab) && (
          <Button
            icon={<Icon icon="arrowLeft" />}
            iconPosition="start"
            type="primary"
            onClick={handlePrevButtonPress}>
            {t("Prev")}
          </Button>
        )}
      </div>
      <div>
        {currentTab !== Tabs.Settings ? (
          <Button
            disabled={currentTab === Tabs.Package && !pluginUploaded}
            icon={<Icon icon="arrowRight" />}
            iconPosition="end"
            type="primary"
            onClick={handleNextButtonPress}>
            {t("Next")}
          </Button>
        ) : (
          <div>
            <CustomButton
              icon={currentTab !== Tabs.Settings ? <Icon icon="arrowRight" /> : null}
              iconPosition="end"
              loading={isLoading}
              type="primary"
              onClick={handlePluginSave}>
              {t("Save")}
            </CustomButton>
            <Button
              icon={currentTab !== Tabs.Settings ? <Icon icon="arrowRight" /> : null}
              iconPosition="end"
              loading={isLoading}
              type="primary"
              onClick={handlePluginPublish}>
              {t("Save & Publish")}
            </Button>
          </div>
        )}
      </div>
    </ButtonWrapper>
  );
};

export default ButtonNavigation;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const CustomButton = styled(Button)`
  margin-right: 16px;
`;
