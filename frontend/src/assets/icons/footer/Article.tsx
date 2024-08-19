interface Props extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?: string;
}

const Article = ({ fill, stroke, ...rest }: Props) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        opacity="0.12"
        d="M25.1517 4.84835C26.6161 6.31282 26.6161 8.68718 25.1517 10.1517C23.6872 11.6161 21.3128 11.6161 19.8483 10.1517C18.3839 8.68718 18.3839 6.31282 19.8483 4.84835C21.3128 3.38388 23.6872 3.38388 25.1517 4.84835"
        fill={fill}
      />
      <path
        d="M16.25 21.25H8.75M18.75 16.25H8.75M13.75 5H9.75C7.6498 5 6.5997 5 5.79754 5.40873C5.09193 5.76825 4.51825 6.34193 4.15873 7.04754C3.75 7.84971 3.75 8.8998 3.75 11V20.25C3.75 22.3502 3.75 23.4003 4.15873 24.2025C4.51825 24.9081 5.09193 25.4818 5.79754 25.8413C6.5997 26.25 7.6498 26.25 9.75 26.25H19C21.1002 26.25 22.1503 26.25 22.9525 25.8413C23.6581 25.4818 24.2318 24.9081 24.5913 24.2025C25 23.4003 25 22.3502 25 20.25V16.25M25.1517 4.84835C26.6161 6.31282 26.6161 8.68718 25.1517 10.1517C23.6872 11.6161 21.3128 11.6161 19.8484 10.1517C18.3839 8.68718 18.3839 6.31282 19.8484 4.84835C21.3128 3.38388 23.6872 3.38388 25.1517 4.84835Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Article;
