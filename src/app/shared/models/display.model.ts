type TDisplay = 'nestedObject' | 'image' | 'namedProperty';

export interface IDisplayProperty {
  label: string;
  url?: string;
  value?: string | number | boolean;
  uiDisplay?: false | TDisplay;
}
