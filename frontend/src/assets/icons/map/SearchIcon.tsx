import { SVGProps } from 'react';

function SearchIcon({ stroke, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M35 35L29.1668 29.1667M33.3333 19.1667C33.3333 26.9907 26.9907 33.3333 19.1667 33.3333C11.3426 33.3333 5 26.9907 5 19.1667C5 11.3426 11.3426 5 19.1667 5C26.9907 5 33.3333 11.3426 33.3333 19.1667Z"
        stroke={stroke ?? '#363636'}
        strokeWidth="3.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SearchIcon;
