import cn from "@/helpers/cn";
import useAuth from "@/hooks/useAuth";
import { Link, useLocation, useMatch, useMatches } from "react-router-dom";
import routes from "@/routes"

const Sidebar = ({ className }) => {
    const { pathname } = useLocation();

    const isActive = (route) => {
        return pathname === route;
    };

    const user = useAuth();


    const activeClassName = "!bg-accent !text-accent-foreground";

    return (
        <div className={cn(className ?? "", "border-r h-full py-1 min-w-fit")}>
            {routes
                .filter((route) => !route.roles || route.roles.includes(user.role))
                .map((route) => (
                    <Link key={route.path} to={route.path}>
                        <div className="px-3 py-1">
                            <div
                                className={cn(
                                    "grid grid-cols-[1fr,6fr] items-center justify-center gap-2 px-3 py-1 rounded hover:bg-accent/10 transition-all",
                                    isActive(route.path) && activeClassName
                                )}
                            >
                                <div className="grid place-items-center">
                                    <i
                                        className={cn(
                                            route.icon,
                                            isActive(route.path)
                                                ? "opacity-100"
                                                : "opacity-40"
                                        )}
                                    ></i>
                                </div>

                                <span className="">{route.name}</span>
                            </div>
                        </div>
                    </Link>
                ))}
        </div>
    );
};

export default Sidebar;
