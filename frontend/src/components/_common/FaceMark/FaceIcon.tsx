// import { SVGProps } from 'react';

// import {
//   FaceIconBad,
//   FaceIconBadGray,
//   FaceIconGood,
//   FaceIconGoodGray,
//   FaceIconNone,
//   FaceIconSoso,
//   FaceIconSosoGray,
// } from '@/assets/assets';
// import { EmotionNameWithNone } from '@/types/emotionAnswer';

// interface FaceIconProps extends SVGProps<SVGSVGElement> {
//   emotion: EmotionNameWithNone;
//   isFilled?: boolean;
// }

// const FaceIcon = ({ emotion, isFilled = false, ...rest }: FaceIconProps) => {
//   return (
//     <>
//       {emotion === 'GOOD' && isFilled && <FaceIconGood {...rest} />}
//       {emotion === 'GOOD' && !isFilled && <FaceIconGoodGray {...rest} />}
//       {emotion === 'SOSO' && isFilled && <FaceIconSoso {...rest} />}
//       {emotion === 'SOSO' && !isFilled && <FaceIconSosoGray {...rest} />}
//       {emotion === 'BAD' && isFilled && <FaceIconBad {...rest} />}
//       {emotion === 'BAD' && !isFilled && <FaceIconBadGray {...rest} />}
//       {emotion === 'NONE' && <FaceIconNone {...rest} />}
//     </>
//   );
// };
// export default FaceIcon;
