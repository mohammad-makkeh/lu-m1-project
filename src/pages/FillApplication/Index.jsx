import Button from "@/components/Button";
import { Combobox } from "@/components/Combobox";
import { Form } from "@/components/Form";
import FormGroupCard from "@/components/FormGroupCard";
import { Input } from "@/components/Input";
import RotatingLoader from "@/components/RotatingLoader";
import { apiUrl } from "@/helpers/api";
import toLabelValue from "@/helpers/toLabelValue";
import useAlreadyFilled from "@/hooks/useAlreadyFilled";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

const Index = () => {
    const user = useAuth();
    // const alreadyFilled = useAlreadyFilled(user.studentId);
    const alreadyFilled = false;

    const form = useForm();

    const submit = useMutation((data) => {
        return axios.get(apiUrl + "/application-submit", data);
    });

    const onSubmit = async (fv) => {
        fv.fname = user.fname;
        fv.lname = user.lname;
        const res = await submit.mutateAsync(fv);
        window.location.href = '/my-applications'
    };

    if (alreadyFilled) {
        return (
            <div className="w-full h-full grid place-items-center">
                <h1 className="text-6xl font-bold">
                    Looks like you already filled todays application{" "}
                    {user.username}!
                </h1>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-xl font-bold mb-6">
                Hello {user.username}! Fill your resident application for today
                below.
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormGroupCard title="Generalities">
                            <div className={"grid grid-cols-2 gap-5"}>
                                <Combobox
                                    form={form}
                                    label={"Resident Name"}
                                    name="pgy"
                                    items={[
                                        {
                                            label: "PGY1",
                                            value: "PGY1",
                                        },
                                        {
                                            label: "PGY2",
                                            value: "PGY2",
                                        },
                                        {
                                            label: "PGY3",
                                            value: "PGY3",
                                        },
                                        {
                                            label: "PGY4",
                                            value: "PGY4",
                                        },
                                    ]}
                                />

                                <Combobox
                                    form={form}
                                    label={"Hospital"}
                                    name="hospital"
                                    items={[
                                        { value: "Geitawi", label: "Geitawi" },
                                        {
                                            value: "Zahraa Bahman",
                                            label: "Zahraa Bahman",
                                        },
                                        { value: "Sahel", label: "Sahel" },
                                        {
                                            value: "St Georges",
                                            label: "St Georges",
                                        },
                                        { value: "Hariri", label: "Hariri" },
                                        { value: "Sacre", label: "Sacre" },
                                        {
                                            value: "Militaire",
                                            label: "Militaire",
                                        },
                                        { value: "Rassoul", label: "Rassoul" },
                                        { value: "BMC CMC", label: "BMC CMC" },
                                        {
                                            value: "Cheikh Ragheb",
                                            label: "Cheikh Ragheb",
                                        },
                                        { value: "Rosaire", label: "Rosaire" },
                                        { value: "Geneve", label: "Geneve" },
                                        { value: "France", label: "France" },
                                        { value: "France", label: "France" },
                                    ]}
                                />
                            </div>
                        </FormGroupCard>

                        <FormGroupCard title="Surgery">
                            <div className={"grid grid-cols-4 gap-5"}>
                                <Combobox
                                    form={form}
                                    label={"Session"}
                                    name="session"
                                    items={toLabelValue([
                                        "Morning",
                                        "Afternoon",
                                        "Night",
                                    ])}
                                />
                                <Combobox
                                    form={form}
                                    label={"Specialty"}
                                    name="specialty"
                                    items={toLabelValue([
                                        "General Surgery",
                                        "Bariatric Surgery",
                                        "ENT",
                                        "Ophtalmo",
                                        "Ortho",
                                        "Ob Gyn",
                                        "Open Heart",
                                        "Thoracic Surgery",
                                        "Neurosurgery",
                                        "Vascular Surgery",
                                        "Urology",
                                        "Plastic Surgery",
                                        "Pediatric Surgery",
                                        "Custom",
                                    ])}
                                />

                                <Combobox
                                    form={form}
                                    label={"Priority"}
                                    name="priority"
                                    items={toLabelValue([
                                        "Elective",
                                        "Urgent",
                                        "Immediate",
                                    ])}
                                />
                                <Combobox
                                    form={form}
                                    label={"Anesthesia Site"}
                                    name="anesthesiaSite"
                                    items={toLabelValue([
                                        "OR",
                                        "Radio",
                                        "Endoscopic",
                                        "Delivery suite",
                                        "Custom",
                                    ])}
                                />

                                <Combobox
                                    form={form}
                                    label={"Destination"}
                                    name="destination"
                                    items={toLabelValue([
                                        "Ambulatory",
                                        "Ward",
                                        "Critical Care",
                                    ])}
                                />

                                <Combobox
                                    form={form}
                                    label={"Procedures"}
                                    name="procedures"
                                    items={toLabelValue([
                                        "Fiberoptic Intubation",
                                        "Video-laryngoscopy",
                                        "Bronchial blocker",
                                        "Arterial line",
                                        "CVC",
                                        "PICC line",
                                        "PA catheter",
                                        "Custom",
                                    ])}
                                />

                                <Combobox
                                    form={form}
                                    label={"Postop pain"}
                                    name="postopPain"
                                    items={toLabelValue([
                                        "IV opioids",
                                        "IV Non-opioids",
                                        "PCA",
                                        "Intrathecal opioids",
                                        "Epidural",
                                        "Perineural catheter",
                                    ])}
                                />

                                <Combobox
                                    form={form}
                                    label={"Incidents"}
                                    name="incident"
                                    items={toLabelValue([
                                        "None",
                                        "Difficult Airway",
                                        "Esophageal intubation",
                                        "Acute coronary syndrome",
                                        "Embolism",
                                        "Bone cement problem",
                                        "Anaphylaxis",
                                        "Awareness",
                                        "Bronchospasm",
                                        "Laryngospasm",
                                        "Cardiac arrest",
                                        "High block",
                                        "LAST",
                                        "Drug error",
                                        "Equipment problem",
                                        "Neuropraxia",
                                        "Hemorrhage",
                                        "Dental damage",
                                        "CVA",
                                        "Failed regional",
                                        "Aspiration",
                                        "Pneumothorax",
                                        "Custom",
                                    ])}
                                />
                            </div>
                        </FormGroupCard>

                        <FormGroupCard title="Patient">
                            <div className={"grid grid-cols-4 gap-5"}>
                                <Input
                                    label="Age(Years/Month)"
                                    {...form.register("patientAge")}
                                />
                                <Combobox
                                    form={form}
                                    label={"Sex"}
                                    name="patientGender"
                                    items={toLabelValue(["Male", "Female"])}
                                />

                                <Combobox
                                    form={form}
                                    label={"ASA"}
                                    name="asa"
                                    items={toLabelValue([
                                        "1",
                                        "2",
                                        "3",
                                        "4",
                                        "5",
                                        "6",
                                    ])}
                                />

                                <Combobox
                                    form={form}
                                    label={"Anesthesia Technique"}
                                    name="anesthesiaTechnique"
                                    items={toLabelValue([
                                        "MAC",
                                        "Sedation",
                                        "General Anesthesia Intravenous",
                                        "General Anesthesia Inhalation",
                                        "General Anesthesia Intravenous + Inhalation",
                                        "Regional Anesthesia",
                                        "General Anesthesia + Regional Anesthesia",
                                    ])}
                                />
                                <Combobox
                                    form={form}
                                    label={"Airways"}
                                    name="airways"
                                    items={toLabelValue([
                                        "Facemask",
                                        "Laryngeal mask",
                                        "Endotracheal tube",
                                        "Double lumen tube",
                                    ])}
                                />

                                <Combobox
                                    form={form}
                                    label={"Regional Anesthesia"}
                                    name="regionalAnesthesia"
                                    items={toLabelValue([
                                        "Spinal",
                                        "Epidural Lumbar",
                                        "Epidural thoracic",
                                        "Combined Epidural + Spinal",
                                        "Caudal",
                                        "Paravertebral",
                                        "Cervical plexus",
                                        "Lumbar Plexus",
                                        "TAP",
                                        "Ilioinguinal",
                                        "Penile",
                                        "Interscalene",
                                        "Supraclavicular",
                                        "Infraclavicular",
                                        "Axillary",
                                        "Wrist block",
                                        "Femoral",
                                        "Sciatic",
                                        "LFCN",
                                        "Popliteal",
                                        "Ankle",
                                        "IVRA",
                                        "Custom",
                                    ])}
                                />

                                <Combobox
                                    form={form}
                                    label={"Supervision"}
                                    name="supervision"
                                    items={toLabelValue([
                                        "Immediate",
                                        "Local",
                                        "Distant",
                                        "Solo",
                                    ])}
                                />

                                <Combobox
                                    form={form}
                                    label={"Teaching"}
                                    name="teaching"
                                    items={toLabelValue([
                                        "None Trainee Practical",
                                        "Paramedic",
                                        "Student",
                                        "Novice",
                                    ])}
                                />
                            </div>
                        </FormGroupCard>
                    </div>

                    <textarea
                        {...form.register("notes")}
                        placeholder="Any extra notes..."
                        className="rounded border w-full mt-4 p-2"
                    ></textarea>
                    <br />
                    <Button className="float-right mt-4">
                        <div className="flex items-center gap-2">
                            {submit.isLoading && <RotatingLoader />}
                            Submit
                        </div>
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Index;
