import { Row } from 'antd';
import React, { useState, useEffect, ReactNode } from 'react';
import FilterSelect, { TypeFilterSelectData } from './FilterSelect';

export type CustomFilterSelectsPropsType = {
  data: TypeFilterSelectData[],
  gutter?: number | [number, number],
  className?: string,
  extraStart?: ReactNode,
  extraEnd?: ReactNode,
};

const CustomFilterSelects: React.FC<CustomFilterSelectsPropsType> = ({data, gutter, className, extraStart, extraEnd}): JSX.Element => {

  return (
    <Row className={`custom_form_style ${className}`} gutter={gutter ?? [12, 12]}>
      {extraStart}
      {
        data?.map(selectData => <FilterSelect key={selectData?.name} {...selectData}/>)
      }
      {extraEnd}
    </Row>
  );
};

export default CustomFilterSelects;