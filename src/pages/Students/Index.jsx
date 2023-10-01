import Button from "@/components/Button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/dialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/table";
import StudentForm from "./StudentForm";
import { useQuery } from "react-query";
import axios from "axios";
import { apiUrl } from "@/helpers/api";
import RotatingLoader from "@/components/RotatingLoader";

export default function Index() {
    const { data, isLoading } = useQuery(["student-list"], () => {
        return axios.get(apiUrl + "/students");
    });

    const professorsQuery = useQuery(["professors-list"], () => {
        return axios.get(apiUrl + "/professors-list");
    });

    const columns = [
        "Student Code",
        "First Name",
        "Last Name",
        "Email",
        "Academic Year"
    ];

    const getColumns = () =>
        columns.map((col, i) => <TableHead key={i}>{col}</TableHead>);

    const getRows = () =>
        data?.data
            ? data.data.map((row, i) => (
                  <TableRow key={i}>
                      <TableCell>{row.studentCode}</TableCell>
                      <TableCell>{row.fname}</TableCell>
                      <TableCell>{row.lname}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.academicYear}</TableCell>
                  </TableRow>
              ))
            : "No results";

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-lg mb-2">All Students</h1>
                <Dialog>
                    <DialogTrigger>
                        <Button> Add Student </Button>
                    </DialogTrigger>
                    <DialogContent className={"min-w-[650px]"}>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <i className="fa fa-graduation-cap opacity-50 text-sm"></i>
                                Add New Student
                            </DialogTitle>
                        </DialogHeader>
                        <StudentForm professorsQuery={professorsQuery} />
                    </DialogContent>
                </Dialog>
            </div>
            <Table>
                <TableCaption>A list of all students</TableCaption>
                {isLoading ? (
                    <RotatingLoader />
                ) : (
                    <>
                        <TableHeader>
                            <TableRow>{getColumns()}</TableRow>
                        </TableHeader>
                        <TableBody>{getRows()}</TableBody>
                    </>
                )}
            </Table>
        </div>
    );
}
