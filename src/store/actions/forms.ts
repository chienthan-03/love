// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {saveSettingFile} from "../../services";
// import {AxiosError} from "axios";

// export const saveToolSettingAction = createAsyncThunk(
//   "forms/saveToolSetting",
//   /**
//    * 
//    * @param {{apiPayload: Record<string, any>, tool: string,toolNameIntegration, companyCode: string, version: string}} param0 
//    */
//   async ({ apiPayload, tool,toolNameIntegration, companyCode, version }: { apiPayload: Record<string, any>; tool: string; toolNameIntegration; companyCode: string; version: string; }, { rejectWithValue }) => {
//     try {
//       await saveSettingFile({
//         ...apiPayload,
//         toolNameIntegration,
//         companyCode,
//         version,
//       });
//     } catch(error) {
//       if(error instanceof AxiosError) {
//         const message = JSON.parse(error?.response?.data?.message ?? "[]");
//         const submitErrors = message.reduce((acc, item) => {
//           if(acc[item.Key]) {
//             acc[item.Key].push(item.Message)
//           } else {
//             acc[item.Key] = [item.Message]
//           }
//           return acc;
//         }, {})
//         return rejectWithValue({
//           message: error.message,
//           name: error.name,
//           code: error.code,
//           tool,
//           submitErrors
//         })
//       }
//     }
    
//   }
// );

export const saveToolSettingAction = () => {
  return {
    type: "forms/saveToolSetting",
  };
}