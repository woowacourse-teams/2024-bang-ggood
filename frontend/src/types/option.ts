export interface Option {
  optionId: number;
  optionName: string;
}

export interface OptionWithIcon {
  id: number;
  name: string;
  FilledIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  UnFilledIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  displayName: string;
}
