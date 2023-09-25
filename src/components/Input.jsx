import cn from "@/helpers/cn";
import * as React from "react";

const Input = React.forwardRef(({ className, type, label, ...props }, ref) => {
    return (
        <div className="">
            <label htmlFor="" className="text-sm font-semibold">{label}</label>
            <input
                type={type}
                className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        </div>
    );
});
Input.displayName = "Input";

export { Input };
