export interface Address {
  address: string;
  buildingName: string;
  jibunAddress: string;
}

export interface OpenOptions {
  q?: string;
}

export interface EmbedOptions {
  q?: string;
}

export interface Postcode {
  open(openOptions?: OpenOptions): void;
  embed(element: HTMLElement, embedOptions?: EmbedOptions): void;
}

export interface Size {
  width: number;
  height: number;
}

export interface PostcodeOptions {
  oncomplete?: (address: Address) => void;
  width?: string | number;
  height?: string | number;
}

export interface PostcodeConstructor {
  new (postcodeOptions: PostcodeOptions): Postcode;
}
