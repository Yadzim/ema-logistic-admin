

// ant select search field
export const cf_filterOption = (input: string, option: any) => {
  return (
    String(option?.children)
      .toLowerCase()
      .indexOf(String(input).toLowerCase()) >= 0
  );
};


// generate antd Col span
export const generateAntdColSpan = (
  span:
    | number
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        xxl?: number;
      }
    | undefined
) => {
  if (typeof span === "number") return { span };

  let initialSpan: any = { xs: 24, sm: 24, md: 12, lg: 8, xl: 6 };
  if (span) {
    Object.entries(span)?.forEach(([key, value]) => {
      initialSpan = { ...initialSpan, [key]: value };
    });
  }
  return initialSpan;
};



export const renderFullName = (item: any) => {
  return item?.last_name + " " + item?.first_name + " " + item?.middle_name;
};


/**
 * check the role from the user's role list
 * @param seconds secund (number)
 * @returns secund => HH:mm:ss format (string)
 */
export const toHHmmss = (second: number) => {
  const date = (new Date(second * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/);

  if(date?.length) return date[0];
  else return "00:00:00"
}


/**
 * 
 * @param q string
 * @param last_name string
 * @param first_name string
 * @param middle_name string
 * @returns  true if q is in last_name, first_name or middle_name
 */
export const searchFullName = (q: string = "", last_name: string, first_name: string, middle_name: string) => {
  return first_name?.toUpperCase()?.includes(q?.toUpperCase()) 
  || last_name?.toUpperCase()?.includes(q?.toUpperCase()) 
  || middle_name?.toUpperCase()?.includes(q?.toUpperCase())
  || q?.toUpperCase()?.includes(last_name?.toUpperCase())
  || q?.toUpperCase()?.includes(first_name?.toUpperCase())
  || q?.toUpperCase()?.includes(middle_name?.toUpperCase())
}

export const isTrue = (value: any) => {
    return typeof value !== "undefined"
      && value !== null
      // && value !== ""
      // && value !== false
}