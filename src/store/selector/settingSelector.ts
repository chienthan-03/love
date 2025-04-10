import { createSelector } from "reselect";
import {selectSelf} from "./selectSelf";

export const companyCodesSelector = createSelector(
  [
    state => state.settings.companyCodes.data,
    state => state.settings.companyCodes.ids,
    state => state.settings.companyCodes.loading,
    state => state.settings.companyCodes.error,
  ],
  (companyCodesData, companyCodeIds, loading, error) => ({
    companyCodes: companyCodeIds.map(id => companyCodesData[id]),
    loading,
    error,
  })
);

export const companyCodesLoadMoreSelector = createSelector(
  [
    state => selectSelf(state).settings.companyCodes.data,
    state => selectSelf(state).settings.companyCodes.loadMoreIds,
    state => selectSelf(state).settings.companyCodes.isLoadMore,
    state => selectSelf(state).settings.companyCodes.loading,
    state => selectSelf(state).settings.companyCodes.error,
  ],
  (companyCodesData, loadMoreIds, isLoadMore, loading, error) => ({
    loadMoreCompanyCodes: loadMoreIds.map(id => companyCodesData[id]),
    isLoadMore,
    loading,
    error,
  })
);

export const availableLanguagesSelector = createSelector(
  [
    state => state.settings.availableLanguages.data,
    state => state.settings.availableLanguages.ids,
    state => state.settings.availableLanguages.selectedIds,
    state => state.settings.availableLanguages.loading,
    state => state.settings.availableLanguages.error,
  ],
  (data, ids, selectedLanguages, loading, error) => ({
    availableLanguages: ids.map(id => data[id]),
    selectedLanguages,
    loading,
    error,
  })
);

export const availableToolsSelector = createSelector(
  [
    state => state.settings.availableTools.data,
    state => state.settings.availableTools.ids,
    state => state.settings.availableTools.selectedIds,
    state => state.settings.availableTools.loading,
    state => state.settings.availableTools.error,
  ],
  (data, ids, selectedTools, loading, error) => ({
    availableTools: ids.map(id => data[id]),
    selectedTools,
    loading,
    error,
  })
);

export const timezonesSelector = createSelector(
  [
    state => state.settings.timeZones.data,
    state => state.settings.timeZones.ids,
    state => state.settings.timeZones.loading,
    state => state.settings.timeZones.error,
  ],
  (data, ids, loading, error) => ({
    timezones: ids.map(id => data[id]),
    loading,
    error,
  })
);

export const currenciesSelector = createSelector(
  [
    state => state.settings.currencies.data,
    state => state.settings.currencies.ids,
    state => state.settings.currencies.loading,
    state => state.settings.currencies.error,
  ],
  (data, ids, loading, error) => ({
    currencies: ids.map(id => data[id]),
    loading,
    error,
  })
);


export const saveSessionStateSelector = createSelector(
  [
    state => state.settings.sessionState,
    state => state.settings.saveSessionState.loading,
    state => state.settings.saveSessionState.error,
  ],
  (data, loading, error) => ({
    sessionState: data,
    loading,
    error,
  })
);

export const getSessionStateSelector = createSelector(
  [state => state.settings.getSessionState.loading, state => state.settings.getSessionState.error],
  (loading, error) => ({
    loading,
    error,
  })
);

export const applySettingsSelector = createSelector(
  [
    state => state.settings.apply.data,
    state => state.settings.apply.loading,
    state => state.settings.apply.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

export const generateLinkSelector = createSelector(
  [
    state => state.settings.generateLink.data,
    state => state.settings.generateLink.loading,
    state => state.settings.generateLink.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

export const fontsSelector = createSelector(
  [
    state => state.settings.fonts.data,
    state => state.settings.fonts.ids,
    state => state.settings.fonts.selectedFontFamily,
    state => state.settings.fonts.loading,
    state => state.settings.fonts.error,
    state => state.settings.fonts.deletingId,
    state => state.settings.fonts.deletingFontFamily,
  ],
  (data, ids, selectedFontFamily, loading, error, deletingId, deletingFontFamily) => {
    const uniqueFontFamiliesSet = new Set();
    const uniqueFonts = [];

    const focusFonts = ids.map(fontId => data[fontId]).filter(font => font.fontFamily === selectedFontFamily);
    ids.forEach(fontId => {
      const font = data[fontId];
      const fontFamily = font.fontFamily;

      if (!uniqueFontFamiliesSet.has(fontFamily)) {
        uniqueFontFamiliesSet.add(fontFamily);
        uniqueFonts.push(font);
      }
    });

    return {
      data,
      uniqueFonts,
      focusFonts,
      selectedFontFamily,
      deletingId,
      deletingFontFamily,
      loading,
      error,
    };
  }
);

export const getXMLSelector = createSelector(
  [
    state => state.settings.getXMLState.data,
    state => state.settings.getXMLState.loading,
    state => state.settings.getXMLState.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

export const getVersionsSelector = createSelector(
  [
    state => state.settings.versionsByCompanyCode.versions,
    state => state.settings.versionsByCompanyCode.companyCode,
    state => state.settings.versionsByCompanyCode.tool,
    state => state.settings.versionsByCompanyCode.loading,
    state => state.settings.versionsByCompanyCode.error,
  ],
  (versions, companyCode, tool, loading, error) => ({
    versions,
    companyCode,
    tool,
    loading,
    error,
  })
);

export const getCssVersionsSelector = createSelector(
  [
    state => state.settings.cssVersionsByCompanyCode.versions,
    state => state.settings.cssVersionsByCompanyCode.companyCode,
    state => state.settings.cssVersionsByCompanyCode.tool,
    state => state.settings.cssVersionsByCompanyCode.loading,
    state => state.settings.cssVersionsByCompanyCode.error,
  ],
  (versions, companyCode, tool, loading, error) => ({
    versions,
    companyCode,
    tool,
    loading,
    error,
  })
);

export const existingVersionSelector = createSelector(
  [
    state => state.settings.existingVersion.data,
    state => state.settings.existingVersion.loading,
    state => state.settings.existingVersion.error,
  ],
  (data, loading, error) => ({
    data,
    loading,
    error,
  })
);

export const getSolutionsSelector = createSelector(
  [
    state => state.settings.solutionsByCompanyCode.solutions,
    state => state.settings.solutionsByCompanyCode.companyCode,
    state => state.settings.solutionsByCompanyCode.loading,
    state => state.settings.solutionsByCompanyCode.error,
  ],
  (solutions, companyCode, loading, error) => ({
    solutions,
    companyCode,
    loading,
    error,
  })
);

export const getMigrateShareGraphSelector = createSelector(
  [
    state => state.settings.migrate.data,
    state => state.settings.migrate.solutionId,
    state => state.settings.migrate.companyCode,
    state => state.settings.migrate.loading,
    state => state.settings.migrate.error,
  ],
  (data, solutionId, companyCode, loading, error) => ({
    data,
    solutionId,
    companyCode,
    loading,
    error,
  })
);

export const customPhrasesSelector = createSelector(
  [
    state => state.settings.customPhrases.data,
    state => state.settings.customPhrases.loading,
    state => state.settings.customPhrases.error,
    state => state.settings.customPhrases.changeBy,
  ],
  (data, loading, error, changeBy) => ({
    data,
    loading,
    error,
    changeBy,
  })
);


export const instrumentByCompanyCodeSelector = createSelector(
  [
    state => state.settings.instrumentsByCompanyCode.data,
    state => state.settings.instrumentsByCompanyCode.loading,
    state => state.settings.instrumentsByCompanyCode.error,
  ],
  (data, loading, error) => ({
    instruments: Object.values(data),
    loading,
    error,
  })
);

export const instrumentSelector = createSelector(
  [
    state => state.settings.instrumentSelector,
  ],
  (instrumentSelector) => ({
    instrumentSelector,
  })
);