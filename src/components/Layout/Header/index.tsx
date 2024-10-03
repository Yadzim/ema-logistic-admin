import React, { } from 'react';
import { Layout } from 'antd';
import { FaAlignLeft, FaAlignRight, FaCircleUser } from 'react-icons/fa6';
import { UI_ACTIONS } from 'stores/ui';
import { useAppDispatch, useAppSelector } from 'stores';

const { Header: AntHeader } = Layout

const Header: React.FC = (): JSX.Element => {

  const dispatch = useAppDispatch();
  const collapsed = useAppSelector(p => p.ui.collapsed);

  console.log(collapsed);


  return (
    <AntHeader className='d-f px-0 pb-2'>
      <div className={`flex-between w-full pe-4`}>
        <div className=" cursor-pointer text-gray-200 hover:text-blue-400" onClick={() => dispatch(UI_ACTIONS.changeCollepsed(!collapsed))} >{!collapsed ? <FaAlignLeft fontSize={18} /> : <FaAlignRight fontSize={18} />}</div>

        {/* <HeaderDropdown /> */}
        <div className="d-f gap-4">
          {/* <div className="h-8 w-24 rounded-lg bg-blue-500/30 cursor-pointer"></div> */}
          <div className="d-f gap-1 cursor-pointer text-white">
            <FaCircleUser size={32} className='text-white/70' />
            {/* <div className="flex-center flex-col py-3">
              <span className='font-semibold' >EMA</span>
              <span >Admin</span>
            </div> */}
          </div>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;