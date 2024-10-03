import { ReactElement, useEffect } from "react"
import { Layout as AntLayout } from 'antd';
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useWindowSize } from "hooks";
import { UI_ACTIONS } from "stores/ui";
import { useAppDispatch } from "stores";
const { Content } = AntLayout;

type PropsTypeCLayout = {
    children: ReactElement
}

const Layout: React.FC<PropsTypeCLayout> = ({ children }): JSX.Element => {

    const dispatch = useAppDispatch();
    const { width } = useWindowSize();

    useEffect(() => {
        if (width < 992) {
            dispatch(UI_ACTIONS.changeCollepsed(false))
        } else {
            dispatch(UI_ACTIONS.changeCollepsed(true))
        }
    }, [width])

    return (
        <AntLayout style={{ minHeight: '100vh', backgroundColor: "#F9FAFB" }}>
            <Sidebar />
            <AntLayout>
                <Header />
                <Content className={`h-[calc(100vh-56px)] -mt-2 rounded-l-lg bg-[#F5F5F5] grid z-50 relative`}>
                    <div className="relative p-4 pt-6 w-full overflow-y-auto grid-">
                        {children}
                    </div>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>©2023</Footer> */}
            </AntLayout>
        </AntLayout>
    )
}
export default Layout