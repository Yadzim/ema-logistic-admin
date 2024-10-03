import { ColumnsType } from "antd/es/table";
import { CustomPagePropType, TypeCustomPageFormUIData } from "./types";
import { Image } from "antd";

// create expand data from formUIData
// export const expandData = (formUIData: CustomPagePropsType["formUIData"]) => {
//   let expands = "";
//   if (formUIData?.length) {
//     formUIData
//       ?.filter((e) => e?.expand_name)
//       .forEach((e) => {
//         expands += "," + e?.expand_name;
//       });
//   }
//   return expands;
// };

// //  create antd table column data from formUIData
// export const formUIDataColums = (data: TypeCustomPageFormUIData[], t: any) => {
//   const arr: CustomTableColumsType<any>[] = [];

//   data?.forEach((e) => {
//     if (!(e?.show == "form" || e?.show == "view")) {
//       if (e?.type === "select") {
//         arr.push({
//           ...(omitObjectKeys(["className"], e)),
//           title: t(e?.label),
//           render: e?.tableRender
//             ? e?.tableRender
//             : (element: any) => typeof element[e?.name] === "number" ? element[e?.name] : renderTitle(element[e?.name]?.title),
//           // element[e?.expand_name ?? e?.name?.split("_id")[0]]?.name,
//         });
//       } else {
//         if(e?.name!=='phone_number_2'){
//           arr.push({
//             ...(omitObjectKeys(["className"], e)),
//             title: t(e?.label),
//             render: e?.tableRender
//             ? e?.tableRender
//             : (element: any) => e?.type === "lang" ? renderTitle(element[e?.name]) : e?.isImage ? <Image width={25} height={25}  src={element?.icon} alt="icon" />: e?.name==="phone_number"? <PhoneNumber phone_number={element?.phone_number} phone_number_2={element?.phone_number_2} />: element[e?.name],
//           });
//         }
//       }
//     }
//   });

//   return arr;
// };



// create expand data from formUIData
export const expandData = (formUIData: TypeCustomPageFormUIData[]) => {
  let expands = ""
  if (formUIData?.length) {
    formUIData?.filter(e => (e?.expand)).forEach(e => {
      expands += "," + e?.expand;
    })
  }
  return expands
}

//  create antd table column data from formUIData
export const formUIDataColums = (data: TypeCustomPageFormUIData[], t: any) => {
  const arr: ColumnsType<any> = [];

  data?.forEach(e => {
    if(e?.show !== "form" && e?.show !== "view" && e?.show !== "form-and-view") {
      if (e?.type === "select") {
        arr.push({
          title: t(e?.label),
          width: e?.width,
          align: e?.align,
          render: e?.tableRender ? e?.tableRender : e?.render ? e?.render : (element: any) => element[e?.expand ?? `${e?.name?.split("Id")[0]}Name`]
        })
      } else {
        arr.push({
          title: t(e?.label),
          width: e?.width,
          align: e?.align,
          render: e?.tableRender ? e?.tableRender : e?.render ? e?.render : (element: any) => element[e?.name]
        })
      }
    }
  });

  return arr
}