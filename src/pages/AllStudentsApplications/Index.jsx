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
import RotatingLoader from "@/components/RotatingLoader";
const AllStudentsApplications = () => {
    const { data, isLoading } = useQuery(["all-stds"], () => {
        return axios.get(apiUrl + "/applications-list");
    });

    return (
        <div>
            <h1 className="text-lg mb-2">All Students Apllications</h1>
            {isLoading ? (
                <RotatingLoader />
            ) : (
                <Table>
                    <TableCaption>A list of all applications</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Resident</TableHead>
                            <TableHead>Hospital</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                INV001
                            </TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">
                                $250.00
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default AllStudentsApplications;
