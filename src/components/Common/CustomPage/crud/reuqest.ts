/** @format */

import i18next from "i18next";
import { TypeCustomPageFormUIData } from "../types";
import dayjs from "dayjs";
import instance from "config/axios.config";

export const requesrData = async (
  url: string,
  id: number | undefined,
  data: any,
  formUIData: TypeCustomPageFormUIData[]
) => {
  const formdata = new FormData();
  for (const key in data) {
    const element = formUIData.find((e) => e.name === key);
    if (data[key] != (undefined || null)) {
      if (key === "state") {
        formdata.append("state", data?.state);
      } else if (key === "name" && formUIData.find( e => e.name === key && e.type.includes("lang"))) {
        formdata.append(`name[${i18next?.language}]`, data[key]);
      } else if (key === "description" && formUIData.find( e => e.name === key && e.type.includes("multilang"))) {
        formdata.append(`description[${i18next?.language}]`, data[key]);
      } else if (
        // formUIData.find(
        //   (e) =>
        //     e.name === key &&
        //     (e.type === "date" || e.type === "time") &&
        //     e?.show !== "view" && e?.show !== "table" && e?.show !== "table-and-view"
        // )
        element?.type === "date" || element?.type === "time"
      ) {
        formdata.append(key, String( element?.format ? dayjs(data[key]).format(element?.format) : dayjs(data[key]) ));
      } else {
        formdata.append(key, data[key]);
      }
    }
  }

  const _url = id ? `${url}/${id}` : url;
  const response = await instance({
    url: _url,
    method: id ? "PUT" : "POST",
    data: formdata,
  });

  return response.data;
};
