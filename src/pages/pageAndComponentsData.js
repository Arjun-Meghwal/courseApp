import React from 'react'
import { toast } from 'react-toastify';
import { apiConnector } from '../services/apiconnector';
import { catalogData } from '../services/apis';
export const getCatlogPageData = async(categoryId) => {
  const toastId=toast.loading("loading..");
  let result=[];
  try{
    const response=await apiConnector("POST",catalogData.CATALOG_PAGE_DATA_API,
      {categoryId:categoryId}
    );
    if(!response?.data?.success)
      throw new Errow("could not fetch category page data");
    const result=response?.data;
  }
  catch(error){
    console.log("CATALOG PAGE DATA API ERROR..",error)
    toast.error(error.message);
    result=error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
  return (
    <div>
      
    </div>
  )
}
