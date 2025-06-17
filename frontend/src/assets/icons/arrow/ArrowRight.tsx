interface Props extends React.SVGProps<SVGSVGElement> {
  stroke?: string;
}

const ArrowRight = ({ stroke, ...rest }: Props) => {
  return (
    <svg {...rest} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.4194 11.0807C21.927 11.5884 21.927 12.4115 21.4194 12.9192L14.4194 19.9192C13.9117 20.4269 13.0886 20.4269 12.5809 19.9192C12.0732 19.4115 12.0732 18.5884 12.5809 18.0807L17.3617 13.3H3.50019C2.78222 13.3 2.2002 12.7179 2.2002 12C2.2002 11.282 2.78222 10.7 3.50019 10.7H17.3617L12.5809 5.91919C12.0732 5.41151 12.0732 4.58839 12.5809 4.08071C13.0886 3.57303 13.9117 3.57303 14.4194 4.08071L21.4194 11.0807Z"
        fill={stroke}
      />
    </svg>
  );
};

export default ArrowRight;
