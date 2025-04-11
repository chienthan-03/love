import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getInstrumentsByCompanyCode } from '../services';
import { TIME_INTERVALS } from '../constants/chartConstant';
import DEFAULT_SETTING from '../configs/defaultSetting';

interface IInstrument {
  id: string;
  name: string;
  marketAbbreviation: string;
  marketId: number;
  marketName: string;
  symbol: string;
  isin: string;
  allowRealTime: string;
}

interface IColor {
  primaryColor: string;
  fontColor: string;
  upColor?: string;
  downColor?: string;
}

interface IFront {
    fontFamily: string;
    fontSize: number;
}

export type TChartRangePeriod = '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | '5Y' | '10Y' | 'MAX' | 'Custom';
export type TTimeIntervals = typeof TIME_INTERVALS[keyof typeof TIME_INTERVALS]['value'];

export interface IDateRangeAndInterval {
    period: TChartRangePeriod;
    intervals: TTimeIntervals[];
}

interface State {
  // Instruments
  instruments: {
    data: Record<string, IInstrument>;
    companyCode: string | null;
    loading: boolean;
    error?: Error;
  };
  selectedInstruments: IInstrument[];
  defaultInstrument: IInstrument | null;
  
  // Colors
  colors: IColor;

  //I
  front: IFront;
  dateRangesAndInterval: IDateRangeAndInterval[];
  dateRangesDefault: IDateRangeAndInterval;
  // Actions
  fetchInstruments: (companyCode: string) => Promise<void>;
  setSelectedInstruments: (instruments: IInstrument[]) => void;
  setDefaultInstrument: (instrument: IInstrument | null) => void;
  setColors: (colors: Partial<IColor>) => void;
  setFront: (front: Partial<IFront>) => void;
  setDateRangeDefault: (dateRangesDefault: IDateRangeAndInterval) => void;
  
  // Computed values
  getState: () => State;
}

export const useStore = create<State>()(
  devtools(
    (set, get) => ({
      // Initial state
      instruments: {
        data: {},
        companyCode: null,
        loading: false,
        error: undefined,
      },
      selectedInstruments: [],
      defaultInstrument: null,
      colors: {
        primaryColor: "#2962FF",
        fontColor: "#131722",
        upColor: "#26A69A",
        downColor: "#EF5350",
      },
      front: {
        fontFamily: "system",
        fontSize: 14,
      },
      dateRangesAndInterval: DEFAULT_SETTING.dateRangesAndInterval,
      dateRangesDefault: DEFAULT_SETTING.dateRangesAndInterval[0],

      // Actions
      fetchInstruments: async (companyCode: string) => {
        set({ instruments: { ...get().instruments, loading: true } });
        try {
          const response = await getInstrumentsByCompanyCode({ companyCode });
          const instruments = response.data.data.instruments.map((instrument: any) => ({
            id: instrument.instrumentId,
            name: instrument.shareName,
            marketAbbreviation: instrument.market.marketAbbreviation,
            marketId: instrument.market.marketNumber,
            marketName: instrument.market.marketName,
            symbol: instrument.ticker,
            isin: instrument.isin,
            allowRealTime: instrument.allowRealtime
          }));

          set({
            instruments: {
              data: instruments.reduce((acc: Record<string, IInstrument>, curr: IInstrument) => {
                acc[curr.id] = curr;
                return acc;
              }, {}),
              companyCode,
              loading: false,
            }
          });
        } catch (error) {
          set({
            instruments: {
              ...get().instruments,
              loading: false,
              error: error as Error,
            }
          });
        }
      },

      setSelectedInstruments: (instruments) => {
        set({ selectedInstruments: instruments });
      },

      setDefaultInstrument: (instrument) => {
        set({ defaultInstrument: instrument });
      },

      setColors: (colors) => {
        set({ colors: { ...get().colors, ...colors } });
      },
      setFront: (front) => {
        set({ front: { ...get().front, ...front } });
      },

      setDateRangeDefault: (dateRangesDefault) => {
        set({ dateRangesDefault });
      },

      // Add getState method
      getState: () => get(),
    })
  )
);