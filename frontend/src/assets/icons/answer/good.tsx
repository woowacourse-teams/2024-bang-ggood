interface Props extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?: string;
}

const Good = ({ color, ...rest }: Props) => {
  return (
    <svg {...rest} width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14.5" cy="14.5" r="12" stroke={color} strokeWidth="5" />
    </svg>
  );
};

export default Good;
