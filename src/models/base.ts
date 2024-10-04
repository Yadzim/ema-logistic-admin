export interface IBaseAllData {
  data: Record<string, any>;
  message: string;
  status: 1 | 0;
  total?: number;
}

export interface IBaseOneData {
  data: Record<string, any>;
  message: string;
  status: 1 | 0;
  total?: number;
}
