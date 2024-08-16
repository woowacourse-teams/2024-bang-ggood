declare module '*.svg' {
  import React = require('react');

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.png' {
  const value: string;
  export default value;
}
