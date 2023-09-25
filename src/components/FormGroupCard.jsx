import React from "react";
import  cn from "@/helpers/cn";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/Card";

const FormGroupCard = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center text-sm text-primary/50 font-[700]">
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div>{children}</div>
      </CardContent>
    </Card>
  );
};

export default FormGroupCard;
