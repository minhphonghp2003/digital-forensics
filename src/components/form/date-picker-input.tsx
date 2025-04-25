"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
function DatePickerInput({ title, onDatePicked, formatType, selected }: { title: string, selected: any, formatType?: any, onDatePicked: any }) {

    return (
        <div className="">

            <Label htmlFor="name" className='mb-2'>
                {title}
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !selected && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {selected && format(selected, formatType ?? "PPP")}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={selected}
                        onSelect={onDatePicked}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DatePickerInput