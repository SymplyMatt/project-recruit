import Sidebar from "../../components/dashboard/Sidebar"
import TopMain from "../../components/dashboard/TopMain"
import { DashboardLayoutProps } from "../../utils/interfaces";

const Dashboard: React.FC<DashboardLayoutProps> = ({children = [<></>, <></>, <></>]}) => {
    const [header, content, overlay] = children;
return (
    <>
        <div className="grid grid-cols-10 w-screen h-screen relative">
            <Sidebar />
            <div className={`h-screen bg-white col-span-8 relative overflow-hidden`}>
                <div className="flex flex-col justify-between">
                    <TopMain />
                    {header}
                </div>
                {content}
            </div>
            { overlay && <div className={`absolute h-screen w-screen bg-blackLight flex justify-center items-center`}>
                {overlay}
            </div>}
            <div className="flex flex-col absolute top-[100px] right-[30px] notification-container gap-20"></div>
        </div>
    </>
)
}

export default Dashboard