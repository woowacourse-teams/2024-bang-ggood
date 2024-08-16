interface Props extends React.SVGProps<SVGSVGElement> {
  stroke?: string;
}

const ArrowRight = ({ stroke, ...rest }: Props) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.16663 9.99996H15.8333M15.8333 9.99996L9.99996 4.16663M15.8333 9.99996L9.99996 15.8333"
        stroke={stroke}
        stroke-width="3.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.1665 10.0001H15.8332M15.8332 10.0001L9.99984 4.16675M15.8332 10.0001L9.99984 15.8334"
        stroke={stroke}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowRight;
