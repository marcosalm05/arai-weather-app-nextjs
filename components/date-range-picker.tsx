"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { CalendarIcon } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import type { DateRange } from "react-day-picker"

interface DateRangePickerProps {
  value: { from: Date; to: Date } | null
  onChange: (range: { from: Date; to: Date } | null) => void
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempRange, setTempRange] = useState<DateRange | undefined>(
    value ? { from: value.from, to: value.to } : undefined,
  )
  const { t } = useLanguage()

  const handleSelect = (range: DateRange | undefined) => {
    setTempRange(range)

    if (range?.from && range?.to) {
      onChange({ from: range.from, to: range.to })
      setIsOpen(false)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-[#0B3D91] text-white border-[#0B3D91] hover:bg-[#0B3D91]/90 hover:text-white"
        >
          <CalendarIcon className="w-4 h-4" />
          {value ? (
            <span>
              {value.from.toLocaleDateString()} - {value.to.toLocaleDateString()}
            </span>
          ) : (
            <span>{t("selectDates")}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[1300]" align="start">
        <Calendar
          mode="range"
          selected={tempRange}
          onSelect={handleSelect}
          numberOfMonths={2}
          defaultMonth={new Date()}
        />
      </PopoverContent>
    </Popover>
  )
}
