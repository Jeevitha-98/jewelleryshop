import React, { useEffect, useState } from "react";
import PageContainer from "../../components/layout/PageContainer";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useInventory } from "../../Context/Inventorycontext";

export default function StockList() {
  const { products, refreshDashboardData } = useInventory();
  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  useEffect(() => {
    if (refreshDashboardData) {
      refreshDashboardData();
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  const handleDelete = (id) => {
    alert("Delete operations require custom backend routing configurations.");
  };

  const handleEdit = (product) => {
    setSelectedProduct({ ...product });
    setIsOpen(true);
  };

  const handleUpdate = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  const handleView = (product) => {
    alert(`Product: ${product.name}\nCategory: ${product.category}\nStock: ${product.stock}\nPrice: ₹${product.price}`);
  };

  const continuousCategories = Array.from(new Set((products || []).map((p) => p && p.category).filter(Boolean)));

  const filteredProducts = (products || [])
    .filter((p) => p && (p?.name || "").toLowerCase().includes(search.toLowerCase()))
    .filter((p) => p && (category ? p?.category === category : true));

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Modern SaaS Typography Layout Objects
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

  // Modern Unified Console Bar Style Wrapper
  const unifiedConsoleBarStyle = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    maxWidth: "800px", 
    height: "50px",
    backgroundColor: "#ffffff",
    borderRadius: "25px", 
    border: "1px solid #cbd5e1",
    padding: "0 24px 0 20px",
    boxShadow: "0 4px 10px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
    boxSizing: "border-box",
    marginBottom: "36px",
    gap: "12px",
    transition: "all 0.2s ease-in-out",
    fontFamily: "'Inter', sans-serif"
  };

  const searchInputWrapperStyle = {
    display: "flex",
    alignItems: "center",
    flex: 1,
    height: "100%",
    position: "relative",
    gap: "12px"
  };

  const cleanRawInputStyle = {
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
    fontSize: "14px",
    color: "#0f172a",
    backgroundColor: "transparent",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "400"
  };

  const verticalDividerLineStyle = {
    width: "1px",
    height: "24px",
    backgroundColor: "#e2e8f0",
    margin: "0 8px"
  };

  const premiumDropdownSelectStyle = {
    border: "none",
    outline: "none",
    fontSize: "13px",
    color: "#475569",
    backgroundColor: "transparent",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "600",
    cursor: "pointer",
    paddingRight: "8px",
    minWidth: "140px",
    height: "100%",
    textAlign: "right"
  };

  // Asymmetrical Product Component Data Grid Elements
  const productGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
    width: "100%",
    boxSizing: "border-box"
  };

  const itemCardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    padding: "20px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -2px rgba(0, 0, 0, 0.03)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    boxSizing: "border-box",
    position: "relative"
  };

  const imageFrameStyle = {
    width: "100%",
    height: "180px",
    borderRadius: "12px",
    objectFit: "cover",
    backgroundColor: "#f8fafc",
    border: "1px solid #f1f5f9"
  };

  const cardMetaRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    textAlign: "left"
  };

  const productTitleStyle = {
    margin: 0,
    fontSize: "16px",
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: "-0.01em"
  };

  const categoryTagStyle = {
    fontSize: "12px",
    color: "#64748b",
    fontWeight: "500",
    marginTop: "2px",
    display: "block"
  };

  const actionGroupStyle = {
    display: "flex",
    gap: "8px",
    width: "100%",
    boxSizing: "border-box",
    marginTop: "auto"
  };

  const actionButtonStyle = {
    flex: 1,
    height: "36px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "background-color 0.15s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box"
  };

  return (
    <PageContainer>
      <div style={headerWrapperStyle}>
        <h2 style={mainHeadingStyle}>Stock Matrix Catalog</h2>
        <p style={subHeadingStyle}>Monitor operational metrics, warehouse storage deep-allocations, and inventory balances.</p>
      </div>

      {/* NEW INTEGRATED SINGLE CONSOLE BAR SELECTION UNIT */}
      <div 
        style={unifiedConsoleBarStyle}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#2563eb";
          e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(37, 99, 235, 0.08), 0 8px 10px -6px rgba(37, 99, 235, 0.08)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#cbd5e1";
          e.currentTarget.style.boxShadow = "0 4px 10px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)";
        }}
      >
        <div style={searchInputWrapperStyle}>
          {/* Vector Minimalist Search Loupe Graphic Asset Icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text"
            placeholder="Type to filter catalog entries by product name..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            style={cleanRawInputStyle}
          />
        </div>

        {/* Inline Separator Component Line */}
        <div style={verticalDividerLineStyle} />

        {/* Categories Anchor Dropdown Selection Layer */}
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={premiumDropdownSelectStyle}
          >
            <option value="">All Categories</option>
            {continuousCategories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* CARD GRID LAYOUT */}
      <div style={productGridStyle}>
        {currentProducts && currentProducts.length > 0 ? (
          currentProducts.map((p) => p && (
            <div 
              key={p.id}
              style={itemCardStyle}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 20px -3px rgba(0, 0, 0, 0.08)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.03)";
              }}
            >
              <img 
                src={p.image || "https://unsplash.com"} 
                alt={p.name} 
                style={imageFrameStyle} 
              />

              <div style={cardMetaRowStyle}>
                <div>
                  <h4 style={productTitleStyle}>{p.name}</h4>
                  <span style={categoryTagStyle}>{p.category || "General"}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", display: "block" }}>
                    ₹{Number(p.price || 0).toFixed(2)}
                  </span>
                  <span style={{ fontSize: "11px", color: "#64748b", fontWeight: "600" }}>UNIT VAL</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f8fafc", padding: "10px 14px", borderRadius: "10px", border: "1px solid #f1f5f9" }}>
                <span style={{ fontSize: "12px", color: "#475569", fontWeight: "600" }}>
                  QTY: <span style={{ fontFamily: "monospace", fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>{p.stock}</span>
                </span>
                
                <span style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  backgroundColor: p.stock > 5 ? "#e6f4ea" : p.stock > 0 ? "#fef9c3" : "#fee2e2",
                  color: p.stock > 5 ? "#137333" : p.stock > 0 ? "#a16207" : "#c53030",
                }}>
                  {p.stock > 5 ? "In Stock" : p.stock > 0 ? "Low Stock" : "Empty"}
                </span>
              </div>

              <div style={actionGroupStyle}>
                <button 
                  onClick={() => onView(p)}
                  style={{ ...actionButtonStyle, backgroundColor: "#ffffff", border: "1px solid #cbd5e1", color: "#475569" }}
                >
                  View
                </button>
                <button 
                  onClick={() => onEdit(p)}
                  style={{ ...actionButtonStyle, backgroundColor: "#2563eb", color: "#ffffff" }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(p.id)}
                  style={{ ...actionButtonStyle, backgroundColor: "#fee2e2", color: "#c53030" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", border: "2px dashed #e2e8f0", borderRadius: "16px", padding: "64px", textAlign: "center", color: "#94a3b8", fontSize: "14px", fontFamily: "'Inter', sans-serif" }}>
            No registered database products discovered matching current filters.
          </div>
        )}
      </div>

      {/* PAGINATION PANEL FOOTER LINK UNITS */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginTop: "32px", fontFamily: "'Inter', sans-serif" }}>
          <Button 
            variant="secondary" 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            style={{ padding: "0 14px", height: "36px", fontWeight: "600" }}
          >
            Previous
          </Button>
          <span style={{ fontSize: "14px", color: "#475569", fontWeight: "600" }}>
            Page {currentPage} of {totalPages}
          </span>
          <Button 
            variant="secondary" 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            style={{ padding: "0 14px", height: "36px", fontWeight: "600" }}
          >
            Next
          </Button>
        </div>
      )}

      {/* MASTER DATA MODAL */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modify Inventory Balances">
        {selectedProduct && (
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", fontFamily: "'Inter', sans-serif", marginTop: "8px" }}>
            <Input label="Product Name" value={selectedProduct.name} disabled />
            <Input label="Available Stock" type="number" value={selectedProduct.stock} onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: e.target.value })} />
            <Input label="Unit Price" type="number" value={selectedProduct.price} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })} />
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "12px" }}>
              <Button variant="secondary" onClick={() => setIsOpen(false)} style={{ flex: 1, height: "42px", fontWeight: "600" }}>Cancel</Button>
              <Button variant="primary" onClick={handleUpdate} style={{ flex: 1, height: "42px", fontWeight: "600" }}>Update Stock</Button>
            </div>
          </div>
        )}
      </Modal>
    </PageContainer>
  );
}
