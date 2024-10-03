export type RoutesTypeElement = {
    name: string,
    path: string,
    component: any,
    config: {
        key: string,
        icon: any,
        structure: 'layout' | 'nonlayout',
        isMuenu: boolean
        isRoles?: string[],
    }
    submenu?: Array<Omit<RoutesTypeElement, 'submenu'>>
}