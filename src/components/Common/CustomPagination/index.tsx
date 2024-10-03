import React from "react";
import { Pagination } from "antd";
import { useUrlQueryParams } from "hooks";

type TypeCustomPaginationProps = {
  totalCount?: number | undefined;
  currentPage?: number | undefined;
  perPage?: number | undefined;
  isAll?: boolean;
  showQuickJumper?: boolean;
  showSizeChanger?: boolean
};

const pageSizeOptions = ["10", "15", "20", "30", "50", "100"];

const CustomPagination: React.FC<TypeCustomPaginationProps> = React.memo(
  ({
    totalCount = 0,
    currentPage = 0,
    perPage = 15,
    isAll = false,
    showSizeChanger = true,
    showQuickJumper = true

  }): JSX.Element => {
    const { urlValue: value, writeToUrl } = useUrlQueryParams({});

    return (
      <div className="w-full flex-between gap-4 p-3">
        {/* <Tag color="#F2F2F2" style={{ color: "#494d52" }} className="px-3 h-[30px] flex-center text-[15px]"> */}
        <span className="tag-gray" >Jami: &nbsp; {totalCount}</span>
        {/* </Tag> */}
        <Pagination
          total={totalCount}
          current={(currentPage ?? value.currentPage) + 1}
          defaultPageSize={perPage ?? value.perPage}
          onChange={(e) => {
            writeToUrl({ name: "currentPage", value: (e - 1) });
          }}
          onShowSizeChange={(e, pageSize) => {
            console.log(e);

            writeToUrl({ name: "perPage", value: pageSize });
          }}
          showSizeChanger={showSizeChanger}
          showQuickJumper={showQuickJumper}
          pageSizeOptions={
            isAll ? [...pageSizeOptions, "all"] : pageSizeOptions
          }
        />
      </div>
    );
  }
);

export default CustomPagination;
