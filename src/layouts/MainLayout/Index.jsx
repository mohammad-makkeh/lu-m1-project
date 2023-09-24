import Sidebar from "@/components/Sidebar/Index";
import TopBar from "@/components/TopBar/Index";
import { Outlet } from "react-router-dom";

/* eslint-disable react/prop-types */
const Index = () => {
    return (
        <div className=" h-full">
            <TopBar />
            <div className="flex h-full">
                <Sidebar />
                <div className="px-3 py-2">

                <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Index;
