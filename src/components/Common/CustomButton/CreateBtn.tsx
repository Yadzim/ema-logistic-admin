import { Button, ButtonProps } from 'antd';
import React, { } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { isRoles, omitObjectKeys } from 'utils';

const CreateBtn: React.FC<Omit<ButtonProps, "role"> & { role?: string | string[], link?: string }> = (props): JSX.Element => {

  const { t } = useTranslation();

  if (props.role && !isRoles(props.role)) return <></>

  if (props.link) return <Link to={props.link}><Button {...omitObjectKeys(props, ["role"])} /></Link>

  return (
    <Button {...omitObjectKeys(props, ["role"])} type='primary' icon={<FaPlus />}>{t("Create")}</Button>
  );
};

export default CreateBtn;