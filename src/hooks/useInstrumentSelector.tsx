import { useStore } from "../store/useStore";

export const useInstrumentSelector = () => {
  const selectedInstruments = useStore(state => state.selectedInstruments);
  const setSelectedInstruments = useStore(state => state.setSelectedInstruments);
  
  return { selectedInstruments, setSelectedInstruments };
};
