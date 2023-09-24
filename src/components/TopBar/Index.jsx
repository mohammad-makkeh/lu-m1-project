import useAuth from "@/hooks/useAuth";
import React from "react";

const Index = () => {
    const { username } = useAuth();
    return (
        <div className="w-full bg-primary px-3 py-2 text-primary-foreground flex justify-between items-center">
            <div className="logo uppercase font-bold">Health Archive</div>
            <div className="flex items-center gap-2 opacity-90">
                <i className="fa-solid fa-user text-xs pt-0.5"></i>
                <p>Hi, {username}</p>
            </div>
        </div>
    );
};

export default Index;
