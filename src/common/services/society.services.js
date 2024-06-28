/** @format */

import CONSTANTS from '../helpers/Constants';
import { getLocalStorage } from '../helpers/Utils';

const LOCAL_STORAGE = getLocalStorage('authData');
export const getSocietyLeads = async (data = {}) => {
  const url = CONSTANTS.baseUrl + 'admin/sales/getSocietyLeads';
  const options = {
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Authorization': 'bearer ' + LOCAL_STORAGE.access_token,
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url, options);
  return response.json();
};
