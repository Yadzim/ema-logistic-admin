import { FormInstance } from "antd";
import { ReactNode } from "react";

export type TypeFormUIData<T = any> = {
  name: string;
  label?: string;
  type:
    | "input"
    | "select"
    | "multiselect"
    | "switch"
    | "number"
    | "textarea"
    | "mask"
    | "date"
    | "time"
    | "phone"
    | "password"
    | "file"
    | "lang"
    | "multilang";
  required?: boolean;
  url?: string;
  query_key?: any[] | string;
  span?:
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        xxl?: number;
      }
    | number;
  max?: number;
  rows?: number;
  maxLength?: number;
  parent_name?: string;
  child_names?: string[];
  readonly?: boolean;
  disabled?: boolean;
  child_keys?: string[];
  data?: { id: number | string; name: string }[];
  expand?: string | undefined;
  filter?: Record<string, any>;
  is_expand_id?: boolean | undefined;
  second_parent?: string;
  size?: "small" | "middle" | "large";
  className?: string;
  defaultValue?: any;
  formItemClassName?: string;
  mask?: string;
  format?: string;
  prefix?: string;
  suffix?: string;
  addonBefore?: string;
  addonAfter?: string;
  render?: (e: T) => ReactNode;
  onchange?: (e: any, obj?: any) => any;
};

export type TypeFormUISelect<T = any> = {
  url?: string;
  query_key?: any[] | string;
  label?: string;
  name: string;
  expand?: string;
  filter?: { [key: string]: string | number | undefined };
  is_expand_id?: boolean | undefined;
  parent_name?: string;
  child_names?: string[];
  form: FormInstance<any>;
  disabled?: boolean;
  load?: boolean;
  size?: "large" | "middle" | "small";
  data?: { id: number | string; name: string }[];
  second_parent?: string;
  render?: (e: T) => ReactNode;
  onchange?: any;
  multiselect?: boolean;
  className?: string;
};
