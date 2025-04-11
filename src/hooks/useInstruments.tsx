import { useStore } from "../store/useStore";

export const useInstruments = () => {
  const instruments = useStore(state => Object.values(state.instruments.data));
  const loading = useStore(state => state.instruments.loading);
  const error = useStore(state => state.instruments.error);
  const fetchInstruments = useStore(state => state.fetchInstruments);

  return { instruments, loading, error, fetchInstruments };
};
