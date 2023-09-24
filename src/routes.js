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
        roles: ["doctor", "admin"],
        page: AllStudentsApplications

    },
    {
        name: "Students",
        path: "/students",
        icon: "fa-solid fa-graduation-cap",
        roles: ["doctor","admin"],
        page: Students
    },
    {
        name: "Doctors",
        path: "/doctors",
        icon: "fa-solid fa-user-tie",
        roles: ["admin"],
        page: Doctors
    },
];

export default routes;