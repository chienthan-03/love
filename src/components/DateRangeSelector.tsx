import * as React from "react"
import { intervalToDisplayLabel, RANGE_CHART_INFO } from "../constants/chartConstant"
import RangeDialog from "./ui/RangeDialog"
import RangeList from "./ui/RangeList"
import { useStore } from "../store/useStore"
import type { TChartRangePeriod, TTimeIntervals } from "../store/useStore"

export function DateRangeSelector() {
    const { dateRangesAndInterval } = useStore()
    const [selectedRanges, setSelectedRanges] = React.useState<string[]>([
        "1D", "5D", "1M", "3M", "6M", "1Y", "5Y", "10Y",
    ])

    const [addDialogOpen, setAddDialogOpen] = React.useState(false)
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false)
    const [tempRange, setTempRange] = React.useState<string>("1D")
    const [tempIntervals, setTempIntervals] = React.useState<string[]>([])

    React.useEffect(() => {
        if (dateRangesAndInterval) {
            setSelectedRanges(dateRangesAndInterval.map(range => range.period))
        }
    }, [dateRangesAndInterval])

    const removeRange = (range: string) => {
        const newRanges = selectedRanges.filter((r) => r !== range)
        setSelectedRanges(newRanges)
        useStore.setState({
            dateRangesAndInterval: newRanges.map(r => ({
                period: r as TChartRangePeriod,
                intervals: RANGE_CHART_INFO[r].intervals as TTimeIntervals[]
            }))
        })
    }

    const openAddDialog = () => {
        setTempRange("1D")
        setTempIntervals([...RANGE_CHART_INFO["1D"].intervals])
        setAddDialogOpen(true)
    }

    const openUpdateDialog = (range: string) => {
        setTempRange(range)
        const existingRange = dateRangesAndInterval?.find(r => r.period === range)
        setTempIntervals(existingRange?.intervals || [...RANGE_CHART_INFO[range as keyof typeof RANGE_CHART_INFO].intervals])
        setUpdateDialogOpen(true)
    }

    const handleAddRange = () => {
        if (!selectedRanges.includes(tempRange)) {
            const newRanges = [...selectedRanges, tempRange]
            setSelectedRanges(newRanges)
            useStore.setState({
                dateRangesAndInterval: newRanges.map(r => ({
                    period: r as TChartRangePeriod,
                    intervals: r === tempRange ? tempIntervals as TTimeIntervals[] : 
                        RANGE_CHART_INFO[r].intervals as TTimeIntervals[]
                }))
            })
        }
        setAddDialogOpen(false)
    }

    const handleUpdateIntervals = () => {
        useStore.setState({
            dateRangesAndInterval: selectedRanges.map(r => ({
                period: r as TChartRangePeriod,
                intervals: r === tempRange ? tempIntervals as TTimeIntervals[] :
                    (dateRangesAndInterval?.find(dr => dr.period === r)?.intervals || 
                    RANGE_CHART_INFO[r].intervals) as TTimeIntervals[]
            }))
        })
        setUpdateDialogOpen(false)
    }

    const toggleInterval = (interval: string) => {
        if (tempIntervals.includes(interval)) {
            setTempIntervals(tempIntervals.filter((i) => i !== interval))
        } else {
            setTempIntervals([...tempIntervals, interval])
        }
    }

    const removeInterval = (interval: string) => {
        setTempIntervals(tempIntervals.filter((i) => i !== interval))
    }

    const getAvailableIntervals = (range: string) => {
        const rangeInfo = RANGE_CHART_INFO[range as keyof typeof RANGE_CHART_INFO]
        return rangeInfo ? rangeInfo.intervals : []
    }

    const formatIntervalsForTooltip = (range: string) => {
        const customRange = dateRangesAndInterval?.find(r => r.period === range)
        const intervals = customRange?.intervals || RANGE_CHART_INFO[range as keyof typeof RANGE_CHART_INFO].intervals
        return intervals.map((interval) => intervalToDisplayLabel[interval] || interval).join(", ")
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <RangeList
                selectedRanges={selectedRanges}
                onRemoveRange={removeRange}
                onUpdateRange={openUpdateDialog}
                onAddRange={openAddDialog}
                formatTooltip={formatIntervalsForTooltip}
            />

            <RangeDialog
                isOpen={addDialogOpen}
                onOpenChange={setAddDialogOpen}
                title="Add Range"
                range={tempRange}
                onRangeChange={setTempRange}
                intervals={getAvailableIntervals(tempRange)}
                selectedIntervals={tempIntervals}
                onToggleInterval={toggleInterval}
                onRemoveInterval={removeInterval}
                onSubmit={handleAddRange}
            />

            <RangeDialog
                isOpen={updateDialogOpen}
                onOpenChange={setUpdateDialogOpen}
                title="Update Range"
                range={tempRange}
                onRangeChange={setTempRange}
                intervals={getAvailableIntervals(tempRange)}
                selectedIntervals={tempIntervals}
                onToggleInterval={toggleInterval}
                onRemoveInterval={removeInterval}
                onSubmit={handleUpdateIntervals}
                isRangeDisabled={true}
            />
        </div>
    )
}
