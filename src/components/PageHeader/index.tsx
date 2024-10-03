import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

type THeaderProps = {
  title: string,
  btn?: React.ReactNode,
  breadCrumbData?: Array<{
    name: string,
    path: string
  }>,
  isBack?: boolean | string,
  backUrl?: string;
  menuType?: "menu" | 'tab',
  className?: string,
  hr?: boolean
}

const PageHeader: FC<THeaderProps> = ({ title, btn, breadCrumbData, isBack = false, menuType = "menu", className, backUrl, hr }): JSX.Element => {
  const navigate = useNavigate()

  return (
    <div className={`${menuType == "menu" ? "pb-[10px]" : "pb-[0px]"} ${className ?? ""}`} style={{ borderBottom: menuType == "menu" ? "1px solid #F0F0F0" : "", background: "var(--v-bg)" }}>
      {/* {breadCrumbData && breadCrumbData?.length > 1 ? <div className="mb-[14px]"><CustomBreadcrumb arr={breadCrumbData} /></div> : null} */}
      <div className="flex justify-between items-center">
        <div className="d-f gap-2">
          {
            isBack ? <FaArrowLeft onClick={() => backUrl ? navigate(backUrl) : navigate(-1)} className="text-lg text-gray-600- cursor-pointer hover:text-blue-500" /> : ""
          }
          <p className="text-xl font-bold m-0">{title}</p>
        </div>
        {btn}
      </div>
    </div>
  )
}

export default PageHeader