import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ date, setDate }) => {
  // Helper to handle 'null' and 'undefined' properly
  const handleSelectDate = (selectedDate: Date | undefined) => {
    // Convert 'undefined' to 'null' for consistency with the component's prop
    setDate(selectedDate ?? null);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[250px] lg:w-[180px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date || undefined} // Convert null to undefined for compatibility
          onSelect={handleSelectDate} // Use the handler that deals with undefined
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
