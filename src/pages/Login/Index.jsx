import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { apiUrl } from "@/helpers/api";
import axios from "axios";
import { redirect } from "react-router-dom";
import { useState } from "react";
import RotatingLoader from "@/components/RotatingLoader";
export default function Login() {
    const form = useForm();

    const submit = useMutation((data) => {
        return axios.get(apiUrl + "/login?username="+ data.username+ "&password="+data.password);
    });

    const [loginError, setLoginError] = useState("");
    const onSubmit = async (fv) => {
        const res = await submit.mutateAsync(fv);      
        if (res.data.validLogin === "Y") {
            localStorage.setItem(
                "user",
                JSON.stringify(res.data)
            );
            return (window.location.pathname = "/");
        } else return setLoginError("Login or password are invalid");
    };

    return (
        <>
            <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        Health Archive
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login
                            </h1>
                            {
                                loginError && <p className="text-destructive">{loginError}</p>
                            }
                        </div>
                        <form
                            className="flex flex-col gap-2"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <Input
                                {...form.register("username")}
                                placeholder="Username"
                            />
                            <Input
                                {...form.register("password")}
                                placeholder="Password"
                                type="password"
                            />
                            <Button>
                                <div className="flex items-center gap-2">
                                    {submit.isLoading && <RotatingLoader />}
                                    Login
                                </div>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
