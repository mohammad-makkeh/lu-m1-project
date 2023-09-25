import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import cn from "@/helpers/cn";
import Button from "@/components/Button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/form";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandSeparator,
} from "@/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { ScrollArea } from "@/components/scroll-area";
import Badge from "@/components/Badge";

export function Combobox({
    className,
    placeholder = "Select",
    searchPlaceholder = "Search...",
    emptyMessage = "Not Found",
    items = [],
    isLoading,
    form,
    name,
    label,
    description,
    triggerClassName,
    actionItems,
    isMulti,
}) {
    const SelectBox = ({ field, form, name }) => {
        const [open, setOpen] = React.useState(false);
        const valueSliderRef = React.useRef(null);

        React.useEffect(() => {
            let mouseDown = false;
            let startX, scrollLeft;
            const slider = valueSliderRef.current;

            let startDragging = function (e) {
                mouseDown = true;
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
                e.stopPropagation();
            };
            let stopDragging = function (e) {
                e.stopPropagation();
                mouseDown = false;
            };

            const handleMove = (e) => {
                e.preventDefault();
                if (!mouseDown) {
                    return;
                }
                const x = e.pageX - slider.offsetLeft;
                const scroll = x - startX;
                slider.scrollLeft = scrollLeft - scroll;
            };

            // Add the event listeners
            slider.addEventListener("mousemove", handleMove);
            slider.addEventListener("mousedown", startDragging, false);
            slider.addEventListener("mouseup", stopDragging, false);
            slider.addEventListener("mouseleave", stopDragging, false);

            return () => {
                // Add the event listeners
                slider.removeEventListener("mousemove", handleMove);
                slider.removeEventListener("mousedown", startDragging);
                slider.removeEventListener("mouseup", stopDragging);
                slider.removeEventListener("mouseleave", stopDragging);
            };
        }, []);

        isMulti =
            isMulti !== undefined
                ? isMulti
                : field.value && Array.isArray(field.value);

        const remove = (index) => {
            const clone = structuredClone(field.value);
            clone.splice(index, 1);
            form.setValue(name, clone);
        };

        const findLabelByValue = (val, log = false) =>
            items?.find((item) => item.value === val)?.label;

        const renderValue = (val) => {
            if (val === undefined) return placeholder;
            if (!isMulti) {
                return findLabelByValue(val);
            }
            if (isMulti && !Array.isArray(val)) {
                console.error(
                    "isMulti is set to true but value is not an array"
                );
                return "isMulti is set to true but value is not an array";
            }
            return val?.map((item, i) => (
                <Badge
                    key={i}
                    className="flex-shrink-0 px-2"
                    onRemove={(e) => {
                        e.stopPropagation();
                        remove(i);
                    }}
                >
                    <span>{findLabelByValue(item)}</span>
                </Badge>
            ));
        };

        const isItemSelected = (val) => {
            if (val === undefined || field.value === undefined) return false;
            if (!isMulti) return val === field.value;
            const found = field.value.find((item) => item === val);
            return found !== undefined;
        };

        const handleOnSelect = (val, field) => {
            if (isMulti) {
                if (field.value === undefined) field.onChange([]);
                const index = field.value?.indexOf(val);
                if (index !== -1) {
                    const clone = structuredClone(field.value);
                    clone.splice(index, 1);
                    form.setValue(name, clone);
                    setTimeout(() => setOpen(true), 0);
                } else form.setValue(name, [...field.value, val]);
            } else {
                form.setValue(name, val);
                setOpen(false);
            }
        };

        const getItems = () => {
            if (!items || items.length === 0) {
                return <CommandItem disabled>No items.</CommandItem>;
            } else {
                return items.map((item) => {
                    const isSelected = isItemSelected(item.value);
                    return (
                        <CommandItem
                            key={item.value}
                            onSelect={() => handleOnSelect(item.value, field)}
                            disabled={item.disabled}
                            className={item.disabled && "disabled"}
                        >
                            {item.label}
                            <CheckIcon
                                className={cn(
                                    "ml-auto h-4 w-4",
                                    isSelected ? "opacity-100" : "opacity-0"
                                )}
                            />
                        </CommandItem>
                    );
                });
            }
        };

        const getActionItems = () => {
            return actionItems.map((actionItem, i) => (
                <CommandItem
                    key={actionItem.name + i}
                    onSelect={
                        typeof actionItem.action === "function"
                            ? actionItem.action
                            : () => {}
                    }
                >
                    {actionItem.icon && (
                        <i className={`fa ${actionItem.icon} opacity-40`}>
                            &nbsp;&nbsp;&nbsp;
                        </i>
                    )}
                    {actionItem.name || "Create"}
                </CommandItem>
            ));
        };

        return (
            <FormItem className="flex flex-col">
                {label && (
                    <label className="text-sm font-semibold block mb-1">{label}</label>
                )}

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            role="combobox"
                            aria-expanded={open}
                            variant="outline"
                            className={cn(
                                "w-full justify-between p-3 hover:bg-primary",
                                field.value === undefined &&
                                    "text-muted-foreground",
                                triggerClassName
                            )}
                        >
                            <div
                                className={`${
                                    isMulti
                                        ? "flex gap-1 overflow-auto no-scrollbar cursor-grab"
                                        : "line-clamp-1"
                                } text-left`}
                                ref={valueSliderRef}
                            >
                                {renderValue(field.value)}
                            </div>
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-full">
                        <Command>
                            <CommandInput
                                placeholder={searchPlaceholder}
                                className="h-9 !outline-transparent p-1"
                            />
                            <ScrollArea className="!overflow-auto max-h-80 cx-scrollbar">
                                <CommandEmpty>{emptyMessage}</CommandEmpty>
                                <CommandGroup className="!overflow-auto">
                                    {getItems()}
                                </CommandGroup>
                            </ScrollArea>
                            {actionItems?.length && (
                                <>
                                    <CommandSeparator />
                                    <CommandGroup>
                                        {getActionItems()}
                                    </CommandGroup>
                                </>
                            )}
                        </Command>
                    </PopoverContent>
                </Popover>
            </FormItem>
        );
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <SelectBox field={field} form={form} name={name} />
            )}
        />
    );
}
