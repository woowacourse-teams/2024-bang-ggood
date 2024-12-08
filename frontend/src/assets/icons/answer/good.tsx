const Good = ({ color, width, ...rest }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...rest}
      width={width ?? '29'}
      height={width ?? '29'}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14.5" cy="14.5" r="12" stroke={color} strokeWidth="5" />
    </svg>
  );
};

export default Good;
