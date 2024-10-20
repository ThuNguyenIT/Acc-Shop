import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

interface DatePickerProps {
    label: string;
    id: string;
    selectedDate?: Date;
    onDateChange?: (date: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, id, selectedDate, onDateChange }) => {
    const [date, setDate] = useState<Date | undefined>(selectedDate);

    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate);
        if (onDateChange) {
            onDateChange(newDate);
        }
    };

    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id={id}
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "dd/MM/yyyy") : <span>Chọn {label.toLowerCase()}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateChange} // Chấp nhận Date | undefined
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DatePicker;
