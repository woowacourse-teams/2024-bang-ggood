export interface Tab {
  name: string;
  id: number;
}

export interface TabWithCompletion extends Tab {
  isCompleted: boolean;
}
