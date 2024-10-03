

// export const numeration = (page:number, pageSize:number, index: number, loading: boolean) => {
//   return !loading ? (pageSize * page + index - pageSize + 1) : "-"
// }

export const numeration = (offset: number, limit: number, index: number, loading: boolean) => {
  console.log(offset, limit, index, loading);

  return !loading ? (limit * (offset ?? 0) + index + 1) : "-";
}