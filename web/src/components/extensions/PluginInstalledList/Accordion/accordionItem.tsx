// import styled from "@emotion/styled";
// import {
//   AccordionItem as AccordionItemComponent,
//   AccordionItemButton,
//   AccordionItemHeading,
//   AccordionItemPanel,
//   AccordionItemState,
// } from "react-accessible-accordion";

// import Box from "../Box";
// import Flex from "../Flex";
// import Icon from "../Icon";

export type Props = {
  className?: string;
  id: string;
  heading?: React.ReactNode;
  content?: React.ReactNode;
  bg?: string;
};

// const AccordionItem: React.FC<Props> = ({ className, id, heading, content, bg }) => {
const AccordionItem: React.FC<Props> = () => {
  return (
    // <Box mv="2xl" key={id} className={className} bg={bg} data-testid="atoms-accordion-item">
    //   <AccordionItemComponent>
    //     <AccordionItemHeading>
    //       <StyledAccordionItemButton data-testid="atoms-accordion-item-header">
    //         <Box ph="2xl">
    //           <Flex align="center">
    //             <AccordionItemState>
    //               {({ expanded }) => (
    //                 <>
    //                   <StyledIcon
    //                     color={theme.text.pale}
    //                     icon="arrowToggle"
    //                     size={16}
    //                     open={!!expanded}
    //                   />
    //                   {heading}
    //                 </>
    //               )}
    //             </AccordionItemState>
    //           </Flex>
    //         </Box>
    //       </StyledAccordionItemButton>
    //     </AccordionItemHeading>
    //     <AccordionItemPanel data-testid="atoms-accordion-item-content">
    //       {content}
    //     </AccordionItemPanel>
    //   </AccordionItemComponent>
    // </Box>
    <p>Accordion item</p>
  );
};

// const StyledIcon = styled(Icon)<{ open: boolean }>`
//   transition: transform 0.15s ease;
//   transform: ${({ open }) => open && "translateY(10%) rotate(90deg)"};
//   margin-right: 24px;
// `;

// const StyledAccordionItemButton = styled(AccordionItemButton)`
//   outline: none;
//   cursor: pointer;
// `;
export default AccordionItem;
