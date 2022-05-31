export interface ActionbarModel {
  isBackDisabled: boolean;
  actions: ActionItem[];
}

interface ActionItem {
  title: string;
  iconPath: string;
  link: string[];
  classes?: string[];
}
