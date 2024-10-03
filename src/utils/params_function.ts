export function objectToQueryString(obj: Record<string, any>) {
  if (!obj) return "";
  return Object.keys(obj)
    .filter((key) => obj[key])
    .map((key) => {
      // if (key.endsWith("Id")) return `${key.split("Id")[0]}.${key}=${obj[key]}`;
      // if (key.endsWith("Ids")) return `${key.split("Ids")[0]}s.${key?.slice(0,key.length-1)}=${obj[key]}`;
      if (key.endsWith("Id")) return `${key.split("Id")[0]}_id=${obj[key]}`;
      if (key.endsWith("Ids")) return `${key.split("Ids")[0]}_ids=${obj[key]}`;
      return `${key}=${obj[key]}`;
    })
    .join(",");
}
