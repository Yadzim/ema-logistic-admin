import { ColumnProps } from "antd/es/table";
import { TypeFormUIData } from "../CustomFormUI/types";
import { MenuItemType } from "antd/es/menu/interface";

export type TypeCustomPageFormUIData = TypeFormUIData & {
  label: string;
  show?: "table" | "view" | "all" | "form" | "table-and-view" | "form-and-view";
  expand?: string;
  // filter?: string;
  render?: ColumnProps<any>["render"];
  tableRender?: ColumnProps<any>["render"];
  width?: number | string;
  align?: "left" | "right" | "center";
};

export type CustomPagePropType = {
  queryKey?: string;
  url: string;
  indexTitle: string;
  createTitle?: string;
  editTitle?: string;
  viewTitle?: string;
  role: {
    view: string | string[];
    delete: string | string[];
    update: string | string[];
    create: string | string[];
  };
  onCreate?: () => void;
  createLink?: string;
  search?: boolean;
  isMain?: boolean;
  table_size?: "small" | "middle" | "large";
  formUIData?: TypeCustomPageFormUIData[];
  btn?: React.ReactNode;
  actions?: {
    onView?: (e?: any) => void | string;
    onEdit?: (e?: any) => void | string;
    viewLink?: string;
    editLink?: string;
    refetch?: any;
    type?: "btn" | "simple";
    extra?: (MenuItemType & { permission?: string; link?: string })[];
    left?: {
      tooltip: string;
      key?: string;
      icon: any;
      onClick?: () => void;
      link?: string;
      permission: string;
    }[];
  };
};

export type CustomViewModalPropsType = {
  open: "view" | "form" | undefined;
  setOpen: React.Dispatch<React.SetStateAction<"view" | "form" | undefined>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
  // id: number | undefined,
  // url: string,
  // refetch: any,
  title: string;
  selectedData: any;
  role: {
    delete: string | string[];
    update: string | string[];
  };
  formUIData?: TypeCustomPageFormUIData[];
};

export type CustomFormModalPropsType = {
  title: string;
  id: number | undefined;
  url: string;
  open: "view" | "form" | undefined;
  setOpen: React.Dispatch<React.SetStateAction<"view" | "form" | undefined>>;
  selectedData?: any;
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
  refetch: Function;
  formUIData?: TypeCustomPageFormUIData[];
};
