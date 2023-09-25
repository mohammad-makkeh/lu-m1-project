import Button from "@/components/Button";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center text-center gap-10">
            <span className="text-9xl font-extrabold">404</span>
            <h1 className="text-3xl max-w-3xl">
                Looks like this page doesnt exist or you dont have the
                permissions to view it!
            </h1>
            <Link to="login">
                <Button>Go to login</Button>
            </Link>
        </div>
    );
};

export default NotFound;
