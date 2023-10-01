import Button from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import RotatingLoader from "@/components/RotatingLoader";
import { apiUrl } from "@/helpers/api";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

const DoctorForm = () => {
    const form = useForm();

    const create = useMutation((data) => {
        return axios.post(apiUrl + "/registerDoctor", data);
    });

    const onSubmit =async  (fv) => {
        await create.mutateAsync(fv);
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
                    <Input label="Username" {...form.register("username")} />
                    <Input label="Password" {...form.register("password")} />
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                    <Input label="Email" {...form.register("email")} />
                </div>

                <Button>
                    <div className="flex items-center gap-2">
                        {create.isLoading && <RotatingLoader />}
                        Create
                    </div>
                </Button>
            </form>
        </Form>
    );
};

export default DoctorForm;
