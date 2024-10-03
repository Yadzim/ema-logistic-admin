import { TableColumnType, TableProps } from "antd";
import { ReactNode } from "react";

export type CustomTablePropType<T = any> = Omit<TableProps<any>, "columns"> & {
  data: T[];
  columns: CustomTableColumsType<T>[];
  loading: boolean;
  // header?: TableHeaderProps[],
  pagination?: {count: number | undefined},
  showCard?: boolean,
  _export?: {
    url: string,
    file_name: string,
    total: number | undefined,
  }
  tab?: ReactNode
};

export type CustomTableColumsType<T = any> = TableColumnType<T> & {
  showCardHeader?: boolean;
  search?: {
    name: string;
    label?: string;
    onChange?: (value: string, record?: T) => void;
    normalizer?: (value?: string, prev?: string) => string;
  };
  filter?: {
    name: string;
    label?: string;
    url?: string;
    loading?: boolean;
    data?: any[];
    onFilter?: (value: any, data?: any[], record?: T) => void;
    renderValue?: (item : any) => string | number
    renderLabel?: (item : any) => string
  };
  sort?: {
    name: string;
    label?: string;
    onSort?: TableColumnType<T>["sorter"];
  };
  key?: string
};


export type TableHeaderDataType = any[]