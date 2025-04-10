import { createSlice } from "@reduxjs/toolkit";
import {
  DEFAULT_AVAILABLE_TOOLS,
  DEFAULT_GENERAL_TOOL_SETTINGS,
  DEFAULT_SG_SETTINGS,
  SHARE_GRAPH_TOOL,
} from "../../configs/defaultStateSetting";

export const initialFormState = {
  metaData: {
    step: {
      current: 0,
    },
    applyFromClonedVersion: undefined,
  },
  availableTools: {
    initState: DEFAULT_AVAILABLE_TOOLS,
    draft: DEFAULT_AVAILABLE_TOOLS,
  },
  generalSettings: {
    initState: DEFAULT_GENERAL_TOOL_SETTINGS,
    draft: undefined,
  },

  tools: /**
    @type {{[SHARE_GRAPH_TOOL]: {initState: typeof GENERAL_TOOL_SETTINGS, draft: typeof GENERAL_TOOL_SETTINGS}} & Record<string, {initState: any, draft: any, submitErrors: Array<any>, saving: boolean}>}
  */ ({
    [SHARE_GRAPH_TOOL]: {
      initState: DEFAULT_SG_SETTINGS,
      draft: undefined,
    },
  }),
};

const formsSlice = createSlice({
  name: "forms",
  initialState: initialFormState,
  reducers: {
    nextStep(state) {
      state.metaData.step.current++;
    },
    prevStep(state) {
      state.metaData.step.current--;
      if (state.metaData.step.current < 0) state.metaData.step.current = 0;
    },

    setAvailableToolsDraft: (state, action) => {
      state.availableTools.draft = action.payload;
    },

    saveAvailableToolsDraft: (state) => {
      if (!state.availableTools.draft) return;
      state.availableTools.initState = state.availableTools.draft;
      state.availableTools.draft = undefined;
    },

    setBasicSettingsDraft: (state, action) => {
      state.generalSettings.draft = action.payload;
    },

    saveBasicSettingsDraft: (state) => {
      if (!state.generalSettings.draft) return;
      state.generalSettings.initState = state.generalSettings.draft;
      state.generalSettings.draft = undefined;
    },

    setUpBasicSettings: (state, { payload }) => {
      const { defaultState } = payload;

      state.generalSettings.initState = defaultState;
      state.generalSettings.draft = undefined;
    },

    setGeneralSettingDraft: (state, action) => {
      state.generalSettings.draft = action.payload;
    },

    saveGeneralSettingDraft: (state) => {
      if (!state.generalSettings.draft) return;
      state.generalSettings.initState = state.generalSettings.draft;
      state.generalSettings.draft = undefined;
    },

    setUpTool: (state, { payload }) => {
      const { defaultState, toolName } = payload;

      if (!state.tools[toolName]) {
        state.tools[toolName] = {
          initState: defaultState,
          draft: undefined,
        };
      }
    },

    setToolDraft: (state, action) => {
      const { toolName, ...payload } = action.payload;

      state.tools[toolName].draft = payload;
    },

    saveToolDraft: (state, action) => {
      const toolName = action.payload;
      const toolData = state.tools[toolName];

      if (!toolData || !toolData.draft) return;
      toolData.initState = toolData.draft;
      toolData.draft = undefined;
    },

    applySession(state, { payload }) {
      return payload;
    },

    resetSession() {
      return {
        ...initialFormState,
        generalSettings: {
          initState: { ...DEFAULT_GENERAL_TOOL_SETTINGS, instrumentIds: [] },
          draft: undefined,
        },
      };
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(
  //     saveToolSettingAction.pending,
  //     (state, { meta: { arg } }) => {
  //       if (state.tools[arg.tool]) {
  //         state.tools[arg.tool].draft = true;
  //       }
  //     }
  //   );

  //   builder.addCase(
  //     saveToolSettingAction.rejected,
  //     function (state, { meta: { arg }, payload }) {
  //       if (state.tools[arg.tool]) {
  //         state.tools[arg.tool].draft = false;
  //       }
  //     }
  //   );

  //   builder.addCase(
  //     saveToolSettingAction.fulfilled,
  //     (state, { meta: { arg } }) => {
  //       if (state.tools[arg.tool]) {
  //         state.tools[arg.tool].draft = false;
  //       }
  //     }
  //   );
  // },
});

export default formsSlice;

export const {
  setAvailableToolsDraft,
  setBasicSettingsDraft,
  setGeneralSettingDraft,
  setToolDraft,
  saveAvailableToolsDraft,
  saveBasicSettingsDraft,
  saveGeneralSettingDraft,
  saveToolDraft,
  applySession,
  resetSession,
  nextStep,
  prevStep,
  setUpTool,
  setUpBasicSettings,
} = formsSlice.actions;
