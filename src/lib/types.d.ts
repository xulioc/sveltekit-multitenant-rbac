export type Roles = string[];
export type TableAction = Array<{ label: string; action: string }>;
export type TableActionCallback = (action: string, row: object) => void;
