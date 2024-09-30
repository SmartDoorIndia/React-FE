/** @format */

import mainApiService from '../../services/apiService';

import { showToastErrMessage } from './index';

/**
 * Desc: Use to get Admin Builders list data 
 * Return: API response in list.
 * 
 * @param {object} data 
 * @keys  {data}   userId, location
 * @return {Array}
 */
export const getAdminBuilderProject = async (data) => {
  const response = await mainApiService('getAdminBuilderProject', data);

  if (response.data.status !== 200) {
    showToastErrMessage(response);
    return [];
  }

  return response.data.resourceData;
};


/**
 * Desc: Use to get Admin Builder's projects list by ID
 * Return: API response in list.
 * 
 * @param {object} data 
 * @keys  {data}   userId, id
 * @return {Array}
 */
export const getAdminBuilderProjectById = async (data) => {
  const response = await mainApiService('getAdminBuilderProjectById', data);

  if (response.data.status !== 200) {
    showToastErrMessage(response);
    return [];
  }

  return response.data.resourceData;

}


/**
 * Desc: Use to get Admin Builder's projects Details by ID
 * Return: API response in list.
 * 
 * @param {object} data 
 * @keys  {data}   userId, projectId
 * @return {Array}
 */
export const getAdminBuilderProjectDetailById = async (data) => {
  const response = await mainApiService('getAdminBuilderProjectDetailById', data);

  if (response.data.status !== 200) {
    return null;
  }

  return response.data.resourceData;

}

export const getBuilderProjects = async (data) => {
  const response = await mainApiService('getBuilderProjects', data);

  if (response.data.status !== 200) {
    return null;
  }

  return response.data.resourceData;

}

export const getBuilderProjectStats = async (data) => {
  const response = await mainApiService('getBuilderProjectStats', data);

  if (response.data.status !== 200) {
    return null;
  }

  return response.data.resourceData;

}

export const getBuilderProjectSubPosts = async (data) => {
  const response = await mainApiService('getBuilderProjectSubPosts', data);

  if (response.data.status !== 200) {
    return null;
  }

  return response.data.resourceData;

}

export const getBuilderProjectById = async (data) => {
  const response = await mainApiService('getBuilderProjectById', data);

  if (response.data.status !== 200) {
    return null;
  }

  return response.data.resourceData;

}
