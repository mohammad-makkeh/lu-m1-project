import useAuth from "@/hooks/useAuth";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import Button from "../Button";

const Index = () => {
    const user = useAuth();


    const logout = () => {
        localStorage.removeItem("user");
        window.location.pathname = "/login";
    };

    return (
        <div className="w-full bg-primary px-3 py-2 text-primary-foreground flex justify-between items-center">
            <div className="logo uppercase font-bold">Health Archive</div>
            {/* <div className="flex items-center gap-4">
                <span
                    className="cursor-pointer"
                    onClick={() => switchRole("student")}
                >
                    Student
                </span>
                <span
                    className="cursor-pointer"
                    onClick={() => switchRole("professor")}
                >
                    Doctor
                </span>
                <span
                    className="cursor-pointer"
                    onClick={() => switchRole("admin")}
                >
                    Admin
                </span>
            </div> */}
            <Popover className="w-fit">
                <PopoverTrigger>
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2 opacity-90"
                    >
                        <i className="fa-solid fa-user text-xs pt-0.5"></i>
                        <p>Hi, {user.username}</p>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2 w-fit">
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2 opacity-90"
                        onClick={logout}
                    >
                        <i className="fa-solid fa-sign-out text-xs"></i>
                        <span>Logout</span>
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default Index;
