import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import { instrumentSelector } from "../store/selector/settingSelector";
import { setInstrumentSelectorAction } from "../store/actions";

export const useInstrumentSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { instrumentSelector: selectorIntrusment } = useSelector(instrumentSelector);
  const setInstrumentSelector = (instruments: { selectedInstruments: number[] }) => {
    dispatch(setInstrumentSelectorAction(instruments));
  };
  return { selectorIntrusment, setInstrumentSelector };
};
