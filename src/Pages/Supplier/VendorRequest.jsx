import React, { useEffect, useState } from "react";
import PageContainer from "../../components/layout/PageContainer";
import Button from "../../components/ui/Button";
import { useInventory } from "../../Context/Inventorycontext"; 
import { toast } from "react-toastify";

export default function VendorRequests() {
  const { products, vendorRequests, updateRequestStatus, refreshDashboardData } = useInventory();
  
  // Dynamic component tab filter state mapping unit
  const [statusFilter, setStatusFilter] = useState("All"); // Options: "All", "Pending", "Accepted", "Rejected"

  useEffect(() => {
    if (refreshDashboardData) {
      refreshDashboardData();
    }
  }, []);

  const handleAccept = async (id) => {
    const request = vendorRequests.find((r) => r.id === id);
    if (!request || request.status !== "Pending") return;

    const targetProduct = products.find(
      (p) => p && p.name && p.name.toLowerCase() === request.product.toLowerCase()
    );

    if (!targetProduct) {
      toast.error(`Error: "${request.product}" does not exist in your warehouse system stock.`);
      return;
    }

    if (targetProduct.stock < request.quantity) {
      toast.error(`Insufficient Stock! ${targetProduct.name} only has ${targetProduct.stock} units left.`);
      return;
    }

    const result = await updateRequestStatus(id, "Accepted");

    if (result && result.success) {
      toast.success(`Request accepted! Dispatched ${request.quantity} units to ${request.vendorName}.`);
      if (refreshDashboardData) {
        await refreshDashboardData(); 
      }
    } else {
      toast.error(result?.error || "Failed to submit status transformation to database.");
    }
  };

  const handleReject = async (id) => {
    const result = await updateRequestStatus(id, "Rejected");
    
    if (result && result.success) {
      toast.info(`Procurement request from vendor rejected successfully.`);
      if (refreshDashboardData) {
        await refreshDashboardData();
      }
    } else {
      toast.error(result?.error || "Failed to submit status transformation to database.");
    }
  };

  // Perform localized array row filtering based on clicked active tab criteria
  const filteredRequests = (vendorRequests || []).filter((req) => {
    if (!req) return false;
    if (statusFilter === "All") return true;
    return req.status?.toLowerCase() === statusFilter.toLowerCase();
  });

  // Modern UI Style Blocks Matrix
  const headerWrapperStyle = {
    fontFamily: "'Inter', sans-serif",
    marginBottom: "32px",
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: "16px",
    textAlign: "left"
  };

  const mainHeadingStyle = {
    margin: "0 0 6px 0",
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: "-0.02em"
  };

  const subHeadingStyle = {
    margin: 0,
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "400"
  };

  const tableContainerStyle = {
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    width: "100%",
    boxSizing: "border-box",
    marginTop: "8px"
  };

  // Heading Header Row Layout holding both Title text and Tab Buttons block 
  const tableTitleBarStyle = {
    padding: "20px 24px",
    borderBottom: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px"
  };

  const segmentConsoleStyle = {
    display: "flex",
    backgroundColor: "#f1f5f9",
    padding: "4px",
    borderRadius: "8px",
    gap: "2px"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: "14px",
    fontFamily: "'Inter', sans-serif"
  };

  const thStyle = {
    padding: "18px 24px",
    background: "#f8fafc",
    color: "#475569",
    fontWeight: "600",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    borderBottom: "1px solid #e2e8f0",
  };

  const tdStyle = {
    padding: "18px 24px",
    color: "#334155",
    borderBottom: "1px solid #f1f5f9",
    verticalAlign: "middle",
  };

  const actionContainerStyle = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  };

  return (
    <PageContainer>
      {/* TITLE CONTAINER */}
      <div style={headerWrapperStyle}>
        <h2 style={mainHeadingStyle}>Vendor Requests</h2>
        <p style={subHeadingStyle}>Manage incoming procurement and stock fulfillment requests from vendors.</p>
      </div>

      {/* RESTRUCTURED DATA CONTAINER WALL */}
      <div style={tableContainerStyle}>
        
        {/* COMPACT TOP-BAR HEADER LINE: CONTAINS PREMIUM ALIGNED TABS CONTROLS */}
        <div style={tableTitleBarStyle}>
          <span style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", fontFamily: "'Inter', sans-serif" }}>
            Fulfillment Queue
          </span>
          
          {/* HIGH-END INTERACTIVE TAB ROW SEGMENT PANEL */}
          <div style={segmentConsoleStyle}>
            {["All", "Pending", "Accepted", "Rejected"].map((tab) => {
              const isSelected = statusFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  style={{
                    border: "none",
                    outline: "none",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    backgroundColor: isSelected ? "#ffffff" : "transparent",
                    color: isSelected ? "#2563eb" : "#475569",
                    boxShadow: isSelected ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)" : "none",
                    transition: "all 0.15s ease-in-out"
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Vendor</th>
                <th style={thStyle}>Product</th>
                <th style={thStyle}>Quantity</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests && filteredRequests.length > 0 ? (
                filteredRequests.map((req) => req && (
                  <tr
                    key={req.id}
                    style={{ transition: "background-color 0.2s ease" }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <td style={{ ...tdStyle, fontWeight: "600", color: "#0f172a" }}>{req.vendorName}</td>
                    <td style={{ ...tdStyle, color: "#475569", fontWeight: "500" }}>{req.product}</td>
                    <td style={{ ...tdStyle, fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontWeight: "600", color: "#0f172a", fontSize: "14px" }}>{req.quantity}</td>
                    
                    <td style={tdStyle}>
                      <span
                        style={{
                          padding: "6px 14px",
                          borderRadius: "8px",
                          fontWeight: "600",
                          fontSize: "12px",
                          display: "inline-block",
                          letterSpacing: "0.02em",
                          background:
                            req.status === "Accepted"
                              ? "#e6f4ea"
                              : req.status === "Rejected"
                              ? "#fee2e2"
                              : "#fef9c3",
                          color:
                            req.status === "Accepted"
                              ? "#137333"
                              : req.status === "Rejected"
                              ? "#c53030"
                              : "#a16207",
                          border: `1px solid ${
                            req.status === "Accepted"
                              ? "#c4eed0"
                              : req.status === "Rejected"
                              ? "#fecaca"
                              : "#fef08a"
                          }`
                        }}
                      >
                        {req.status}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <div style={actionContainerStyle}>
                        <Button
                          variant="success"
                          onClick={() => handleAccept(req.id)}
                          disabled={req.status !== "Pending"}
                          style={{ 
                            height: "36px", 
                            fontSize: "13px", 
                            padding: "0 16px", 
                            fontWeight: "600", 
                            borderRadius: "8px",
                            boxShadow: req.status === "Pending" ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" : "none"
                          }}
                        >
                          Accept
                        </Button>

                        <Button
                          variant="danger"
                          onClick={() => handleReject(req.id)}
                          disabled={req.status !== "Pending"}
                          style={{ 
                            height: "36px", 
                            fontSize: "13px", 
                            padding: "0 16px", 
                            fontWeight: "600", 
                            borderRadius: "8px",
                            boxShadow: req.status === "Pending" ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)" : "none"
                          }}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ ...tdStyle, textAlign: "center", color: "#94a3b8", padding: "48px", fontSize: "14px", fontWeight: "400" }}>
                    No registered order entries match the selected '{statusFilter}' status tag filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}
