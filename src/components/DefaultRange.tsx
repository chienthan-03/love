import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@euroland/ci-shadcn-styleguide";
import { useStore } from "../store/useStore";
import { periodToDisplayLabel } from "../constants/chartConstant";
const DefaultRange = () => {
    const selectedRanges = useStore(state => state.dateRangesAndInterval);
    const dateRangesDefault = useStore(state => state.dateRangesDefault);
    const setDateRangeDefault = useStore(state => state.setDateRangeDefault);
    const defaultRangeSelect = selectedRanges.map(select => {
        return {
            value: select.period,
            label: periodToDisplayLabel[select.period] || select.period,
        }
    })
    console.log("defaultRangeSelect", dateRangesDefault);

    return (
        <div className="flex flex-col gap-2">
            <Select value={dateRangesDefault.period} onValueChange={(value) => { 
                const selectedRange = selectedRanges.find(range => range.period === value);
                if (selectedRange) {
                    setDateRangeDefault(selectedRange);
                }
            }} >
                <SelectTrigger className="w-full bg-white border-gray-300">
                    <SelectValue placeholder="Select a range" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {defaultRangeSelect.map((range) => (
                            <SelectItem key={range} value={range.value}>
                                {range.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default DefaultRange;