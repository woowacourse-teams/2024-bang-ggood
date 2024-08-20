interface Props extends React.SVGProps<SVGSVGElement> {
  color?: string;
  bgColor?: string;
}

const HomeCircle = ({ color, bgColor, ...rest }: Props) => {
  return (
    <svg width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <rect width="41.8301" height="40" rx="20" fill={bgColor} />
      <path
        d="M20.915 11C20.915 11 14.729 16.34 11.272 19.232C11.162 19.3278 11.0733 19.4457 11.0118 19.578C10.9503 19.7103 10.9173 19.8541 10.915 20C10.915 20.2652 11.0204 20.5196 11.2079 20.7071C11.3955 20.8946 11.6498 21 11.915 21H13.915V28C13.915 28.2652 14.0204 28.5196 14.2079 28.7071C14.3955 28.8946 14.6498 29 14.915 29H17.915C18.1803 29 18.4346 28.8946 18.6221 28.7071C18.8097 28.5196 18.915 28.2652 18.915 28V24H22.915V28C22.915 28.2652 23.0204 28.5196 23.2079 28.7071C23.3955 28.8946 23.6498 29 23.915 29H26.915C27.1803 29 27.4346 28.8946 27.6221 28.7071C27.8097 28.5196 27.915 28.2652 27.915 28V21H29.915C30.1803 21 30.4346 20.8946 30.6221 20.7071C30.8097 20.5196 30.915 20.2652 30.915 20C30.9136 19.8513 30.8784 19.7049 30.8121 19.5718C30.7457 19.4388 30.65 19.3226 30.532 19.232C27.099 16.34 20.915 11 20.915 11Z"
        fill={color}
      />
    </svg>
  );
};

export default HomeCircle;