import * as React from "react"
import { Button } from "@euroland/ci-shadcn-styleguide"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@euroland/ci-shadcn-styleguide"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@euroland/ci-shadcn-styleguide"
import { periodToDisplayLabel, RANGE_CHART_INFO } from "../../constants/chartConstant"
import IntervalSelector from "./IntervalSelector"


interface RangeDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    title: string
    range: string
    onRangeChange: (range: string) => void
    intervals: string[]
    selectedIntervals: string[]
    onToggleInterval: (interval: string) => void
    onRemoveInterval: (interval: string) => void
    onSubmit: () => void
    isRangeDisabled?: boolean
}

function RangeDialog({ 
    isOpen, 
    onOpenChange, 
    title, 
    range, 
    onRangeChange, 
    intervals, 
    selectedIntervals,
    onToggleInterval,
    onRemoveInterval,
    onSubmit,
    isRangeDisabled
}: RangeDialogProps) {
    const [intervalsOpen, setIntervalsOpen] = React.useState(false)
    const rangeOptions = Object.keys(RANGE_CHART_INFO).map((key) => ({
        value: key,
        label: periodToDisplayLabel[key] || key,
    }))

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-fit w-[825px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <div className="py-4 flex gap-4">
                    <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">Range</h3>
                        <Select value={range} onValueChange={onRangeChange} disabled={isRangeDisabled}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                                {rangeOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium mb-2 text-rose-500">Intervals</h3>
                        <IntervalSelector
                            intervals={intervals}
                            selectedIntervals={selectedIntervals}
                            onToggleInterval={onToggleInterval}
                            onRemoveInterval={onRemoveInterval}
                            isOpen={intervalsOpen}
                            onOpenChange={setIntervalsOpen}
                        />
                    </div>
                </div>

                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="button" onClick={onSubmit}>
                        {isRangeDisabled ? 'Update' : 'Add'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default RangeDialog;