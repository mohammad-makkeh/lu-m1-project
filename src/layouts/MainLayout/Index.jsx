import Sidebar from "@/components/Sidebar/Index";
import TopBar from "@/components/TopBar/Index";
import useAuth from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";

/* eslint-disable react/prop-types */
const Index = () => {

    const user = useAuth();


    if(!user) {
        window.location.pathname="/login";
    }

    return (
        <div className=" h-full">
            <TopBar />
            <div className="flex h-full">
                <Sidebar />
                <div className="px-3 py-2 w-full overflow-auto custom-scrollbar max-h-[90vh]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Index;
