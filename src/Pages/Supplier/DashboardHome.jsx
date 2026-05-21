import React, { useEffect, useState } from "react";
import PageContainer from "../../components/layout/PageContainer";
import { useInventory } from "../../Context/Inventorycontext"; 

export default function DashboardHome() {
  const { products, vendorRequests, loading, systemActivities, refreshDashboardData } = useInventory();
  const [activeTab, setActiveTab] = useState("products"); 

  useEffect(() => {
    if (refreshDashboardData) {
      refreshDashboardData();
    }
  }, []);

  const safeProducts = products || [];
  const totalProducts = safeProducts.length;

  const totalStock = safeProducts.reduce(
    (sum, item) => sum + Number(item?.stock || 0),
    0
  );

  const lowStockItems = safeProducts.filter(
    (p) => Number(p?.stock || 0) < 5
  );

  const pendingRequestsList = (vendorRequests || []).filter(
    (r) => r && r.status && r.status.toLowerCase() === "pending"
  );

  // Modern Vectorized Icon Config Grid Matrix
  const stats = [
    { 
      id: "products", 
      title: "Total Products", 
      value: totalProducts, 
      accentColor: "#2563eb",
      bgColor: "#eff6ff",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      )
    },
    { 
      id: "stock", 
      title: "Overall Stock", 
      value: totalStock.toLocaleString("en-IN"), 
      accentColor: "#16a34a",
      bgColor: "#f0fdf4",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      )
    },
    { 
      id: "low_stock", 
      title: "Low Stock Items", 
      value: lowStockItems.length, 
      accentColor: "#ea580c",
      bgColor: "#fff7ed",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      )
    },
    { 
      id: "pending", 
      title: "Pending Requests", 
      value: pendingRequestsList.length, 
      accentColor: "#db2777",
      bgColor: "#fdf2f8",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      )
    },
  ];

  const handleClearLogs = () => {
    localStorage.removeItem("supplier_activity_logs");
    window.location.reload();
  };

  const headerWrapperStyle = {
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

  const splitGridContainerStyle = {
    display: "flex",
    gap: "32px",
    width: "100%",
    alignItems: "flex-start",
    boxSizing: "border-box",
    flexWrap: "wrap",
    marginTop: "32px"
  };

  const detailViewContainerStyle = {
    flex: "2",
    minWidth: "480px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    padding: "28px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03)",
    boxSizing: "border-box"
  };

  const sideActivityContainerStyle = {
    flex: "1",
    minWidth: "320px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    padding: "28px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03)",
    boxSizing: "border-box"
  };

  const catalogHeadingStyle = {
    margin: "0 0 20px 0",
    fontSize: "16px",
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: "-0.01em",
    textAlign: "left",
    display: "block",
    width: "100%"
  };

  const activityHeadingStyle = {
    margin: "0 0 20px 0",
    fontSize: "16px",
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: "-0.01em",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box"
  };

  if (loading) {
    return (
      <PageContainer>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh", width: "100%" }}>
          <style>
            {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
          </style>
          <div style={{ width: "40px", height: "40px", border: "3px solid #cbd5e1", borderTop: "3px solid #2563eb", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div style={headerWrapperStyle}>
        <h2 style={mainHeadingStyle}>Welcome Back, Supplier</h2>
        <p style={subHeadingStyle}>Here is an analytical breakdown of your warehouse stock metrics.</p>
      </div>

      {/* ULTRA-PREMIUM CARD INTERACTIVE GRID MODULE */}
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {stats.map((s) => {
          const isSelected = activeTab === s.id;
          return (
            <div 
              key={s.id} 
              onClick={() => setActiveTab(s.id)}
              style={{ 
                cursor: "pointer", 
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: isSelected ? `2px solid ${s.accentColor}` : "1px solid #e2e8f0",
                padding: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: isSelected ? `0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px ${s.accentColor}20` : "0 1px 3px 0 rgba(0,0,0,0.02)",
                transform: isSelected ? "translateY(-4px)" : "translateY(0)",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                boxSizing: "border-box"
              }}
              onMouseOver={(e) => {
                if(!isSelected) {
                  e.currentTarget.style.borderColor = s.accentColor + "80";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.04)";
                }
              }}
              onMouseOut={(e) => {
                if(!isSelected) {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0,0,0,0.02)";
                }
              }}
            >
              <div style={{ textAlign: "left" }}>
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>
                  {s.title}
                </span>
                <span style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", lineHeight: "1.1" }}>
                  {s.value}
                </span>
              </div>
              
              {/* Premium Vector Box Badge */}
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: s.bgColor,
                color: s.accentColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s"
              }}>
                {s.icon}
              </div>
            </div>
          );
        })}
      </div>

      <div style={splitGridContainerStyle}>
        <div style={detailViewContainerStyle}>
          {(activeTab === "products" || activeTab === "stock") && (
            <div>
              <h3 style={catalogHeadingStyle}>
                <span>📦</span> Active Stock Catalog ({safeProducts.length} Items)
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "380px", overflowY: "auto", paddingRight: "4px" }}>
                {safeProducts.length === 0 ? (
                  <p style={{ fontSize: "14px", color: "#94a3b8", padding: "20px 0", textAlign: "left" }}>No products logged in database.</p>
                ) : (
                  safeProducts.map((p) => p && (
                    <div key={p.id} style={listItemRowStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <img src={p.image || "https://unsplash.com"} alt={p.name} style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover", border: "1px solid #e2e8f0" }} />
                        <div style={{ textAlign: "left" }}>
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a", display: "block" }}>{p.name}</span>
                          <span style={{ fontSize: "12px", color: "#64748b" }}>{p.category || "General"}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", display: "block" }}>₹{Number(p.price || 0).toFixed(2)}</span>
                        <span style={{ fontSize: "11px", color: "#16a34a", fontWeight: "600", backgroundColor: "#e6f4ea", padding: "2px 6px", borderRadius: "4px" }}>{p.stock} units</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "low_stock" && (
            <div>
              <h3 style={catalogHeadingStyle}>
                <span>⚠️</span> Critical Low Stock Alert ({lowStockItems.length} Alarms)
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "380px", overflowY: "auto", paddingRight: "4px" }}>
                {lowStockItems.length === 0 ? (
                  <div style={{ padding: "40px 0", textAlign: "center", color: "#16a34a", fontSize: "14px", fontWeight: "500" }}>
                    ✓ All inventory stock dimensions conform safely above constraints!
                  </div>
                ) : (
                  lowStockItems.map((p) => p && (
                    <div key={p.id} style={{ ...listItemRowStyle, backgroundColor: "#fffbeb", borderColor: "#fef3c7" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <img src={p.image || "https://unsplash.com"} alt={p.name} style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover", border: "1px solid #fcd3d3" }} />
                        <div style={{ textAlign: "left" }}>
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#b45309", display: "block" }}>{p.name}</span>
                          <span style={{ fontSize: "12px", color: "#64748b" }}>{p.category || "General"}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", display: "block" }}>₹{Number(p.price || 0).toFixed(2)}</span>
                        <span style={{ fontSize: "11px", color: "#dc2626", fontWeight: "700", backgroundColor: "#fee2e2", padding: "2px 8px", borderRadius: "4px" }}>{p.stock} LEFT</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "pending" && (
            <div>
              <h3 style={catalogHeadingStyle}>
                <span>⏳</span> Active Vendor Procurement Demands ({pendingRequestsList.length} Orders)
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "380px", overflowY: "auto", paddingRight: "4px" }}>
                {pendingRequestsList.length === 0 ? (
                  <div style={{ padding: "40px 0", textAlign: "center", color: "#64748b", fontSize: "14px" }}>
                    No incoming order requests found matching pending filters.
                  </div>
                ) : (
                  pendingRequestsList.map((req) => req && (
                    <div key={req.id} style={{ ...listItemRowStyle, borderLeft: "4px solid #eab308" }}>
                      <div style={{ textAlign: "left" }}>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a", display: "block" }}>{req.vendorName}</span>
                        <span style={{ fontSize: "12px", color: "#64748b" }}>Requested: <strong style={{ color: "#334155" }}>{req.product}</strong></span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "13px", color: "#a16207", fontWeight: "700", backgroundColor: "#fef9c3", padding: "3px 8px", borderRadius: "6px", display: "inline-block" }}>
                          QTY: {req.quantity}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div style={sideActivityContainerStyle}>
          <div style={activityHeadingStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⚡</span> Recent Activities Feed
            </div>
            {systemActivities && systemActivities.length > 0 && (
              <button 
                onClick={handleClearLogs}
                style={{ border: "none", background: "none", color: "#ef4444", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}
              >
                Clear Logs
              </button>
            )}
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {(!systemActivities || systemActivities.length === 0) ? (
              <p style={{ fontSize: "13px", color: "#94a3b8", padding: "32px 0", textAlign: "center" }}>
                No active session logs recorded during this terminal workspace window.
              </p>
            ) : (
              systemActivities.map((act) => (
                <div 
                  key={act.id} 
                  style={{ 
                    padding: "14px", 
                    borderRadius: "12px", 
                    backgroundColor: act.urgent ? "#fff2f2" : "#f8fafc", 
                    border: act.urgent ? "1px solid #fecaca" : "1px solid #e2e8f0",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px"
                  }}
                >
                  <p style={{ margin: 0, fontSize: "13px", color: "#1e293b", lineHeight: "1.45", fontWeight: "500" }}>
                    {act.text}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2px" }}>
                    <span style={{ 
                      fontSize: "10px", 
                      fontWeight: "700", 
                      padding: "2px 8px", 
                      borderRadius: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                      backgroundColor: act.urgent ? "#ef4444" : "#2563eb",
                      color: "#ffffff"
                    }}>
                      {act.badge}
                    </span>
                    <span style={{ fontSize: "11px", color: "#64748b", fontFamily: "monospace" }}>
                      {act.time}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

const listItemRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 16px",
  borderRadius: "12px",
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  boxSizing: "border-box"
};
