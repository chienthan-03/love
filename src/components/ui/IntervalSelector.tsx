
import { X, Check } from "lucide-react"
import { Button } from "@euroland/ci-shadcn-styleguide"
import { Badge } from "@euroland/ci-shadcn-styleguide"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@euroland/ci-shadcn-styleguide"
import { Popover, PopoverContent, PopoverTrigger } from "@euroland/ci-shadcn-styleguide"
import { cn } from "../../lib/utils"
import { intervalToDisplayLabel } from "../../constants/chartConstant"


interface IntervalSelectorProps {
    intervals: string[]
    selectedIntervals: string[]
    onToggleInterval: (interval: string) => void
    onRemoveInterval: (interval: string) => void
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

function IntervalSelector({ intervals, selectedIntervals, onToggleInterval, onRemoveInterval, isOpen, onOpenChange }: IntervalSelectorProps) {
    return (
        <Popover open={isOpen} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
                <div className="relative flex items-center justify-end rounded-md border border-input bg-background pl-2 py-1 text-sm ring-offset-background w-72">
                    <div className="flex flex-wrap gap-1 w-full">
                        {selectedIntervals.length > 0 ? (
                            selectedIntervals.map((interval) => (
                                <Badge key={interval} variant="outline" className="h-8">
                                    {intervalToDisplayLabel[interval] || interval}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-4 w-4 p-0 ml-1 text-slate-500 hover:text-slate-900 hover:bg-transparent"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onRemoveInterval(interval)
                                        }}
                                    >
                                        <X className="h-3 w-3" />
                                        <span className="sr-only">Remove</span>
                                    </Button>
                                </Badge>
                            ))
                        ) : (
                            <span className="text-muted-foreground">Select intervals</span>
                        )}
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search intervals..." />
                    <CommandList>
                        <CommandEmpty>No intervals found.</CommandEmpty>
                        <CommandGroup>
                            {intervals.map((interval) => (
                                <CommandItem key={interval} value={interval} onSelect={() => onToggleInterval(interval)}>
                                    <div className="flex items-center gap-2 w-full">
                                        <div
                                            className={cn(
                                                "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                selectedIntervals.includes(interval) ? "bg-primary text-primary-foreground" : "opacity-50",
                                            )}
                                        >
                                            {selectedIntervals.includes(interval) && <Check className="h-3 w-3" />}
                                        </div>
                                        <span>{intervalToDisplayLabel[interval] || interval}</span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default IntervalSelector