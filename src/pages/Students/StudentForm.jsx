import Button from "@/components/Button";
import { Combobox } from "@/components/Combobox";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import RotatingLoader from "@/components/RotatingLoader";
import { apiUrl } from "@/helpers/api";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

const StudentForm = ({ professorsQuery }) => {
    const form = useForm();

    const create = useMutation((data) => {
        return axios.post(apiUrl + "/registerStudent", data);
    });

    const onSubmit = (fv) => {
        console.log(fv);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
            >
                <div className="grid grid-cols-2 gap-2 items-center">
                    <Input label="First Name" {...form.register("fname")} />
                    <Input label="Last Name" {...form.register("lname")} />
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                    <Input label="Email" {...form.register("email")} />
                    <Input
                        label="Student Code(University Id)"
                        {...form.register("studentCode")}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                    <Input label="Username" {...form.register("username")} />
                    <Input label="Password" {...form.register("password")} />
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                    <Input label="Major" {...form.register("major")} />
                    <Input
                        label="Academic Year"
                        {...form.register("academicYear")}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                    {professorsQuery.isLoading ? (
                        <RotatingLoader />
                    ) : (
                        <Combobox
                            form={form}
                            label={"Resident Name"}
                            name="professorId"
                            items={professorsQuery.data?.map((p) => ({
                                label: p.username,
                                value: p.professorId,
                            }))}
                        />
                    )}

                    <Button>
                        <div className="flex items-center gap-2">
                            {create.isLoading && <RotatingLoader />}
                            Create
                        </div>
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default StudentForm;
