import { createSlice, SerializedError } from "@reduxjs/toolkit";

// import {
//   applySettingsAction,
//   getAvailableLanguagesAction,
//   getAvailableToolsAction,
//   getCompanyCodeByIdAction,
//   getCurrenciesAction,
//   getInstrumentByCompanyCodeAction,
//   getFontAction,
//   getSessionStateAction,
//   getTimeZonesAction,
//   saveSessionStateAction,
//   uploadFontAction,
//   deleteFontByIdAction,
//   deleteFontByFontFamilyAction,
//   generateLinkAction,
//   getVersionsAction,
//   getOldSolutionsAndVersionsToolDataAction,
//   checkExistingVersionAction,
//   getCssVersionsAction,
//   getCustomePhraseAction,
// } from "../actions";
import { trimObjectProperties } from "../../utils/common";
// import {
//   savePackageAction,
//   getSavedPackagesAction,
// } from "../actions/packageAction";
import {
  defaultInstruments,
} from "../../configs/defaultStateSetting";
import { getInstrumentByCompanyCodeAction } from "../actions";

type SettingsState = {
  instrumentsByCompanyCode: {
    data: Record<string, any>;
    companyCode: string | null;
    ids: string[];
    loading: boolean;
    error: SerializedError | undefined;
  };
  instrumentSelector: any[];
  instrumentDefault: any;
  color: {
    primaryColor: string;
    fontColor: string;
  }
};

const initialState : SettingsState = {
  instrumentsByCompanyCode: {
    data: {},
    companyCode: null,
    ids: [],
    loading: false,
    error: undefined,
  },
  instrumentSelector: [],
  instrumentDefault: null,
  color: {
    primaryColor: "#2962FF",
    fontColor: "#131722",
  }
}
const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setInstruments: (state, action) => {
      state.instrumentsByCompanyCode = action.payload;
    },
    setInstrumentSelector: (state, action) => {
      state.instrumentSelector = action.payload;
    },
    setInstrumentDefault: (state, action) => {
      state.instrumentDefault = action.payload;
    },
    setColor: (state, action) => {
      state.color = { ...state.color, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getInstrumentByCompanyCodeAction.pending, (state) => {
      state.instrumentsByCompanyCode.loading = true;
    });
    builder.addCase(
      getInstrumentByCompanyCodeAction.fulfilled,
      (state, action) => {
        const { instruments, companyCode } = action.payload;
        state.instrumentsByCompanyCode.companyCode = companyCode;
        state.instrumentsByCompanyCode.data = instruments;
        state.instrumentsByCompanyCode.loading = false;
      }
    );
    builder.addCase(
      getInstrumentByCompanyCodeAction.rejected,
      (state, action) => {
        state.instrumentsByCompanyCode.error = action.error;
        state.instrumentsByCompanyCode.loading = false;
        state.instrumentsByCompanyCode.companyCode = null;
      }
    );
  }
});

export const {
  setInstruments,
  setInstrumentSelector,
  setInstrumentDefault,
  setColor
} = settingsSlice.actions;
export default settingsSlice;
