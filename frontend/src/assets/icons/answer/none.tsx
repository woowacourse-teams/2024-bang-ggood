const None = ({ color, ...rest }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg {...rest} width="28" height="5" viewBox="0 0 28 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="2.5" y1="2.5" x2="25.5" y2="2.5" stroke={color} strokeWidth="5" stroke-linecap="round" />
    </svg>
  );
};

export default None;
