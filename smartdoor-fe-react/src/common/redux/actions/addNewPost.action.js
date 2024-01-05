import mainApiService from '../../services/apiService';

export const getSocietyByCity = async (data) => {
    const response = await mainApiService('getSocietyName', data);
  
    if (response.data.status !== 200) {
    //   showToastErrMessage(response);
      return [];
    }
  
    return response.data.resourceData;
  };

export const getPlanDetails = async (data) => {
  const response = await mainApiService('getPlanDetails', data);
  if(response.data.status !== 200) {
    return [];
  } 
  return response.data.resourceData;
};

export const getAllFiltersForNewPost = async(data) =>{
  const response = await mainApiService('getAllFiltersForNewPost' , data);
  if(response.data.status !== 200) {
    return [];
  } 
  console.log(response.data.resourceData);
  return response.data.resourceData;
  
}