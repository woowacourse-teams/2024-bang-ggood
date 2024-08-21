interface Props extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  stroke?: string;
}

const Home = ({ fill, stroke, ...rest }: Props) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        opacity="0.12"
        d="M3.75 13.2063C3.75 12.4884 3.75 12.1294 3.84253 11.7988C3.9245 11.506 4.05921 11.2306 4.24003 10.9861C4.44417 10.7101 4.72753 10.4897 5.29424 10.0489L13.7721 3.455C14.2113 3.11343 14.4309 2.94265 14.6733 2.877C14.8873 2.81908 15.1127 2.81908 15.3267 2.877C15.5691 2.94265 15.7887 3.11343 16.2279 3.455L24.7058 10.0489C25.2725 10.4897 25.5558 10.7101 25.76 10.9861C25.9408 11.2306 26.0755 11.506 26.1575 11.7988C26.25 12.1294 26.25 12.4884 26.25 13.2063V22.25C26.25 23.6501 26.25 24.3502 25.9775 24.885C25.7378 25.3554 25.3554 25.7378 24.885 25.9775C24.3502 26.25 23.6501 26.25 22.25 26.25H7.75C6.34987 26.25 5.6498 26.25 5.11502 25.9775C4.64462 25.7378 4.26217 25.3554 4.02248 24.885C3.75 24.3502 3.75 23.6501 3.75 22.25V13.2063Z"
        fill={fill}
      />
      <path
        d="M10.1575 17.5C10.7126 19.6565 12.6702 21.25 15 21.25C17.3298 21.25 19.2874 19.6565 19.8425 17.5M13.7721 3.455L5.29424 10.0489C4.72753 10.4897 4.44417 10.7101 4.24003 10.9861C4.05921 11.2306 3.9245 11.506 3.84253 11.7988C3.75 12.1294 3.75 12.4884 3.75 13.2063V22.25C3.75 23.6501 3.75 24.3502 4.02248 24.885C4.26217 25.3554 4.64462 25.7378 5.11502 25.9775C5.6498 26.25 6.34987 26.25 7.75 26.25H22.25C23.6501 26.25 24.3502 26.25 24.885 25.9775C25.3554 25.7378 25.7378 25.3554 25.9775 24.885C26.25 24.3502 26.25 23.6501 26.25 22.25V13.2063C26.25 12.4884 26.25 12.1294 26.1575 11.7988C26.0755 11.506 25.9408 11.2306 25.76 10.9861C25.5558 10.7101 25.2725 10.4897 24.7058 10.0489L16.2279 3.455C15.7887 3.11343 15.5691 2.94265 15.3267 2.877C15.1127 2.81908 14.8873 2.81908 14.6733 2.877C14.4309 2.94265 14.2113 3.11343 13.7721 3.455Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Home;
