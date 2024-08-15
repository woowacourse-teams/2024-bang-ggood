export interface Option {
  optionId: number;
  optionName: string;
}

export interface OptionWithIcon {
  id: number;
  name: string;
  Filled: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  Unfilled: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  displayName: string;
}
