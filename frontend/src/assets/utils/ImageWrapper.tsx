import { ImgHTMLAttributes } from 'react';

function ImageWrapper(src: string) {
  return (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />;
}

export default ImageWrapper;
