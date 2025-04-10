import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useInstrumentSelector } from "@/hooks/useInstrumentSelector";
import { useDispatch } from "react-redux";
import { setInstrumentDefault } from "@/store/slice/settings";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function DefaultIntrument() {
  const { selectorIntrusment } = useInstrumentSelector();
  const dispatch = useDispatch();
  const handleSetInstrumentDefault = (id: string) => dispatch(setInstrumentDefault(id));
  const { instrumentDefault } = useSelector((state: RootState) => state.settings);
  return (
    <div>
      <Select value={instrumentDefault || selectorIntrusment?.[0]?.id} onValueChange={handleSetInstrumentDefault}>
        <SelectTrigger className="w-full bg-white border-gray-300">
          <SelectValue placeholder="Select an instrument" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectorIntrusment?.map((instrument: any) => (
              <SelectItem key={instrument.id} value={instrument.id}>
                {instrument.symbol}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

    </div>
  )
}

export default DefaultIntrument