import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { 
      name: "Dashboard", 
      path: "/supplier/dashboard", 
      endProp: true,
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <rect x="3" y="3" width="7" height="9"></rect>
          <rect x="14" y="3" width="7" height="5"></rect>
          <rect x="14" y="12" width="7" height="9"></rect>
          <rect x="3" y="16" width="7" height="5"></rect>
        </svg>
      )
    },
    { 
      name: "Stock List", 
      path: "/supplier/dashboard/stock-list",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      )
    },
    { 
      name: "Add Product", 
      path: "/supplier/dashboard/add-product",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      )
    },
    { 
      name: "Vendor Request", 
      path: "/supplier/dashboard/vendor-request",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    { 
      name: "Profile", 
      path: "/supplier/dashboard/profile",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
  ];

  const sidebarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    backgroundColor: "#0f172a", 
    color: "#f8fafc",
    zIndex: 100,
    width: isOpen ? "260px" : "0px",
    padding: isOpen ? "28px 18px" : "28px 0px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRight: isOpen ? "1px solid #1e293b" : "none",
  };

  // FIXED LOGO STYLE: Centered text alignment configuration
  const logoStyle = {
    fontSize: "22px",
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: "-0.03em",
    margin: "0 0 36px 0", 
    whiteSpace: "nowrap",
    opacity: isOpen ? 1 : 0,
    transition: "opacity 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center", 
    gap: "10px",
    width: "100%"
  };

  const navContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
  };

  const logoutButtonStyle = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "transparent",
    color: "#f87171",
    border: "1px solid transparent",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    transition: "all 0.2s ease-in-out",
    boxSizing: "border-box"
  };

  return (
    <>
      <style>{`
        .sidebar-link {
          color: #94a3b8;
          background-color: transparent;
        }
        .sidebar-link:hover:not(.active) {
          color: #ffffff !important;
          background-color: #1e293b !important;
        }
        .sidebar-link:hover:not(.active) svg {
          stroke: #94a3b8 !important;
        }
        .sidebar-link.active {
          color: #ffffff !important;
          background-color: #2563eb !important; 
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3) !important;
          font-weight: 600 !important;
        }
        .logout-btn:hover {
          background-color: rgba(239, 68, 68, 0.08) !important;
          border-color: rgba(239, 68, 68, 0.15) !important;
          color: #ef4444 !important;
        }
      `}</style>

      <div style={sidebarStyle}>
        {/* UPDATED LOGO ELEMENT CONTAINER WITH HORIZONTAL CENTER ALIGNMENT */}
        <h2 style={logoStyle}>
          <span style={{ color: "#2563eb", fontSize: "24px" }}>⚡</span> Supplier Portal
        </h2>

        <nav style={navContainerStyle}>
          {menu.map((item, index) => {
            const isActive = item.endProp 
              ? location.pathname === item.path 
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={index}
                to={item.path}
                end={item.endProp}
                className="sidebar-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px", 
                  padding: "12px 16px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: isActive ? "600" : "500",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease-in-out",
                  boxSizing: "border-box",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  backgroundColor: isActive ? "#2563eb" : "transparent"
                }}
              >
                {item.icon(isActive)}
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid #1e293b", opacity: isOpen ? 1 : 0, transition: "opacity 0.2s ease" }}>
          <button
            className="logout-btn"
            style={logoutButtonStyle}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout System</span>
          </button>
        </div>
      </div>
    </>
  );
}
