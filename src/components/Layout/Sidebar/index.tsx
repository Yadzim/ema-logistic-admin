import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { filterLinksForSidebar } from '.././utils';
import { useAppDispatch, useAppSelector } from 'stores';
import { UI_ACTIONS } from 'stores/ui';
import logo from 'assets/images/logo3.png';

const { Sider } = Layout;

const Sidebar: React.FC = () => {

    const pathname = window.location.pathname;
    const dispatch = useAppDispatch();
    const collapsed = useAppSelector(p => p.ui.collapsed);

    const [openKeys, setOpenKeys] = useState<string[]>([]);

    return (
        <>
            <Sider
                theme='dark'
                collapsible
                collapsed={!collapsed}
                onCollapse={(value) => dispatch(UI_ACTIONS.changeCollepsed(value))}
                className={" overflow-y-auto h-screen"}
            >
                <div className="demo-logo-vertical" />
                <div className='text-center mb-6 mt-2'>
                    <img src={logo} className={`transition mx-auto ${!collapsed ? "hidden" : "h-[60px] mt-12"}`} alt="logo" />
                    {!collapsed ? <h1 className='mt-4 text-orange-600 text-xl leading-normal font-serif' >EMA</h1> : null}
                </div>
                <Menu theme="dark" defaultSelectedKeys={[pathname]} activeKey={pathname} openKeys={openKeys} onOpenChange={(e) => { setOpenKeys(e?.length > 1 ? [e?.reverse()[0]] : e) }} mode="inline" items={filterLinksForSidebar()} />
            </Sider>
        </>
    );
};

export default Sidebar;