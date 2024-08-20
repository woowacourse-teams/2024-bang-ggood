interface Props extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?: string;
}

const Checklist = ({ fill, stroke, ...rest }: Props) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        opacity="0.12"
        d="M20.25 26.25C22.3502 26.25 23.4003 26.25 24.2025 25.8413C24.9081 25.4818 25.4818 24.9081 25.8413 24.2025C26.25 23.4003 26.25 22.3502 26.25 20.25V9.75C26.25 7.6498 26.25 6.59971 25.8413 5.79754C25.4818 5.09193 24.9081 4.51825 24.2025 4.15873C23.4003 3.75 22.3502 3.75 20.25 3.75L9.75 3.75C7.6498 3.75 6.59971 3.75 5.79754 4.15873C5.09193 4.51825 4.51825 5.09193 4.15873 5.79754C3.75 6.5997 3.75 7.6498 3.75 9.75L3.75 20.25C3.75 22.3502 3.75 23.4003 4.15873 24.2025C4.51825 24.9081 5.09193 25.4817 5.79754 25.8413C6.5997 26.25 7.6498 26.25 9.75 26.25H20.25Z"
        fill={fill}
      />
      <path
        d="M20.25 3.75H9.75C7.6498 3.75 6.5997 3.75 5.79754 4.15873C5.09193 4.51825 4.51825 5.09193 4.15873 5.79754C3.75 6.5997 3.75 7.6498 3.75 9.75V20.25C3.75 22.3502 3.75 23.4003 4.15873 24.2025C4.51825 24.9081 5.09193 25.4818 5.79754 25.8413C6.5997 26.25 7.6498 26.25 9.75 26.25H20.25C22.3502 26.25 23.4003 26.25 24.2025 25.8413C24.9081 25.4818 25.4818 24.9081 25.8413 24.2025C26.25 23.4003 26.25 22.3502 26.25 20.25V9.75C26.25 7.6498 26.25 6.5997 25.8413 5.79754C25.4818 5.09193 24.9081 4.51825 24.2025 4.15873C23.4003 3.75 22.3502 3.75 20.25 3.75Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 15L12.7929 18.0429C13.0404 18.2904 13.1642 18.4142 13.3069 18.4605C13.4324 18.5013 13.5676 18.5013 13.6931 18.4605C13.8358 18.4142 13.9596 18.2904 14.2071 18.0429L21 11.25"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Checklist;