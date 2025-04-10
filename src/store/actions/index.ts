// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { message } from 'antd';

import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getCompanyCodesById, getInstrumentsByCompanyCode } from "../../services";

type GetCompanyCodeByIdParams = {
  companyCode: string;
  pageSize?: number;
  pageNumber?: number;
};
// import {
//   getInstruments,
//   getCompanyCodesById,
//   getAvailableLanguages,
//   getAvailableTools,
//   getTimeZones,
//   getCurrencies,
//   getInstrumentsByCompanyCode,
//   saveSessionState,
//   getSessionState,
//   applySettings,
//   uploadFont,
//   getFont,
//   deleteFontById,
//   deleteFontByFontFamily,
//   generateLink,
//   getVersionsByCompanyCode,
//   getOldSolutionsAndVersionsToolData,
//   migrateSolution,
//   getListFiles,
//   getContentFiles,
//   saveFile,
//   getCaptcha,
//   migration,
//   getToolsCenterLink,
//   getEventTypes,
//   getEventDescriptions,
//   getEventStatus,
//   getActivityLog,
//   getCssVersionsByCompanyCode,
//   confirmMigration,
//   getCustomePhraseApi,
//   getUserPermissions,
//   getRoles,
//   getPermissions,
//   createRole,
//   deleteRole,
//   updateRole,
//   assignRole,
//   searchUserByEmail,
//   getAllUserRoles,
// } from '../../services';
// import { STATUS_CODE } from '../../constants/service';

// export const getInstrumentsAction = createAsyncThunk(
//   'instrument/instrument',
//   async params => {
//     const instruments = await getInstruments(params);
//     return instruments;
//   }
// );

// export const getInstrumentByCompanyCodeAction = createAsyncThunk(
//   'instrument/getByCompanyCode',
//   async params => {
//     const response = await getInstrumentsByCompanyCode(params);
//     const instruments = response.data.data.instruments.map(instrument => ({
//       id: instrument.instrumentId,
//       name: instrument.shareName,
//       marketAbbreviation: instrument.market.marketAbbreviation,
//       marketId: instrument.market.marketNumber,
//       marketName: instrument.market.marketName,
//       symbol: instrument.ticker,
//       isin: instrument.isin,
//       allowRealTime: instrument.allowRealtime
//     }));
//     return {
//       instruments,
//       companyCode: params.companyCode,
//     };
//   }
// );

// export const getCompanyCodeByIdAction = createAsyncThunk(
//   'settings/companyCodes',
//   async params => {
//     const response = await getCompanyCodesById(params);
//     return response.data;
//   }
// );

// export const getAvailableLanguagesAction = createAsyncThunk(
//   'settings/availableLanguages',
//   async params => {
//     const response = await getAvailableLanguages(params);
//     return response.data;
//   }
// );

// export const getAvailableToolsAction = createAsyncThunk(
//   'settings/availableTools',
//   async params => {
//     const response = await getAvailableTools(params);
//     const data = response.data;

//     data.data.map(item => {
//       item.validationsRule = JSON.parse(item.validationsRule);
//       item.allowEditSettings = item.allowEditSettings
//         ? JSON.parse(item.allowEditSettings)
//         : {};
//       item.defaultSettings = item.defaultSettings
//         ? JSON.parse(item.defaultSettings)
//         : {};
//     });
//     return data;
//   }
// );

// export const getTimeZonesAction = createAsyncThunk(
//   'settings/timeZones',
//   async params => {
//     const response = await getTimeZones(params);
//     const data = response.data.data;
//     const uniqueValues = [];
//     data.forEach(element => {
//       if (!uniqueValues.some(value => value.name === element.name)) {
//         uniqueValues.push(element);
//       }
//     });
//     return uniqueValues;
//   }
// );

// export const getCurrenciesAction = createAsyncThunk(
//   'settings/currencies',
//   async params => {
//     const response = await getCurrencies(params);
//     return response.data;
//   }
// );

// export const saveSessionStateAction = createAsyncThunk(
//   'settings/saveSessionState',
//   async params => {
//     const response = await saveSessionState(params);
//     return response.data;
//   }
// );

// export const getSessionStateAction = createAsyncThunk(
//   'settings/getSessionState',
//   async (params, thunkAPI) => {
//     const response = await getSessionState(params);
//     // const { availableTools, basicSettings } = response.data.data;
//     // const { languages, companyCode } = basicSettings;

//     // thunkAPI.dispatch(getFontAction({ companyCode }));

//     // if (availableTools.length && languages.length) {
//     //   const langParams = languages.map(lang => lang.value);
//     //   if (!langParams.includes(DEFAULT_LANGUAGE)) {
//     //     langParams.push(DEFAULT_LANGUAGE);
//     //   }
//     //   thunkAPI.dispatch(
//     //     getCustomePhraseAction({
//     //       tools: availableTools.map(tool => tool.value),
//     //       languages: langParams,
//     //       changeBy: CHANGE_CUSTOM_PHRASES_BY.TOOLS,
//     //     })
//     //   );
//     // }
//     return response.data;
//   }
// );

// export const applySettingsAction = createAsyncThunk(
//   'settings/apply',
//   async (params, { rejectWithValue }) => {
//     try {
//       await applySettings(params);
//       const selectedLanguage = params.xml.languages[0];
//       const selectedTool = params.tools[0];
//       return {
//         companyCode: params.companyCode,
//         version: params.version,
//         availableTools: params.tools,
//         availableLanguages: params.xml.languages,
//         selectedTool,
//         selectedLanguage,
//       };
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const uploadFontAction = createAsyncThunk(
//   'settings/uploadFont',
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await uploadFont(params);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getFontAction = createAsyncThunk(
//   'settings/getFont',
//   async params => {
//     const response = await getFont(params);
//     return response.data;
//   }
// );

// export const deleteFontByIdAction = createAsyncThunk(
//   'settings/deleteFontById',
//   async params => {
//     const response = await deleteFontById(params);
//     return response.data;
//   }
// );

// export const deleteFontByFontFamilyAction = createAsyncThunk(
//   'settings/deleteFontByFontFamily',
//   async params => {
//     const response = await deleteFontByFontFamily(
//       `${params.fontFamily}/${params.companyCode}`
//     );
//     return response.data;
//   }
// );

// export const generateLinkAction = createAsyncThunk(
//   'settings/generateLink',
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await generateLink(params);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getVersionsAction = createAsyncThunk(
//   'settings/getVersionsByCompanyCode',
//   async params => {
//     const response = await getVersionsByCompanyCode(params);
//     return {
//       versions: response.data.data,
//       companyCode: params.companyCode,
//       tool: params.tool,
//     };
//   }
// );

// export const getCssVersionsAction = createAsyncThunk(
//   'settings/getCssVersionsByCompanyCode',
//   async params => {
//     const response = await getCssVersionsByCompanyCode(params);
//     return {
//       versions: response.data.data,
//       companyCode: params.companyCode,
//       tool: params.tool,
//     };
//   }
// );

// export const getOldSolutionsAndVersionsToolDataAction = createAsyncThunk(
//   'settings/getOldSolutionsAndVersionsToolData',
//   async params => {
//     const response = await getOldSolutionsAndVersionsToolData(params);

//     const versions = response.data.data;
//     const detailVersions = await Promise.all(
//       versions.map(async item => {
//         const res = await migrateSolution({
//           companyCode: params.companyCode,
//           solutionId: item.value,
//           version: item.value,
//         });
//         return {
//           ...res.data.data,
//           solutionId: item.value,
//           version: item.value,
//           ...item,
//         };
//       })
//     );

//     return { versions: detailVersions, companyCode: params.companyCode };
//   }
// );

// export const checkExistingVersionAction = createAsyncThunk(
//   'settings/checkExistingVersion',
//   async (params, { rejectWithValue }) => {
//     try {
//       const { tools, companyCode, version } = params;
//       const response = await getVersionsByCompanyCode({ tools, companyCode });
//       const listArrayVersions = response.data.data.destination.map(
//         ({ versions }) => versions
//       );
//       const versions = listArrayVersions.flatMap(versions => versions);
//       return {
//         isExist: versions.some(
//           ver => ver.toLowerCase() === version.toLowerCase()
//         ),
//         version,
//         companyCode,
//         tools,
//       };
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getListFilesAction = createAsyncThunk(
//   'migration/getListFiles',
//   async ({ params, onSuccess }, { rejectWithValue }) => {
//     const { companyCode } = params;
//     try {
//       const response = await getListFiles(params);
//       if (typeof onSuccess === 'function') {
//         onSuccess();
//       }
//       const toolsCenterLink = await getToolsCenterLink({ companyCode });
//       return {
//         companyCode,
//         data: response.data.data,
//         toolsCenterLink: toolsCenterLink.data.data.link,
//       };
//     } catch (error) {
//       const { data, status } = error.response;
//       if (status === STATUS_CODE.SERVER_ERROR) {
//         message.error(`Internal Server Error`);
//       } else if (status === STATUS_CODE.BAD_REQUEST) {
//         message.error(`Could not find company code ${companyCode}`);
//       }
//       return rejectWithValue(data);
//     }
//   }
// );

// export const getContentFilesAction = createAsyncThunk(
//   'migration/getContentFiles',
//   async params => {
//     const { tool, version, fileName, language } = params;
//     const response = await getContentFiles({ tool, fileName });
//     const { gamma, webcat } = response.data.data;
//     return { gamma, webcat, version, tool, language, fileName };
//   }
// );

// export const saveFileAction = createAsyncThunk(
//   'migration/saveFile',
//   async ({ params, onSuccess }, { rejectWithValue }) => {
//     try {
//       const response = await saveFile(params);
//       message.success('Save file successfully!');
//       onSuccess();
//       return response.data;
//     } catch (error) {
//       message.error('Failed to save file');
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getCaptchaAction = createAsyncThunk(
//   'migration/getCaptcha',
//   async params => {
//     const response = await getCaptcha(params);
//     return response.data;
//   }
// );

// export const migrationAction = createAsyncThunk(
//   'migration/migration',
//   async (params, { rejectWithValue }) => {
//     const { action } = params;
//     try {
//       const response = await migration(params);
//       const { data, statusCode } = response.data;

//       message.success('Update tools center successfully!');

//       return { action, data, statusCode };
//     } catch (error) {
//       const { status, title } = error.response.data;
//       if (status === STATUS_CODE.BAD_REQUEST && title) {
//         message.error(title);
//       } else {
//         message.error('Migrate fail');
//       }
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const confirmMigrationAction = createAsyncThunk(
//   'migration/confirm',
//   async (params, { rejectWithValue }) => {
//     try {
//       const { successMessage, token } = params;
//       const response = await confirmMigration({ token });
//       message.success(successMessage);
//       return response.data;
//     } catch (error) {
//       message.error('Failed to migrate');
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Activity Log

// export const getEventTypesAction = createAsyncThunk(
//   'activityLog/getEventTypes',
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await getEventTypes(params);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getEventDescriptionAction = createAsyncThunk(
//   'activityLog/getEventDescription',
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await getEventDescriptions(params);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getEventStatusAction = createAsyncThunk(
//   'activityLog/getEventStatus',
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await getEventStatus(params);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getActivityLogAction = createAsyncThunk(
//   'activityLog/getActivity',
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await getActivityLog(params);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getCustomePhraseAction = createAsyncThunk(
//   'settings/customePhrases',
//   async (params, { rejectWithValue }) => {
//     try {
//       const { tools, languages, changeBy } = params;
//       const response = await getCustomePhraseApi({ tools, languages });
//       return { data: response.data.data, changeBy };
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getUserPermissionsAction = createAsyncThunk(
//   'auth/getUserInfo',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getUserPermissions();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getRolesAction = createAsyncThunk(
//   'auth/getRoles',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getRoles();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getPermissionsAction = createAsyncThunk(
//   'auth/getPermissions',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getPermissions();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const createRoleAction = createAsyncThunk(
//   'auth/createRole',
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await createRole(params);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const deleteRoleAction = createAsyncThunk(
//   'auth/deleteRole',
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await deleteRole(params);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const updateRoleAction = createAsyncThunk(
//   'auth/updateRole',
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await updateRole(params);
//       return {
//         ...response.data.data,
//         permissions: params.permissions,
//       };
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const assignRoleAction = createAsyncThunk(
//   'auth/assignRole',
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await assignRole(params);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const searchUserByEmailAction = createAsyncThunk(
//   'auth/searchUserByUserName',
//   async (params, { rejectWithValue }) => {
//     try {
//       const response = await searchUserByEmail(params);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getAllUserRolesAction = createAsyncThunk(
//   'auth/getAllUserRoles',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getAllUserRoles();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const getInstrumentByCompanyCodeAction = createAsyncThunk(
  'settings/setInstruments',
  async (params: {
    companyCode: string;
}) => {
    const response = await getInstrumentsByCompanyCode(params);
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
    return {
      instruments,
      companyCode: params.companyCode,
    };
  }
);

export const setInstrumentSelectorAction = createAction(
  'settings/setInstrumentSelector',
  (params: { selectedInstruments: any[] }) => {
    return { payload: params.selectedInstruments };
  }
);
