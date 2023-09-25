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

export default function Index() {
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
                        <StudentForm/>
                    </DialogContent>
                </Dialog>
            </div>
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
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
