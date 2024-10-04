import { FC } from "react";
import { Col, DatePicker, Form, FormInstance, Input, InputNumber, Switch, TimePicker } from "antd";
import { TypeFormUIData } from "./types";
import { generateAntdColSpan } from "utils";

const { Item } = Form;

const CustomFormUI: FC<{ data: TypeFormUIData[], form: FormInstance<any>, load?: boolean, isUpdate?: boolean }> = ({ data }): JSX.Element => {
  return (
    <>
      {
        data?.map((form_item, i) => (
          <Col {...generateAntdColSpan(form_item.span)} key={i} className="custom_form_style" >
            {
              <Item
                name={form_item.name}
                label={form_item.label ? <>{form_item.label}</> : undefined}
                rules={[{ required: form_item.required, message: `Please input ${form_item?.label?.toLowerCase()} !` }]}
                shouldUpdate
                valuePropName={form_item.type === "switch" ? "checked" : undefined}
                className={form_item?.formItemClassName ?? "mb-1"}
              >
                {
                  form_item.type === "input" ?
                    <Input defaultValue={form_item?.defaultValue} size={form_item?.size} maxLength={form_item?.maxLength} prefix={form_item?.prefix} suffix={form_item?.suffix} addonAfter={form_item?.addonAfter} addonBefore={form_item?.addonBefore} onChange={(e) => { form_item?.onchange && form_item?.onchange(e) }} readOnly={form_item?.readonly} disabled={form_item?.disabled} className={`w-full ${form_item.className}`} placeholder={(`Enter ${form_item?.label?.toLowerCase()}`) + " ..."} />
                    : form_item.type === "number" ?
                      <InputNumber defaultValue={form_item?.defaultValue} size={form_item?.size} prefix={form_item?.prefix} suffix={form_item?.suffix} addonAfter={form_item?.addonAfter} addonBefore={form_item?.addonBefore} onChange={(e) => { form_item?.onchange && form_item?.onchange(e) }} disabled={form_item?.disabled} readOnly={form_item?.readonly} min={0} max={form_item?.max} className={`w-full ${form_item.className}`} placeholder={(`Enter ${form_item?.label?.toLowerCase()}`) + " ..."} />
                      : form_item.type === "textarea" ?
                        <Input.TextArea defaultValue={form_item?.defaultValue} size={form_item?.size} maxLength={form_item?.maxLength} prefix={form_item?.prefix} onChange={(e) => { form_item?.onchange && form_item?.onchange(e) }} disabled={form_item?.disabled} rows={form_item?.rows ?? 1} readOnly={form_item?.readonly} className={`w-full ${form_item.className}`} placeholder={(`Enter ${form_item?.label?.toLowerCase()}`) + " ..."} />
                        : form_item.type === "switch" ?
                          <Switch defaultChecked={form_item?.defaultValue} onChange={(e) => { form_item?.onchange && form_item?.onchange(e) }} disabled={form_item?.disabled} checkedChildren={form_item.name === "status" ? "Active" : "Ha"} unCheckedChildren={form_item.name === "status" ? "InActive" : "Yo'q"} />
                          : form_item.type === "date" ?
                            <DatePicker defaultValue={form_item?.defaultValue} format={form_item?.format} size={form_item?.size} prefix={form_item?.prefix} onChange={(e) => { form_item?.onchange && form_item?.onchange(e) }} disabled={form_item?.disabled} className={`w-full ${form_item.className}`} />
                            : form_item.type === "time" ?
                              <TimePicker defaultValue={form_item?.defaultValue} format={form_item?.format ?? "HH:mm:ss"} size={form_item?.size} prefix={form_item?.prefix} onChange={(e) => { form_item?.onchange && form_item?.onchange(e) }} disabled={form_item?.disabled} className={`w-full ${form_item.className}`} />
                              : form_item.type === "password" ?
                                <Input.Password defaultValue={form_item?.defaultValue} size={form_item?.size} prefix={form_item?.prefix} suffix={form_item?.suffix} addonAfter={form_item?.addonAfter} addonBefore={form_item?.addonBefore} onChange={(e) => { form_item?.onchange && form_item?.onchange(e) }} autoComplete={`new-password`} className={`w-full ${form_item.className}`} />
                                : null
                }
              </Item>
            }
          </Col>
        ))
      }
    </>
  )
}

export default CustomFormUI;