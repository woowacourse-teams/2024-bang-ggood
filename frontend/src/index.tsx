import React from 'react';
import ReactDOM from 'react-dom/client';

export const Index = () => {
  return <div>index</div>;
};

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(<Index />);
