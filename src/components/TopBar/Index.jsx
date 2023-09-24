import useAuth from "@/hooks/useAuth";
import React from "react";

const Index = () => {
    const user = useAuth();


    const switchRole = (newRole) => {
        if(newRole === user.role) return;
        localStorage.setItem('user', JSON.stringify({...user, role: newRole}))
        window.location.pathname = "/";
    }

    return (
        <div className="w-full bg-primary px-3 py-2 text-primary-foreground flex justify-between items-center">
            <div className="logo uppercase font-bold">Health Archive</div>
            <div className="flex items-center gap-4">
                <span className="cursor-pointer" onClick={() => switchRole("student")}>Student</span>
                <span className="cursor-pointer" onClick={() => switchRole("doctor")}>Doctor</span>
                <span className="cursor-pointer" onClick={() => switchRole("admin")}>Admin</span>
            </div>
            <div className="flex items-center gap-2 opacity-90">
                <i className="fa-solid fa-user text-xs pt-0.5"></i>
                <p>Hi, {user.username}</p>
            </div>
        </div>
    );
};

export default Index;
