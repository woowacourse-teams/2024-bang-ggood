interface Props extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?: string;
}

const Like = ({ fill, stroke, ...rest }: Props) => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.4929 5.34981C10.4102 2.915 6.93723 2.26004 4.3278 4.4896C1.71837 6.71915 1.351 10.4469 3.4002 13.0838C5.10397 15.2762 10.2602 19.9001 11.9501 21.3967C12.1392 21.5641 12.2337 21.6479 12.344 21.6808C12.4402 21.7095 12.5455 21.7095 12.6418 21.6808C12.752 21.6479 12.8466 21.5641 13.0356 21.3967C14.7255 19.9001 19.8818 15.2762 21.5855 13.0838C23.6347 10.4469 23.3122 6.6957 20.6579 4.4896C18.0036 2.2835 14.5755 2.915 12.4929 5.34981Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Like;
