import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInstrumentByCompanyCodeAction } from "../store/actions";
import { instrumentByCompanyCodeSelector } from "../store/selector/settingSelector";
import type { AppDispatch } from "../store";

export const useInstruments = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { instruments, loading, error } = useSelector(instrumentByCompanyCodeSelector);

  useEffect(() => {
    const companyCode = "S-NDA";
    dispatch(getInstrumentByCompanyCodeAction({ companyCode }));
  }, [dispatch]);

  return { instruments, loading, error };
};
