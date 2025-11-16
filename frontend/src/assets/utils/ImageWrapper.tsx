import { ImgHTMLAttributes } from 'react';

const ImageWrapper = (src: string) => 
  (props: ImgHTMLAttributes<HTMLImageElement>) => <img src={src} {...props} />;

export default ImageWrapper;
