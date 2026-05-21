import React, { createContext, useState, useContext, useEffect } from "react";
import { supplierService } from "../Services/supplierService";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [vendorRequests, setVendorRequests] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [systemActivities, setSystemActivities] = useState(() => {
    const saved = localStorage.getItem("supplier_activity_logs");
    return saved ? JSON.parse(saved) : [];
  });

  const logActivity = (actionText, actionBadge = "System", isUrgent = false) => {
    const newActivity = {
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      text: actionText,
      badge: actionBadge,
      urgent: isUrgent,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSystemActivities((prev) => {
      const updated = [newActivity, ...prev].slice(0, 10);
      localStorage.setItem("supplier_activity_logs", JSON.stringify(updated));
      return updated;
    });
  };

  const refreshDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const [stockRes, requestsRes, profileRes] = await Promise.all([
        supplierService.getStockList(),
        supplierService.getVendorRequests(),
        supplierService.getProfileDetails(),
      ]);

      const stockData = stockRes?.data || stockRes;
      const requestsData = requestsRes?.data || requestsRes;
      const profileData = profileRes?.data || profileRes;

      setProducts(Array.isArray(stockData) ? stockData : []);
      setVendorRequests(Array.isArray(requestsData) ? requestsData : []);
      setProfile(profileData || null);
    } catch (err) {
      console.error("Failed to sync inventory context across sidebar menus:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      refreshDashboardData();
      if (localStorage.getItem("supplier_activity_logs") === null) {
        logActivity("Supplier workspace authenticated and secure connection established.", "Auth", false);
      }
    }
  }, []);

  const addGlobalProduct = async (formDataPayload) => {
    try {
      setLoading(true);
      const productName = formDataPayload.get("name") || "Product Item";
      const productStock = formDataPayload.get("stock") || "0";

      const response = await supplierService.addProduct(formDataPayload, true);
      const parsedProduct = response?.data || response;

      if (parsedProduct && parsedProduct.name) {
        setProducts((prev) => {
          const incomingName = parsedProduct.name.toLowerCase();
          const filtered = prev.filter(
            (p) => p && p.name && p.name.toLowerCase() !== incomingName
          );
          return [parsedProduct, ...filtered];
        });
      }

      await refreshDashboardData(); 

      logActivity(`Catalog update: Added/Replenished ${productStock} units of "${productName}" in stock.`, "Stock", false);

      return { success: true };
    } catch (err) {
      console.error("Failed to add product:", err);
      return { 
        success: false, 
        error: err?.response?.data?.detail || err?.response?.data?.message || err.message || "Failed to persist transaction record."
      };
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId, nextStatus) => {
    try {
      const targetReq = vendorRequests.find(r => r.id === requestId);
      const pName = targetReq ? targetReq.product : "Goods";
      const vName = targetReq ? targetReq.vendorName : "Vendor";

      await supplierService.updateVendorRequestStatus(requestId, nextStatus);
      
      setVendorRequests((prev) =>
        prev.map((req) => (req.id === requestId ? { ...req, status: nextStatus } : req))
      );

      logActivity(`Order finalized: Procurement from "${vName}" for "${pName}" status set to [${nextStatus}].`, "Order", nextStatus === "Rejected");

      await refreshDashboardData();
      return { success: true };
    } catch (err) {
      console.error("Failed to update vendor transaction status:", err);
      return { success: false, error: err.message };
    }
  };

  return (
    <InventoryContext.Provider 
      value={{ 
        products, 
        setProducts, 
        vendorRequests, 
        setVendorRequests, 
        profile,
        loading,
        systemActivities, 
        logActivity,      
        addGlobalProduct,
        updateRequestStatus,
        refreshDashboardData
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
}
