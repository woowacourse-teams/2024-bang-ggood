export interface Tab {
  name: string;
  id: number;
  className?: string;
}

export interface TabWithCompletion extends Tab {
  hasIndicator: boolean;
}
