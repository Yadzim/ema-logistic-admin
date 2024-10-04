import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { formUIDataColums } from "./utils";
import { CustomPagePropType } from "./types";
import { FaSearch } from "react-icons/fa";
import CustomViewModal from "./crud/viewModal";
import CustomFormModal from "./crud/formModal";
import { useDebounce, useGetAllData, useUrlQueryParams } from "hooks";
import { isRoles, isTrue, numeration } from "utils";
import Actions from "components/Actions";
import PageHeader from "components/PageHeader";
import { CreateBtn } from "../CustomButton";
import { BadgeStatusTag } from "components/Status";
import { Link } from "react-router-dom";
import CustomPagination from "../CustomPagination";

const CustomPage: React.FC<CustomPagePropType> = ({
  queryKey,
  indexTitle,
  createTitle,
  editTitle,
  role,
  url,
  viewTitle,
  table_size,
  search,
  formUIData,
  onCreate,
  createLink,
  actions,
  btn,
}): JSX.Element => {
  // const { t } = useTranslation();
  const { urlValue: value, writeToUrl } = useUrlQueryParams({ currentPage: 1, perPage: 15, });

  const [open, setOpen] = useState<"view" | "form" | undefined>();
  const [allData, setAllData] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>();

  const searchVal = useDebounce(value?.filter_like?.q, 500);

  const { data, total, refetch, isLoading } = useGetAllData({
    queryKey: [
      queryKey ?? url,
      value.perPage,
      value.currentPage,
      value?.filter_like?.sort,
      searchVal,
    ],
    url,
    params: {
      limit: value.perPage,
      page: value.currentPage,
    },
  });


  useEffect(() => {
    isTrue(data?.length) && setAllData(data?.messages ?? []);
  }, [data]);

  const columns: ColumnsType<any> = React.useMemo(
    () => [
      {
        title: "№",
        dataIndex: "order",
        render: (_, __, i) =>
          numeration(
            value.currentPage,
            value.perPage,
            Number(i),
            isLoading
          ),
        width: 45,
        align: "center",
        sorter: () => { writeToUrl({ name: "sort", value: value?.filter_like?.sort === "-id" ? "id" : "-id" }); return 0 },

      },
      ...(formUIData ? formUIDataColums(formUIData ?? [], (e: any) => e) : [{
        title: ("Name"),
        render: (e) =>
          isRoles(role.view) ? (
            actions?.viewLink ? (
              <Link to={actions?.viewLink + "/" + e?.id}>{e?.name}</Link>
            ) : (
              <span
                onClick={() => {
                  if (actions?.onView) actions.onView(e);
                  else {
                    setSelectedItem(e);
                    setOpen("view");
                  }
                }
                }
                className="fio_link"
              >
                {e?.name}
              </span>
            )
          ) : (
            <span>{e?.name}</span>
          ),
      },
      {
        title: ("Description"),
        dataIndex: "description",
      },
      {
        title: ("Status"),
        render: (e) => <BadgeStatusTag status={e?.state} />,
        align: "center",
      },]) as ColumnsType<any>,
      {
        title: ("Actions"),
        width: 120,
        align: "center",
        render: (e: any) => (
          <Actions
            id={e?.id}
            url={url}
            onEdit={() => {
              if (!actions?.editLink) {
                if (actions?.onEdit) actions.onEdit(e);
                else {
                  setSelectedItem(e);
                  setOpen("form");
                }
              }
            }}
            onView={() => {
              if (!actions?.viewLink) {
                if (actions?.onView) actions.onView(e);
                else {
                  setSelectedItem(e);
                  setOpen("view");
                }
              }
            }}
            editLink={actions?.editLink}
            viewLink={actions?.viewLink}
            refetch={refetch}
            viewRoles={role.view}
            editRoles={role.update}
            deleteRoles={role.delete}
          />
        ),
      },
    ],
    [data, value]
  );

  return (
    <div className="card p-3">
      <PageHeader
        title={indexTitle}
        btn={<div className="flex-end gap-3">{btn} <Link to={createLink ?? ""}><CreateBtn role={role.create} onClick={onCreate && !createLink ? onCreate : () => setOpen("form")} /></Link> </div>}
      />
      <div className="md:d-f gap-3">
        {search ? <Input
          className=""
          placeholder={`${("Search by name")}...`}
          prefix={<FaSearch fontSize={20} color="#b9b9b9" />}
          onChange={(e) =>
            writeToUrl({ name: "q", value: e.target.value })
          }
          allowClear
        /> : null}
      </div>
      <div className="">
        {!actions?.onView ? (
          <CustomViewModal
            role={{
              delete: role.delete,
              update: role.update,
            }}
            open={open}
            setOpen={setOpen}
            selectedData={selectedItem}
            setSelectedItem={setSelectedItem}
            title={viewTitle ?? (indexTitle + " view")}
            formUIData={formUIData?.filter((e) => e?.show !== "form" && e?.show !== "table")}
          />
        ) : null}
        {!actions?.onEdit || !onCreate ? (
          <CustomFormModal
            id={selectedItem?.id}
            open={open}
            setOpen={setOpen}
            refetch={refetch}
            url={url}
            selectedData={selectedItem}
            setSelectedItem={setSelectedItem}
            title={selectedItem?.id ? editTitle ?? (indexTitle + " edit") : createTitle ?? (indexTitle + " create")}
            formUIData={formUIData?.filter((e) => e?.show !== "view" && e?.show !== "table" && e?.show !== "table-and-view")}
          />
        ) : null}

        <Table
          columns={columns}
          dataSource={data?.messages?.length ? data?.messages : allData}
          // bordered
          pagination={false}
          loading={isLoading}
          size={table_size ?? "small"}
          className="mt-3"
          rowClassName="py-[12px]"
          scroll={{ x: 576 }}
        />
        {(total ?? 0) > 10 ? (
          <CustomPagination
            totalCount={total}
            currentPage={value.currentPage}
            perPage={value.perPage}
          />
        ) : undefined}
      </div>
    </div>
  );
};

export default CustomPage;