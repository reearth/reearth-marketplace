import { useT } from "@marketplace/i18n";
import { styled } from "@marketplace/theme";

export type PluginItemProps = {
  className?: string;
  thumbnail?: string;
  title?: string;
  version?: string;
  author?: string;
  isInstalled?: boolean;
  onInstall?: () => void;
  onUninstall?: () => void;
};

const PluginAccordionItemHeader: React.FC<PluginItemProps> = ({
  className,
  thumbnail,
  title,
  version,
  author,
  isInstalled,
  onInstall,
  onUninstall,
}) => {
  const t = useT();

  return (
    <Wrapper className={className}>
      <InnerWrapper>
        <InfoWrapper>
          <MainInfo>
            {thumbnail && <Thumbnail src={thumbnail} alt="plugin thumbnail" />}
            <Title style={{ marginRight: "20px", maxWidth: "200px" }}>{title}</Title>
          </MainInfo>
          <SecondaryInfo>
            <p id="version">v{version}</p>
            <p id="author">{author}</p>
          </SecondaryInfo>
        </InfoWrapper>
      </InnerWrapper>
      <ButtonWrapper>
        <Button onClick={isInstalled ? () => onInstall?.() : undefined}>{t("Update")}</Button>
        <Button onClick={isInstalled ? () => onUninstall?.() : undefined}>{t("Uninstall")}</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 88px;
  background: ${({ theme }) => theme.main.lightBackground};
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  margin-right: 32px;

  p {
    font-size: 16px;
  }
`;

const MainInfo = styled.div`
  display: flex;
  width: 250px;
`;

const SecondaryInfo = styled.div`
  display: flex;

  #version {
    margin-right: 32px;
  }
  #author {
    color: #4770ff;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 316px;
`;

const Thumbnail = styled.img`
  border-radius: 8px;
  width: 64px;
  height: 64px;
  margin-right: 24px;
`;

const Title = styled.p`
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Button = styled.button`
  width: 153px;
  height: 38px;
  font-weight: bold;
  font-size: 16px;
  border-radius: 8px;
  transition: all 0.3s;
  border-style: solid;
  border-width: 1px;
  color: ${({ theme }) => theme.main.weakText};
  border-color: ${({ theme }) => theme.main.weakText};

  :hover {
    color: ${({ theme }) => theme.main.text};
    border-color: ${({ theme }) => theme.main.text};
  }
`;

export default PluginAccordionItemHeader;
