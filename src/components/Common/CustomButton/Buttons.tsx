import { Button, ButtonProps } from 'antd';
import React, { } from 'react';

const Buttons: React.FC<ButtonProps> = (props): JSX.Element => {

  return (
    <Button {...props} />
  );
};

export default Buttons;