import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const addCutomer = async (data: {
  customerName: string;
  userEmail: string;
  customerCode: number;
  band: string;
  join_date: string;
  contact: string;
  address: string;
  city: string;
  state: string;
  country: string;
  superwiser_emp_code: string;
  emergency_contact: string;
}) => {
  try {
    const response = await API.post("/customers/store", data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getCustomers = async (searchText: string) => {
  try {
    const response = await API.get("/customers/getalluser", {
      params: {
        search: searchText,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCustomerByID = async (id: any) => {
  try {
    const response = await API.get(`/customers/${id}/getsingleUser`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteUser = async (id: number, isDeleted: boolean) => {
  try {
    const response = await API.patch(`/customers/${id}`, { isDeleted });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateCustomer = async (
  customerId: number,
  data: any
): Promise<any> => {
  try {
    const response = await API.put(`/customers/${customerId}/update`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const activateDeactivateUser = async (customerId: number, status: boolean) => {
  try {
    const response = await API.put(`/customers/${customerId}/update-status`, {
      status,
    });
    return response.data;
  } catch (error : any) {
    throw error;
  }
};
