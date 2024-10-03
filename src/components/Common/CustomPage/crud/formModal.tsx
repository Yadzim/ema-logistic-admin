import { Button, Divider, Form, Modal, Row, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { CustomFormModalPropsType, TypeCustomPageFormUIData } from '../types';
import CustomFormUI from '../../CustomFormUI';
import { useMutation } from '@tanstack/react-query';
import { requesrData } from './reuqest';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { isTrue } from 'utils';

export const initialFormData: TypeCustomPageFormUIData[] = [
  {
    name: "name",
    label: "Name",
    type: "input",
    required: true,
    span: 24,
  }
]

const CustomFormModal: React.FC<CustomFormModalPropsType> = ({ title, open, setOpen, selectedData, setSelectedItem, url, refetch, formUIData = initialFormData }): JSX.Element => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [state, setState] = useState(selectedData ? selectedData?.state ?? "P" : "A");

  const _formUIData = formUIData?.filter(e => e?.show !== "view" && e?.show !== "table" && e?.show !== "table-and-view" && e.name !== "state");

  useEffect(() => {
    if (selectedData) {
      let obj = {};
      _formUIData?.forEach((e) => {
        if (e.type === "lang" || e.type === "multilang") {
        } else if (e?.type === "date" || e.type === "time") {
          obj = {
            ...obj,
            [e?.name]: selectedData[e?.name] ? e?.format ? dayjs(selectedData[e?.name], e?.format) : dayjs(selectedData[e?.name]) : undefined,
          };
        } else if (e?.type === "select") {
          obj = {
            ...obj,
            [e?.name]: typeof selectedData[e?.name] === "number"
              ? selectedData[e?.name]
              : selectedData[e?.name]?.id
          }
        } else if (e?.type === "multiselect") {
          obj = {
            ...obj,
            [e?.name]: selectedData[e?.name]?.map((a: any) => typeof a === "number" ? a : a?.id)
          }
        } else
          obj = {
            ...obj,
            [e?.name]: e?.render ? e?.render(selectedData) : selectedData[e?.name] ?? undefined,
          };
      });

      form.setFieldsValue({
        name: selectedData?.name,
        description: selectedData?.description,
        state: selectedData?.state === "A" ? true : false,
        ...obj,
      });

    } else {
      form.resetFields();
      form.setFieldsValue({ state: "A" });
    }
  }, [selectedData]);

  // mutate
  const { mutate, isPending } = useMutation({
    mutationFn: (value: any) => requesrData(url, selectedData?.id, { ...value, state }, _formUIData ?? []),
    onSuccess: async (res) => {
      if (res.status == 1) {
        setOpen(undefined);
        setSelectedItem(undefined);
        form.resetFields();
        refetch()
      }
      // if (res.status_code === 400) {
      // validationErrors(form, res.data)
      // } else if (res.status_code === 200 || res.status_code === 201) {
      // setOpen(undefined);
      // form.resetFields();
      // toast.success(tMessage(res?.message));
      // refetch()/
      // } else {
      // toast.success(t(res.message))
      // }
    },
    onError: (error: AxiosError<any>) => {
      console.log(error)
    },
    retry: 0,
  })

  return (
    <Modal
      open={open === "form"}
      title={(title)}
      className="user-info-modal"
      onCancel={() => { setOpen(undefined); setSelectedItem(undefined) }}
      footer={<div className='flex-between gap-3' >
        <div>
          { isTrue(formUIData?.find(e => e?.name === "state")) ? <Switch checkedChildren="Active" unCheckedChildren="InActive" checked={state === "A"} onChange={(e) => { setState(e ? "A" : "P") }} /> : null}
        </div>
        <div className='d-f gap-1'>
          <Button type="primary" danger htmlType="button" onClick={() => { setOpen(undefined); form.resetFields() }}>{t("Cancel")}</Button>
          <Button danger htmlType="reset" onClick={() => { form.resetFields() }}>{t("Reset")}</Button>
          <Button type="primary" htmlType="submit" loading={isPending} onClick={() => form.submit()} >{t("Save")}</Button>
        </div>
      </div>}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={mutate}
        className='my-4'
      >
        <Row gutter={[12, 12]}>
          <CustomFormUI data={_formUIData} form={form} load={selectedData?.id} isUpdate={selectedData?.id} />
        </Row>
      </Form>
      <Divider className='mb-4' />
    </Modal>
  );
};

export default CustomFormModal;