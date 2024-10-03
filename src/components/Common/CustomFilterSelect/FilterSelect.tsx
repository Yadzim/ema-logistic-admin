import { Col, Select } from "antd";
import { useGetCacheData, useUrlQueryParams } from "hooks";
import { FC, ReactNode, useEffect } from "react";
import { isRoles, cf_filterOption, generateAntdColSpan, objectToQueryString } from "utils";

export type TypeFilterSelectData<T = any> = {
  url?: string,
  query_key?: string[]
  label: string,
  name: string,
  roles: string[] | string,
  parentRoles?: string[] | string,
  value_name?: string,
  parent_name?: string,
  child_names?: string[],
  filter?: { [key: string]: string | number | undefined | string[] },
  params?: Record<string, string>,
  render?: (e: T) => ReactNode,
  span?: { xs?: number, sm?: number, md?: number, lg?: number, xl?: number, xxl?: number } | number,
  staticData?: { id: number, name: ReactNode }[],
  onChange?: (id: number, item?: any) => void,
  disable?: boolean,
  className?: string
}

const FilterSelect: FC<TypeFilterSelectData> = ({ url, query_key, label, name, roles, parentRoles, parent_name, child_names, span, value_name, filter = {}, params, render, staticData, onChange, disable, className }): JSX.Element => {
  // const { t } = useTranslation();
  const { urlValue: value, writeToUrl } = useUrlQueryParams({});

  const queryKey = [...(query_key ?? [`${url}-c-list`]), ...(parent_name ? [value.filter[parent_name]] : [])];
  const _filter = { ...filter, ...(parent_name && ((parentRoles && isRoles(parentRoles)) || !parentRoles) ? { [`${parent_name}`]: value.filter[parent_name] } : "") };

  const { data, isFetching, refetch } = useGetCacheData({
    queryKey,
    url: url ?? "",
    params: {
      "limit": 100,
      // sort: `${url}Id`,
      ...params,
      ...(_filter ? { "filter": objectToQueryString(_filter) } : {})
    },
    enabled: false
    // enabled: !(staticData?.length || !isHasAuthRoute(permission)) && (!!parent_name && !!value.filter[parent_name]
  })

  useEffect(() => {
    if (value.filter[name]) {
      if (!staticData) {
        refetch();
      }
    }
  }, []);

  const handleChange = (value: number) => {
    let selectedItem: any = {};

    selectedItem = data?.data?.find((i: any) => i?.id === value);

    if (onChange) onChange(value, selectedItem)

    // writeToUrl({ name, value, items: data?.data });
    writeToUrl({ name, value: value ?? "" });
    child_names?.forEach(name => {
      writeToUrl({ name, value: '', items: [] });
    })
  }

  const handleClear = () => {
    writeToUrl({ name, value: '', items: [] });
    child_names?.forEach(name => {
      writeToUrl({ name, value: '', items: [] });
    })
  }

  return (
    isRoles(roles) || roles === "*" ?
      <Col {...generateAntdColSpan(span)} className={className} >
        <Select
          className="w-[100%]"
          placeholder={`${(`Filter by ${label.toLowerCase()}`)}`}
          allowClear
          disabled={disable ? true : parent_name && ((parentRoles && isRoles(parentRoles)) || !parentRoles) ? !value.filter[parent_name] : false}
          value={value.filter[name]}
          onChange={handleChange}
          onClear={handleClear}
          onFocus={() => !staticData && !data?.data?.length && refetch()}
          showSearch
          filterOption={cf_filterOption}
          loading={isFetching}
        >
          {
            !staticData?.length ? (data?.data?.length ?
              data?.data.map((element: any) => !value_name ?
                <Select.Option key={element.id} value={element.id}>{render ? render(element) : element?.name}</Select.Option>
                : <Select.Option key={element.id} value={element[`${value_name.toLowerCase()}Id`]}>{render ? render(element) : element[value_name]?.name}</Select.Option>)
              : value.item[name] ? [value.item[name]]?.map((element) => <Select.Option key={element.id} value={element.id}>{render ? render(element) : element?.name}</Select.Option>) : null)
              : staticData.map(i => <Select.Option key={i?.id} value={i.id}>{render ? render(i) : i?.name}</Select.Option>)
          }
        </Select>
      </Col>
      : <></>
  )
}

export default FilterSelect;