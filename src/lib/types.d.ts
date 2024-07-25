export type Roles = string[];
export type TableAction = { label: string; action: string };
export type TableActionCallback = (action: unknown, row: object) => void;
