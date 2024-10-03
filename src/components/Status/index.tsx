import { FC } from "react";
import { Badge, Typography } from 'antd';
// import "./style.scss";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const BadgeStatus: FC<{ status: number | string }> = ({ status }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <>
            {(status === 'A') ? <Badge count={t("Active")} style={{ backgroundColor: "#73d13d" }} className="active_badge" /> : <Badge count="InActive" style={{ backgroundColor: "#ff7875" }} />}
        </>
    )
}

const BadgeStatusTag: FC<{ status: number | string }> = ({ status }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <>
            {(status === 'A') ? <span className="tag-green">{t("Active")}</span> : <span className="tag-red">{t("InActive")}</span>}
        </>
    )
}



const BadgeStatusText: FC<{ status: number | string }> = ({ status }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <>
            {(status === 1 || status === '1') ? <Text type="success" >{t("Active")}</Text> : <Text type="danger" >{t("InActive")}</Text>}

        </>
    )
}

const UserStatus: FC<{ status: string }> = ({ status }): JSX.Element => {
    const { t } = useTranslation();

    if (status === 'A') return <span className="tag-green">{t("Active")}</span>

    if (status === 'B') return <span className="tag-orange">{t("Blocked")}</span>

    return <span className="tag-red">{t("InActive")}</span>
}


export { BadgeStatusTag, BadgeStatusText, UserStatus };
export default BadgeStatus;