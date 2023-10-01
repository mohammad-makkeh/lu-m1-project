import React, { useState } from "react";

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
import { Input } from "@/components/Input";
const MyApplications = () => {
    const user = useAuth();

    const { data, isLoading } = useQuery(["student-applications-list"], () => {
        return axios.get(apiUrl + "/applications-list");
    });

    const columns = [
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

    const [filterSearch, setFilterSearch] = useState("");

    const filter = () => {
        return data?.data?.filter((row) =>
            row.hospital?.toLowerCase()?.includes(filterSearch?.toLowerCase()) ||
            row.firstName?.toLowerCase()?.includes(filterSearch?.toLowerCase()) ||
            row.lastName?.toLowerCase()?.includes(filterSearch?.toLowerCase()) ||
            row.priority?.toLowerCase()?.includes(filterSearch?.toLowerCase())
        );
    };

    const getRows = () =>
        data?.data
            ? filter(data.data).map((row, i) => (
                  <TableRow key={i}>
                      {/* we need this api to return the student info */}
                      <TableCell>{row.firstName}</TableCell>
                      <TableCell>{row.lastName}</TableCell>
                      <TableCell>{row.pgy}</TableCell>
                      <TableCell>{row.hospital}</TableCell>
                      <TableCell>{row.priority}</TableCell>
                      <TableCell>{row.procedures}</TableCell>
                      <TableCell>{row.incident}</TableCell>
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
                <div className="flex flex-col gap-4">
                    <Input
                        value={filterSearch}
                        onChange={(e) => setFilterSearch(e.target.value)}
                        placeholder="Filter by firstname, lastname, hospital, priority..."
                    />
                    <Table>
                        <TableCaption>
                            A list of student applications
                        </TableCaption>
                        <TableHeader>
                            <TableRow>{getColumns()}</TableRow>
                        </TableHeader>
                        <TableBody>{getRows()}</TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default MyApplications;
