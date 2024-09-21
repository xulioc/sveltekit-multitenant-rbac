export type Roles = string[];
export type TableActionAction = { action: string; row: object };
export type TableAction = { label: string; action: TableActionAction };
export type TableActionCallback = (action: unknown, row: object) => void;
