export interface ActionbarModel {
  isBackDisabled?: boolean;
  actions: ActionItem[];
}

export interface ActionItem {
  title: string;
  iconType: string;
  link?: string[];
  color?: 'green' | 'orange' | 'red';
  isDisabled?: boolean;
  isLoading?: boolean;
}
