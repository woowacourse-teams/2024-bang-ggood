export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type AllString<T> = {
  [K in keyof T]: string;
};
