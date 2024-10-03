import React from 'react';
import { Layout, Menu } from 'antd';
import { filterLinksForSidebar } from '.././utils';
import Logo from 'assets/images/vite.svg';
import { useAppDispatch, useAppSelector } from 'stores';
import { UI_ACTIONS } from 'stores/ui';

const { Sider } = Layout;

const Sidebar: React.FC = () => {

    const pathname = window.location.pathname;
    const dispatch = useAppDispatch();
    const collapsed = useAppSelector(p => p.ui.collapsed);

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
                    <img src={Logo} className={`transition mx-auto ${!collapsed ? "w-[30px] mt-4" : "w-[60px] mt-4"}`} alt="logo" />
                    {collapsed ? <h1 className='mt-4 text-white text-2xl leading-normal font-serif' >EduTracker</h1> : null}
                    {/* {
                        collapsed ?
                        <h1 className='text-white mt-4'>ET</h1>
                        :<img src={Logo} className='w-[100px] mt-4' alt="perfect university logo" />
                    } */}
                </div>
                <Menu theme="dark" defaultSelectedKeys={[pathname]} activeKey={pathname} mode="inline" items={filterLinksForSidebar()} />
            </Sider>
        </>
    );
};

export default Sidebar;