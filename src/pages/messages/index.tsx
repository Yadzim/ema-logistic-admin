import CustomPage from 'components/Common/CustomPage';
import { TypeCustomPageFormUIData } from 'components/Common/CustomPage/types';
import React, { } from 'react';

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
    type: "input",
    label: "Xabar matni",
    name: "text",
    tableRender: e => <div className="line-clamp-3">{e?.text}</div>,
    span: 24
  },
]

const Messages: React.FC = (): JSX.Element => {

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
        formUIData={formUIData}
      />
    </div>
  );
};

export default Messages;