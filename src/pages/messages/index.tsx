import { Modal } from 'antd';
import CustomPage from 'components/Common/CustomPage';
import { TypeCustomPageFormUIData } from 'components/Common/CustomPage/types';
import dayjs from 'dayjs';
import React, { useState } from 'react';

const formUIData: TypeCustomPageFormUIData[] = [
  {
    type: "input",
    label: "To'liq ismi",
    name: "fullName",
    required: true,
    span: 24
  },
  {
    type: "input",
    label: "Telefon raqami",
    name: "phone",
    span: 24
  },
  {
    type: "date",
    label: "Jo'natilgan vaqt",
    name: "createdAt",
    tableRender: e => <div>{dayjs(e?.createdAt).format("DD.MM.YYYY HH:mm")}</div>,
    span: 24
  },
  {
    type: "input",
    label: "Xabar matni",
    width: "50%",
    name: "text",
    tableRender: e => <div className="line-clamp-2">{e?.text}</div>,
    span: 24
  },
]

const Messages: React.FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>();

  return (
    <div className="">
      <CustomPage
        url="messages"
        indexTitle="Xabarlar"
        role={{
          view: "*",
          delete: "_",
          update: "_",
          create: "_",
        }}
        actions={{
          onView: (e) => { setOpen(true); setSelectedItem(e); },
        }}
        formUIData={formUIData}
      />

      <Modal
        open={open}
        // title={<>Xabar | <span className="text-sm text-info">{dayjs(selectedItem?.createdAt).format("DD.MM.YYYY HH:mm")}</span></>}
        title={<h1 className='text-lg font-medium ' >{selectedItem?.fullName}</h1>}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <div className="flex flex-col gap-1">
          <p className='mb-4' >{selectedItem?.phone}</p>
          <span className="text-sm text-info">{dayjs(selectedItem?.createdAt).format("DD.MM.YYYY HH:mm")}</span>
          {/* <h1 className='text-lg font-medium ' >{selectedItem?.fullName}</h1>
          <p className='' >{selectedItem?.phone}</p> */}
          <div className="rounded-md bg-gray-400/5 p-2">
            <p>{selectedItem?.text}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Messages;