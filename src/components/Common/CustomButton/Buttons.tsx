import { Button, ButtonProps } from 'antd';
import React, { useState, useEffect } from 'react';

const Buttons: React.FC<ButtonProps> = (props): JSX.Element => {

  return (
    <Button {...props} />
  );
};

export default Buttons;