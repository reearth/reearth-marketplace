import {
  AccordionItem as AccordionItemComponent,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";

import Icon from "@marketplace/components/atoms/Icon";
import { styled } from "@marketplace/theme";

export type Props = {
  className?: string;
  id: string;
  heading?: React.ReactNode;
  content?: React.ReactNode;
};

const AccordionItem: React.FC<Props> = ({ className, id, heading, content }) => {
  return (
    <Wrapper key={id} className={className} data-testid="atoms-accordion-item">
      <AccordionItemComponent>
        <AccordionItemHeading>
          <StyledAccordionItemButton data-testid="atoms-accordion-item-header">
            <InnerWrapper>
              <Content>
                <AccordionItemState>
                  {({ expanded }) => (
                    <>
                      <StyledIcon icon="downFilled" open={!!expanded} />
                      {heading}
                    </>
                  )}
                </AccordionItemState>
              </Content>
            </InnerWrapper>
          </StyledAccordionItemButton>
        </AccordionItemHeading>
        <StyledAccordionItemPanel data-testid="atoms-accordion-item-content">
          {content}
        </StyledAccordionItemPanel>
      </AccordionItemComponent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 24px 0;
  background: ${({ theme }) => theme.main.lightBackground};
  transition: all 0.4s;
`;

const InnerWrapper = styled.div`
  padding: 0 24px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(Icon)<{ open: boolean }>`
  color: ${({ theme }) => theme.main.weakText};
  transition: transform 0.15s ease;
  transform: ${({ open }) => !open && "translateY(10%) rotate(-90deg)"};
  margin-right: 24px;
  font-size: 18px;
`;

const StyledAccordionItemButton = styled(AccordionItemButton)`
  outline: none;
  cursor: pointer;
`;

const StyledAccordionItemPanel = styled(AccordionItemPanel)`
  border-top: 1px solid ${({ theme }) => theme.main.border};
`;

export default AccordionItem;
