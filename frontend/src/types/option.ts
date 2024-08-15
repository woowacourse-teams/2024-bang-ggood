export interface OptionWithIcon {
  id: number;
  name: string;
  FilledIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  UnFilledIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  displayName: string;
}
