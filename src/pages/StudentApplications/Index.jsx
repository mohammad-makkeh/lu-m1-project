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

    const { data, isLoading } = useQuery(["student-applications-list"], () => {
        return axios.get(apiUrl + "/applications-list?stdId=" + user?.id);
    });

    return (
        <div>
            <h1 className="text-lg mb-2">All Your Applications</h1>
            {isLoading ? (
                <RotatingLoader />
            ) : (
                <Table>
                    <TableCaption>A list of all students</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Invoice</TableHead>
                            <TableHead>Status</TableHead>
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

export default MyApplications;
