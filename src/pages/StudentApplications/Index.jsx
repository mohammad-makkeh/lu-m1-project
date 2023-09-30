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
        ["student-applications-list", user?.id],
        () => {
            return axios.get(
                apiUrl + "/applications-list?studentId=" + user?.id
            );
        }
    );

    const columns = [
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
        data
            ? data.map((row, i) => (
                  <TableRow key={i}>
                      <TableCell>{row.pgy}</TableCell>
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
            <h1 className="text-lg mb-2">All Your Applications</h1>
            {isLoading ? (
                <RotatingLoader />
            ) : (
                <Table>
                    <TableCaption>A list of all students</TableCaption>
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
