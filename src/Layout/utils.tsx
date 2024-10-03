import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import { protected_routes } from "routes/routes";

function IconComponent(IconName: string) {

    const IconComponent = IconName;

    return <IconComponent />
}

type MenuItem = Required<MenuProps>['items'][number];
/**
 * @returns filtered array
 */
export const filterLinksForSidebar = (): MenuItem[] => {


    const sidebar_links: MenuItem[] = [];

    for (let index = 0; index < protected_routes.length; index++) {

        const parent_element = protected_routes[index];

        if ((parent_element.config.isMuenu) || (!parent_element.config.key && !parent_element.component) || (parent_element.config.key === "*" && parent_element.config.isMuenu)) {

            let new_sub_element: MenuItem[] = [];

            if (parent_element?.submenu?.length) {

                parent_element.submenu.forEach((element) => {

                    if ((element.config.isMuenu) || (element.config.key === '*' && element.config.isMuenu)) {
                        new_sub_element.push({
                            key: `${element.path}`,
                            // icon: IconComponent(element.config.icon),
                            label: <NavLink className='text-white' to={element.path}>{element.name}</NavLink>,
                        })
                    }
                })
            }

            // if (new_sub_element.length === 1) {

            //     sidebar_links.push(new_sub_element[0]);

            // } else {

            if (new_sub_element.length) {
                sidebar_links.push({
                    key: `${parent_element.path}`,
                    icon: IconComponent(parent_element.config.icon),
                    children: new_sub_element,
                    label: parent_element.name,
                });
            } else {
                sidebar_links.push({
                    key: `${parent_element.path}`,
                    icon: IconComponent(parent_element.config.icon),
                    label: <NavLink className='text-white' to={parent_element.path}>{parent_element.name}</NavLink>,
                });
            }

            // }
        }

    }

    return sidebar_links;
}