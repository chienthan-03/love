import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@euroland/ci-shadcn-styleguide"
import { useStore } from "../store/useStore";

function DefaultIntrument() {
  const selectedInstruments = useStore(state => state.selectedInstruments);
  const defaultInstrument = useStore(state => state.defaultInstrument);
  const setDefaultInstrument = useStore(state => state.setDefaultInstrument);
  
  const handleSetInstrumentDefault = (id: string) => {
    const instrument = selectedInstruments.find(inst => inst.id === id) || null;
    setDefaultInstrument(instrument);
  };

  return (
    <div>
      <Select 
        value={defaultInstrument?.id || selectedInstruments[0]?.id}
        onValueChange={handleSetInstrumentDefault}
      >
        <SelectTrigger className="w-full bg-white border-gray-300">
          <SelectValue placeholder="Select an instrument" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selectedInstruments?.map((instrument) => (
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