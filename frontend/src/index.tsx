import Box from '@/components/Box';
import ReactDOM from 'react-dom/client';

export const Index = () => {
  console.log('checking how husky works');
  return (
    <div>
      index
      <Box />
    </div>
  );
};

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(<Index />);
