import Box from '@/components/Box';
import React from 'react';
import ReactDOM from 'react-dom/client';

export const Index = () => {
  console.log('checking how husky works');
  console.log('checking how husky works again');
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
