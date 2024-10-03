import { Button, Dropdown, Modal, Popconfirm, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { delete_data } from "services";
import { FaAngleDown, FaEye, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import { MenuItemType } from "antd/es/menu/interface";
import { isRoles } from "utils";

type TypeActions = {
  id: number;
  url: string;
  onView: () => void | string;
  onEdit: () => void | string;
  viewLink?: string;
  editLink?: string;
  viewRoles: string | string[];
  editRoles: string | string[];
  deleteRoles: string | string[];
  refetch?: any;
  type?: "btn" | "simple";
  extra?: (MenuItemType & { roles?: string | string[]; link?: string })[];
  left?: {
    tooltip: string;
    key?: string;
    icon: any;
    onClick?: () => void;
    link?: string;
    roles: string | string[];
  }[];
  block?: boolean;
};

const { confirm } = Modal;

const Actions: React.FC<TypeActions> = ({ id, url, onView, onEdit, viewLink, editLink, viewRoles, editRoles, deleteRoles, refetch, type, extra, left, block }) => {
  const { t } = useTranslation();

  const items = extra?.filter((menu) => (menu?.roles ? isRoles(menu.roles) : true));

  const showDeleteConfirm = () => {
    confirm({
      title: t("Are you sure delete?"),
      icon: null,
      okText: t("Delete"),
      className: "custom__confirm__modal",
      cancelText: t("Cancel"),
      onOk() {
        mutate();
      },
    });
  };

  const { mutate } = useMutation({
    mutationFn: () => delete_data(url, id),
    onSuccess: () => {
      // toast.success(tMessage(res?.data?.message));
      refetch();
    },
  });

  return (
    <>
      <div className={`${style.table_actions} ${block ? "w-full flex justify-evenly" : ""}`}>
        {/* <Button.Group  > */}
        {left?.map((item) =>
          item.roles === "*" || isRoles(item.roles) ? (
            <Tooltip mouseEnterDelay={0} mouseLeaveDelay={0} placement="top" title={t(item.tooltip)}>
              {
                item.link ?
                  <Link to={item.link} className={style.icon}>
                    <Button size="small" type={type === "btn" ? "default" : "text"} className={style.icon} >
                      {item.icon}
                    </Button>
                  </Link>
                  :
                  <Button size="small" type={type === "btn" ? "default" : "text"} className={style.icon} onClick={item.onClick}>
                    {item.icon}
                  </Button>
              }
            </Tooltip>
          ) : null
        )}

        {isRoles(viewRoles) || viewRoles === "*" ? (
          <Tooltip placement="topLeft" title={t("View")}>
            {viewLink ?
              <Link to={viewLink} >
                <Button size="small" type={type === "btn" ? "default" : "text"} className={style.icon} >
                  <FaEye />
                </Button>
              </Link>
              : <Button size="small" type={type === "btn" ? "default" : "text"} className={style.icon} onClick={onView} >
                <FaEye />
              </Button>}
          </Tooltip>
        ) : null}

        {isRoles(editRoles) || editRoles === "*" ? (
          <Tooltip placement="topLeft" title={t("Edit")}>
            {editLink ?
              <Link to={editLink} className={style.icon} >
                <Button size="small" type={type === "btn" ? "default" : "text"} className={style.icon} >
                  <FaRegEdit />
                </Button>
              </Link>
              : <Button size="small" type={type === "btn" ? "default" : "text"} className={style.icon} onClick={onEdit} >
                <FaRegEdit />
              </Button>
            }
          </Tooltip>
        ) : null}

        {isRoles(deleteRoles) || deleteRoles === "*" ? (
          <Tooltip placement="topRight" title={t("Delete")}>
            <Popconfirm placement="topLeft" title={`${t("Deleted it")} ?`} okText={t("Yes")} cancelText={t("No")} onConfirm={showDeleteConfirm}>
              <Button size="small" type={type === "btn" ? "default" : "text"} className={style.icon}>
                <FaTrashAlt className={style.delete} />
              </Button>
            </Popconfirm>
          </Tooltip>
        ) : null}

        {items?.length ? (
          items?.length > 1 ? (
            <Dropdown menu={{ items: items?.map((item) => ({ ...item, label: item?.link ? <Link className="no-underline" to={item.link}>{item?.label}</Link> : item?.label })) }} trigger={["click"]}>
              <Button size="small" type={type === "btn" ? "default" : "text"} className={style.icon}>
                <FaAngleDown />
                {/* <FaChevronDown /> */}
              </Button>
            </Dropdown>
          )

            : (items[0]?.roles ? isRoles(items[0].roles) : true) ? (
              <Tooltip
                placement="topLeft"
                title={typeof items[0]?.label == "string" ? t(items[0]?.label) : items[0]?.label}
              >
                {
                  typeof items[0]?.link ?
                    <Link to={items[0].link ?? ""} className={style.icon} >
                      <Button size="small" type="text" className={style.icon} >
                        {items[0]?.icon}
                      </Button>
                    </Link>
                    :
                    <Button size="small" type="text" className={style.icon} onClick={items[0]?.onClick ? (items[0].onClick as () => void) : () => { }}>
                      {items[0]?.icon}
                    </Button>
                }
              </Tooltip>
            ) : null

        ) : null}
        {/* </Button.Group> */}

      </div>
    </>
  );
};

export default Actions;
