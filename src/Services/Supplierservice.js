import API from "./api";

export const supplierService = {
  getDashboardMetrics: async () => {
    const response = await API.get("/supplier/metrics");
    return response.data;
  },

  getProfileDetails: async () => {
    const response = await API.get("/supplier/profile");
    return response.data;
  },

  updateProfileDetails: async (profilePayload) => {
    const response = await API.put("/supplier/profile", profilePayload);
    return response.data;
  },

  getStockList: async () => {
    const response = await API.get("/supplier/stock");
    return response.data;
  },

  getVendorRequests: async () => {
    const response = await API.get("/supplier/vendor-requests");
    return response.data;
  },

  updateVendorRequestStatus: async (requestId, status) => {
    const response = await API.patch(`/supplier/vendor-requests/${requestId}`, { status });
    return response.data;
  },

  // Parameter renamed to isMultipart to match your context call signature
  addProduct: async (productData, isMultipart = false) => {
    const config = isMultipart 
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};

    const response = await API.post("/supplier/products", productData, config);
    return response.data;
  }
};
