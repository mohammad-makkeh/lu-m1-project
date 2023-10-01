import React from "react";

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
import DoctorForm from "./DoctorForm";
import { useQuery } from "react-query";
import { apiUrl } from "@/helpers/api";
import axios from "axios";
import RotatingLoader from "@/components/RotatingLoader";
const Doctors = () => {




    const { data, isLoading } = useQuery(["doctors-list"], () => {
        return axios.get(apiUrl + "/professors-list");
    });


    const columns = [
        "First Name",
        "Last Name",
        "Email",
    ];

    const getColumns = () =>
        columns.map((col, i) => <TableHead key={i}>{col}</TableHead>);

    const getRows = () =>
        data?.data
            ? data.data.map((row, i) => (
                  <TableRow key={i}>
                      <TableCell>{row.fname}</TableCell>
                      <TableCell>{row.lname}</TableCell>
                      <TableCell>{row.email}</TableCell>
                  </TableRow>
              ))
            : "No results";

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-lg mb-2">All Professors</h1>
                <Dialog>
                    <DialogTrigger>
                        <Button> Add Professor </Button>
                    </DialogTrigger>
                    <DialogContent className={"min-w-[650px]"}>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <i className="fa fa-user-tie opacity-50 text-sm"></i>
                                Add New Professor
                            </DialogTitle>
                        </DialogHeader>
                        <DoctorForm />
                    </DialogContent>
                </Dialog>
            </div>
            <Table>
                <TableCaption>A list of all professors</TableCaption>
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
};

export default Doctors;
