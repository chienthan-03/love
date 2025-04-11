import { X } from "lucide-react"
import { Button } from "@euroland/ci-shadcn-styleguide"
import { Badge } from "@euroland/ci-shadcn-styleguide"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@euroland/ci-shadcn-styleguide"
import { periodToDisplayLabel } from "../../constants/chartConstant"


interface RangeListProps {
    selectedRanges: string[]
    onRemoveRange: (range: string) => void
    onUpdateRange: (range: string) => void
    onAddRange: () => void
    formatTooltip: (range: string) => string
}

function RangeList({ selectedRanges, onRemoveRange, onUpdateRange, onAddRange, formatTooltip }: RangeListProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            <TooltipProvider>
                {selectedRanges.map((range) => (
                    <Tooltip key={range}>
                        <TooltipTrigger asChild>
                            <Badge
                                variant="outline"
                                className="bg-slate-100 hover:bg-slate-200 text-slate-900 cursor-pointer h-8"
                                onClick={() => onUpdateRange(range)}
                            >
                                {periodToDisplayLabel[range] || range}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 ml-1 text-slate-500 hover:text-slate-900 hover:bg-transparent"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onRemoveRange(range)
                                    }}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-sm">{formatTooltip(range)}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </TooltipProvider>

            <Button variant="outline" size="sm" className="text-slate-500" onClick={onAddRange}>
                + Add range
            </Button>
        </div>
    )
}

export default RangeList;