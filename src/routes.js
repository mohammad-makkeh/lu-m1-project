import FillApplication from "@/pages/FillApplication";
import StudentApplications from "@/pages/StudentApplications";
import Students from "@/pages/Students";
import Doctors from "@/pages/Doctors";
import AllStudentsApplications from "@/pages/AllStudentsApplications"


const routes = [
    {
        name: "Fill Application",
        path: "/",
        icon: "fa-solid fa-file-pen",
        roles: ["student"],
        page: FillApplication
    },
    {
        name: "My Applications",
        path: "/my-applications",
        icon: "fa-solid fa-file-lines",
        roles: ["student"],
        page: StudentApplications

    },
    {
        name: "Students Applications",
        path: "/",
        icon: "fa-solid fa-file-lines",
        roles: ["professor", "admin"],
        page: AllStudentsApplications

    },
    {
        name: "Students",
        path: "/students",
        icon: "fa-solid fa-graduation-cap",
        roles: ["professor"],
        page: Students
    },
    {
        name: "Doctors",
        path: "/professor",
        icon: "fa-solid fa-user-tie",
        roles: ["admin"],
        page: Doctors
    },
];

export default routes;