import React from "react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/table";
import { useQuery } from "react-query";
import axios from "axios";
import { apiUrl } from "@/helpers/api";
import useAuth from "@/hooks/useAuth";
import RotatingLoader from "@/components/RotatingLoader";
const MyApplications = () => {
    const user = useAuth();

    const { data, isLoading } = useQuery(
        ["student-applications-list"],
        () => {
            return axios.get(
                apiUrl + "/applications-list"
            );
        }
    );

    const columns = [
        "Student Code",
        "Student First Name",
        "Student Last Name",
        "Resident",
        "Hospital",
        "Priority",
        "Procedure",
        "Incident",
        "Date",
    ];

    const getColumns = () =>
        columns.map((col, i) => <TableHead key={i}>{col}</TableHead>);

    const getRows = () =>
        data?.data
            ? data.data.map((row, i) => (
                  <TableRow key={i}>
                    {/* we need this api to return the student info */}
                      <TableCell>{"needs fixing"}</TableCell>
                      <TableCell>{"needs fixing"}</TableCell>
                      <TableCell>{"needs fixing"}</TableCell>
                      <TableCell>{row.hospital}</TableCell>
                      <TableCell>{row.priority}</TableCell>
                      <TableCell>{row.procedures}</TableCell>
                      <TableCell>{row.incidents}</TableCell>
                      <TableCell>{row.date}</TableCell>
                  </TableRow>
              ))
            : "No results";

    return (
        <div>
            <h1 className="text-lg mb-2">All Student Applications</h1>
            {isLoading ? (
                <RotatingLoader />
            ) : (
                <Table>
                    <TableCaption>A list of student applications</TableCaption>
                    <TableHeader>
                        <TableRow>{getColumns()}</TableRow>
                    </TableHeader>
                    <TableBody>{getRows()}</TableBody>
                </Table>
            )}
        </div>
    );
};

export default MyApplications;
