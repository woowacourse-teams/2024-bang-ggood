// import styled from '@emotion/styled';
// import { forwardRef, ReactNode, useEffect, useImperativeHandle, useState } from 'react';

// interface Props {
//   children: ReactNode;
// }

// export interface AccordianRef {
//   toggle: () => void;
// }

// const Accordian = forwardRef<AccordianRef, Props>(({ children }, ref) => {
//   const [isOpen, setIsOpen] = useState(true);

//   const onToggleAccordianOpen = () => {
//     setIsOpen(!isOpen);
//   };

//   useImperativeHandle(ref, () => ({
//     toggle: onToggleAccordianOpen,
//   }));

//   useEffect(() => {
//     console.log('isOpen', isOpen);
//   }, [isOpen]);

//   return <S.Container isShow={isOpen}>{children}</S.Container>;
// });

// Accordian.displayName = 'Accordian';

// export const S = {
//   Container: styled.div<{ isShow: boolean }>`
//     display: ${({ isShow }) => (isShow ? 'block' : 'none')};
//   `,
// };

// export default Accordian;
