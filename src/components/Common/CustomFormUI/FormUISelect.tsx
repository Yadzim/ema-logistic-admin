import { Select } from "antd";
import { FC, useEffect } from "react";
import { TypeFormUISelect } from "./types";
import { useGetCacheData } from "hooks";
import { cf_filterOption, objectToQueryString } from "utils";

const FormUISelect: FC<TypeFormUISelect> = ({ url, query_key, label, name, parent_name, child_names, expand, filter, is_expand_id, size, form, disabled = false, data: staticData, load, second_parent, render, onchange, multiselect = false, className }): JSX.Element => {
  // const { t } = useTranslation();

  const _url = `${url?.includes("?") ? url : url + "?sort=-id"}`
  const _filter = {
    ...(filter?.state ? filter : {
      ...filter, state: "A"
    }),
    ...(parent_name ? { [`${parent_name}`]: form?.getFieldValue(parent_name) } : {}),
    ...(second_parent ? {
      [`${second_parent}`]: form?.getFieldValue(second_parent)
    } : {})
  }

  const { data, isFetching, refetch } = useGetCacheData({
    queryKey: [
      ...(query_key ? typeof query_key === "string" ? [query_key] : query_key : [url]),
      ...(parent_name ? [form?.getFieldValue(parent_name)] : []),
      ...(second_parent ? [form?.getFieldValue(second_parent)] : []),
      filter
    ],
    url: _url,
    params: {
      "limit": 100,
      ...(expand ? { expand } : {}),
      ...(parent_name || second_parent || filter ? { filter: objectToQueryString(_filter) } : {})
    },
    enabled: false
    // enabled: !!url && (second_parent ?
    //   (!staticData?.length && (!!parent_name && !!form?.getFieldValue(parent_name)) && (!!second_parent && !!form?.getFieldValue(second_parent)))
    //   : (!staticData?.length && (!!parent_name && !!form?.getFieldValue(parent_name)))),

  });

  // console.log(name + !!url && (second_parent ?
  //   (!staticData?.length && (!!parent_name && !!form?.getFieldValue(parent_name)) && (!!second_parent && !!form?.getFieldValue(second_parent)))
  //   : (!staticData?.length && (!!parent_name && !!form?.getFieldValue(parent_name)))));

  // const { data, isFetching, refetch } = useGetAllData<any>({
  //   queryKey: [query_key ?? url, ],
  //   url: `${url?.includes("?") ? url : url + "?sort=-id"}${expand ? "&expand=" + expand : ""}${parent_name ? `&filter=${JSON.stringify({ [`${parent_name}`]: form?.getFieldValue(parent_name), [`${second_parent}`]: form?.getFieldValue(second_parent? second_parent : "") })}` : ""}`,
  //   urlParams: { "per-page": 0 },
  //   options: {
  //     enabled: second_parent ? (!staticData?.length && (!!parent_name && !!form?.getFieldValue(parent_name)) && (!!second_parent && !!form?.getFieldValue(second_parent))) : (!staticData?.length && (!!parent_name && !!form?.getFieldValue(parent_name)))
  //   }
  // });

  useEffect(() => {
    if (!staticData && !!url) {
      if (!!form?.getFieldValue(parent_name) || !!form?.getFieldValue(second_parent) || load) {
        refetch()
      };
    }
  }, []);

  // useEffect(() => {
  //   if (load) {
  //     if (!staticData && url) {
  //       refetch();
  //       console.log("load ", name);
  //     }
  //   }
  // }, []);

  const handleChange = (value: number | number[]) => {
    // onchange && onchange(value);
    if (onchange) {
      // let selectedItem: any = {}

      if (staticData) {
        const selectedItem = multiselect ? staticData?.filter((e, i) => typeof value !== "number" && value.includes(Number(e?.id) ?? i)) : staticData?.find((e, i) => (e?.id ?? i) == value)
        onchange(value, selectedItem)
      } else {
        const selectedItem = multiselect ? data?.data?.filter((e, i) => typeof value !== "number" && value.includes(Number(e?.id) ?? i)) : data?.data?.find((e, i) => (e?.id ?? i) == value)
        onchange(value, selectedItem)
      }

    }

    form?.setFieldsValue({ [name]: value })

    if (child_names?.length)
      form?.resetFields(child_names)
  }

  const handleClear = () => {
    form.resetFields([name])

    if (child_names?.length)
      form.resetFields(child_names)
  }

  const selectTitle = (item: any) => {
    if (expand) {
      return item[expand]?.name ?? (item[expand]?.last_name + " " + item[expand]?.first_name + " " + item[expand]?.middle_name)
    } else {
      return item?.name ?? (item?.last_name + " " + item?.first_name + " " + item?.middle_name)
    }
  }


  const selectDisable = () => {
    if (parent_name) {
      if (second_parent) {
        return !form?.getFieldValue(parent_name) || !form?.getFieldValue(second_parent)
      } else {
        return !form?.getFieldValue(parent_name)
      }
    } else {
      return disabled ? true : false
    }

  }
  return (
    <Select
      value={form.getFieldValue(name)}
      disabled={selectDisable()}
      onChange={handleChange}
      onClear={handleClear}
      onFocus={() => !staticData && (!data?.data?.length && refetch())}
      loading={isFetching}
      placeholder={(`Select ${label?.toLowerCase()}`) + " ..."}
      allowClear
      showSearch
      size={size}
      filterOption={cf_filterOption}
      mode={multiselect ? "multiple" : undefined}
      className={`w-full ${className}`}
    >
      {
        staticData?.length ? staticData?.map((item, i) => (
          <Select.Option key={i} value={item?.id} >{item?.name}</Select.Option>
        )) : data?.data?.length ? (data?.data)?.map((item: any, i: number) => (
          <Select.Option key={i} value={(is_expand_id && expand) ? item[expand]?.id : item?.id} >{render ? render(item) : selectTitle(item)}</Select.Option>
        )) : null
      }
    </Select>
  )
}

export default FormUISelect;