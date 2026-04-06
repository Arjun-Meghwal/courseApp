import React from 'react'
import { toast } from 'react-hot-toast'
import { catalogData } from '../apis';
export const getCatalogaPageData = async (Category) => {
  const toastId = toast.loading("Loading...")
  let result = [];

  try {
    const response = await apiConnector("POST", catalogData.CATALOG_DATA_API, { categoryId: Category })
    if (!response?.data?.success)
      throw new Error("Could not fetch data")
    const result = response?.data;
  }
  catch (error) {
    console.log("Error in fetching data", error)
    toast.error("Error in fetching data")
    result = error.response?.data;
  }
  toast.dismiss(toastId)
  return result;
}

