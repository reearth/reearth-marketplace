import Button from "@marketplace/components/atoms/Button";
import Icon from "@marketplace/components/atoms/Icon";
import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";

type Props = {
  currentTab: "1" | "2" | "3";
  handleNextButtonPress: () => void;
  handlePrevButtonPress: () => void;
};

const ButtonNavigation: React.FC<Props> = ({ currentTab, handleNextButtonPress, handlePrevButtonPress }) => {
  const t = useT();

  return (
    <ButtonWrapper>
      <div>
        {["2", "3"].includes(currentTab) && (
          <Button icon={<Icon icon="arrowLeft" />} iconPosition="start" type="primary" onClick={handlePrevButtonPress}>
            {t("Prev")}
          </Button>
        )}
      </div>
      <div>
        <Button
          icon={currentTab !== "3" ? <Icon icon="arrowRight" /> : null}
          iconPosition="end"
          type="primary"
          onClick={handleNextButtonPress}
        >
          {t(`${currentTab === "3" ? "Save and Publish" : "Next"}`)}
        </Button>
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
