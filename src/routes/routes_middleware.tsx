import { Route, Routes, Navigate } from 'react-router-dom'
import { protected_routes, public_routes } from "./routes";
import { RoutesTypeElement } from "./types";
import { useAppSelector } from '../stores';
import { Login, NotFound } from '../pages';
import Layout from 'components/Layout';

function RenderComponent(MyComponent: RoutesTypeElement | Omit<RoutesTypeElement, 'submenu'>) {


    const Component = MyComponent.component;

    if (MyComponent.config.structure === 'layout') {

        return (
            <Layout>
                <Component />
            </Layout>
        )
    }

    return <Component />

}

const RoutesMiddleware = () => {

    const render_route = (element: RoutesTypeElement | Omit<RoutesTypeElement, 'submenu'>) => {

        return <Route key={element.config.key} path={element.path} element={RenderComponent(element)} />

    }

    const auth = useAppSelector(state => state.auth);

    if (auth.isAuthenticated) {

        return (
            <Routes>
                {
                    protected_routes.length && protected_routes.map((element) => {

                        if (element?.submenu?.length) {

                            return element.submenu.map((childElement) => render_route(childElement))
                        }

                        return render_route(element)

                    })
                }
                <Route path="/signin" element={<Navigate to="/" />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        )
    }


    return (
        <Routes>
            {
                public_routes?.length && public_routes?.map((element) => {

                    if (element?.submenu?.length) {
                        return element.submenu.map((childElement) => render_route(childElement))
                    }

                    return render_route(element)
                })
            }
            <Route path="*" element={<Navigate to={localStorage.getItem("access_token") ? window.location.pathname : "/signin"} replace />} />
            <Route path="*" element={<Login />} />

        </Routes>
    )




}



export default RoutesMiddleware;