export interface Tab {
  id: number;
  name: string;
  className?: string;
}

export interface TabWithCompletion extends Tab {
  isCompleted: boolean;
}
