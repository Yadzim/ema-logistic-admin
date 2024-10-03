import { Button, Col, Modal, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomViewModalPropsType } from '../types';
import { initialFormData } from './formModal';
import { generateAntdColSpan, isRoles, isTrue } from 'utils';
import { BadgeStatusTag } from 'components/Status';

const CustomViewModal: React.FC<CustomViewModalPropsType> = ({ title, open, setOpen, selectedData, setSelectedItem, role: roles, formUIData = initialFormData, }): JSX.Element => {
  const { t } = useTranslation();

  const _formUIData = formUIData?.filter(e => e?.show !== "form" && e.name !== "state");


  console.log(formUIData);


  return (
    <Modal
      open={open === "view"}
      title={<div className="d-f gap-2">
        <span className="">{t(title)}</span>
        {selectedData && isRoles("admin") ? <span className=""> |&nbsp; ID {selectedData?.id}</span> : null}
      </div>}
      className="user-info-modal"
      onCancel={() => { setOpen(undefined); setSelectedItem(undefined); }}
      footer={<div className='flex-between gap-3' >
        {isTrue(selectedData?.state) ? <div className='d-f gap-2' >{t("Status")}: <BadgeStatusTag status={selectedData?.state} /></div> : null}
        {isRoles(roles.update) || roles.update === "*" ?
          <Button className='' type='primary' onClick={() => setOpen("form")}>{t("Update")}</Button> : null}
      </div>}
    >
      <div className='modal__content'>
        <div>

          <Row gutter={[12, 12]}>
            {
              _formUIData ? _formUIData?.map((e, i) => {
                if (e?.type === "lang") {
                  return <div key={e?.name} className='flex-between gap-3'>
                    <b>{t("Name")}</b>
                    <p>{t(selectedData?.name)}</p>
                  </div>
                }
                if (e?.type === "multilang") {
                  return <div key={e?.name}>
                    <div className='flex-between gap-3'>
                      <b className='text-gray-400'>{t("Name")}:</b>
                      <p className='m-0' >{t(selectedData?.name)}</p>
                    </div>
                    <div className='flex-between gap-3'>
                      <b className='text-gray-400'>{t("Description")}:</b>
                      <p className='m-0' >{t(selectedData?.description)}</p>
                    </div>
                  </div>

                }
                return (
                  <Col {...generateAntdColSpan(e?.span)} key={e?.name}>
                    <div className='flex-between gap-3'>
                      <b className='text-gray-400'>{t(e.label)}:</b>
                      <p className='m-0' >{
                        e?.tableRender ?
                          e?.tableRender(selectedData, selectedData, i)
                          : selectedData ? e?.type === "select" ? (typeof selectedData[e?.name] === "string" || typeof selectedData[e?.name] === "number"
                            ? selectedData[e?.name]
                            : (selectedData[e?.name]?.name))
                            : selectedData![e?.name]
                            : null
                      }</p>
                    </div>
                    {/* <div className="input__content">
                      <p className="content__name">{t(e.label)}</p>
                      <p className="content__value">
                        {
                          e?.tableRender ?
                            e?.tableRender(selectedData, selectedData, i)
                            : selectedData ? e?.type === "select" ? (typeof selectedData[e?.name] === "string" || typeof selectedData[e?.name] === "number"
                              ? selectedData[e?.name]
                              : (selectedData[e?.name]?.name))
                              : selectedData![e?.name]
                              : null
                        }
                      </p>
                    </div> */}
                  </Col>
                )
              }) : <></>
            }
          </Row>
        </div>
      </div>
    </Modal>
  );
};

export default CustomViewModal;