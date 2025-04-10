import api from './api';
import { API } from '../constants/service';

export const getAvailableLanguages = (params: any) =>
    api.GET(API.GET_AVAILABLE_LANGUAGES, params);
  
export const getCompanyCodesById = (params: any) =>
    api.GET(API.GET_COMPANY_CODES, params);

export const getInstrumentsByCompanyCode = params =>
    api.GET(API.GET_INSTRUMENT_BY_COMPANY_CODE, params);
  