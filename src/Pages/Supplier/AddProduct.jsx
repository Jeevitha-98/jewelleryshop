import React, { useState, useRef } from "react";
import PageContainer from "../../components/layout/PageContainer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { toast } from "react-toastify";
import { useInventory } from "../../Context/Inventorycontext";

export default function AddProduct() {
  const { products, addGlobalProduct, refreshDashboardData } = useInventory();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [recentlyAdded, setRecentlyAdded] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Helper function to trigger hidden input click manually
  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.price || !form.stock) {
      toast.error("Please fill all fields");
      return;
    }

    const currentStock = Number(form.stock);
    const inputPrice = Number(form.price);
    const inputName = form.name.trim();

    const existingProduct = products?.find(
      (p) => p && p.name && p.name.toLowerCase() === inputName.toLowerCase()
    );

    const formData = new FormData();
    formData.append("name", inputName);
    formData.append("category", form.category.trim());
    formData.append("price", inputPrice);
    formData.append("stock", currentStock);
    formData.append("quantity", currentStock);
    
    if (imageFile) {
      formData.append("image", imageFile);
    } else if (existingProduct && existingProduct.image) {
      formData.append("image", existingProduct.image);
    }

    const result = await addGlobalProduct(formData);

    if (result && result.success) {
      toast.success("Product saved to database successfully");

      if (refreshDashboardData) {
        await refreshDashboardData();
      }

      const finalizedImage = imagePreview || (existingProduct && existingProduct.image ? existingProduct.image : "https://unsplash.com");

      const loggedItem = {
        id: Date.now(),
        name: inputName,
        category: form.category.trim(),
        price: inputPrice,
        sessionStock: currentStock, 
        image: finalizedImage
      };

      setRecentlyAdded((prev) => {
        const filtered = prev.filter((item) => item && item.name && item.name.toLowerCase() !== inputName.toLowerCase());
        return [loggedItem, ...filtered];
      });

      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
      });
      setImageFile(null);
      setImagePreview("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      toast.error(result?.error || "Failed to persist product item to server.");
    }
  };

  // Modern SaaS Layout Inline Style Blocks
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

  const layoutContainerStyle = {
    display: "flex",
    gap: "36px",
    width: "100%",
    alignItems: "flex-start",
    boxSizing: "border-box",
    flexWrap: "wrap"
  };

  const formContainerStyle = {
    background: "#ffffff",
    padding: "36px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "480px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
    boxSizing: "border-box"
  };

  const rightSideContainerStyle = {
    flex: 1,
    minWidth: "340px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "28px"
  };

  const contentBoxWrapperStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    padding: "28px",
    boxShadow: "0 2px 8px -1px rgba(0, 0, 0, 0.02)",
    boxSizing: "border-box"
  };

  const columnHeadingStyle = {
    margin: "0 0 20px 0",
    fontSize: "16px",
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: "-0.01em",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  };

  const listScrollStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    maxHeight: "280px",
    overflowY: "auto",
    paddingRight: "4px",
    boxSizing: "border-box"
  };

  // FIXED & OPTIMIZED CUSTOM UPLOADER FIELDS
  const fileUploadContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    textAlign: "left",
    width: "100%",
    boxSizing: "border-box"
  };

  const fileLabelTitleStyle = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#334155"
  };

  const localizedBoxSelectorWrapperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "42px", 
    padding: "0 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px", 
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out"
  };

  const filenameTextStyle = {
    fontSize: "14px",
    color: imageFile ? "#0f172a" : "#94a3b8",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "260px"
  };

  const browseBadgeButtonStyle = {
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    padding: "4px 10px",
    borderRadius: "6px",
    border: "1px solid #e2e8f0"
  };

  return (
    <PageContainer>
      <div style={headerWrapperStyle}>
        <h2 style={mainHeadingStyle}>Add Product</h2>
        <p style={subHeadingStyle}>Create and catalog new inventory items into the warehouse systems.</p>
      </div>

      <div style={layoutContainerStyle}>
        {/* LEFT COLUMN: ENHANCED BALANCED INPUT FORM */}
        <div style={formContainerStyle}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Input
              label="Product Name"
              name="name"
              placeholder="Enter product name..."
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Category"
              name="category"
              placeholder="Enter category..."
              value={form.category}
              onChange={handleChange}
            />

            <Input
              label="Price"
              name="price"
              type="number"
              placeholder="₹ 0.00"
              value={form.price}
              onChange={handleChange}
            />

            <Input
              label="Stock"
              name="stock"
              type="number"
              placeholder="Enter stock quantity..."
              value={form.stock}
              onChange={handleChange}
            />

            {/* HIGH-END OPTIMIZED ASSET FILE INPUT CUSTOM UPLOADER */}
            <div style={fileUploadContainerStyle}>
              <label style={fileLabelTitleStyle}>Product Image Asset</label>
              
              {/* Fake visual shell input block container */}
              <div 
                onClick={triggerFileSelect}
                style={localizedBoxSelectorWrapperStyle}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "#2563eb";
                  e.currentTarget.style.boxShadow = "0 0 0 1px #2563eb";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "#cbd5e1";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span style={filenameTextStyle}>
                  {imageFile ? imageFile.name : "Choose local image asset file..."}
                </span>
                <span style={browseBadgeButtonStyle}>Browse</span>
              </div>

              {/* Native real element remains hidden underneath to handle streams safely */}
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                style={{ display: "none" }} 
              />

              {imagePreview && (
                <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <img src={imagePreview} alt="Upload Preview" style={{ width: "54px", height: "54px", borderRadius: "8px", objectFit: "cover", border: "1px solid #cbd5e1" }} />
                  <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: "600" }}>✓ Preview loaded cleanly</span>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              style={{ 
                width: "100%", 
                height: "44px", 
                fontSize: "14px", 
                fontWeight: "600", 
                borderRadius: "10px", 
                marginTop: "4px",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" 
              }}
            >
              Add Product Item
            </Button>
          </form>
        </div>

        {/* RIGHT COLUMN: PREVIEWS */}
        <div style={rightSideContainerStyle}>
          <div style={contentBoxWrapperStyle}>
            <h3 style={columnHeadingStyle}>
              <span>📦</span> Current System Stock
            </h3>
            {products && products.length > 0 ? (
              <div style={listScrollStyle}>
                {products.map((p) => p && (
                  <Card
                    key={p.id}
                    title={`${p.category || 'General'} • ${p.stock || 0} Units`}
                    value={`₹${Number(p.price || 0).toLocaleString("en-IN")}`}
                    icon={
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <img 
                          src={p.image || "https://unsplash.com"} 
                          alt={p.name} 
                          style={{ width: "42px", height: "42px", borderRadius: "8px", objectFit: "cover", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }} 
                        />
                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a", display: "block" }}>
                            {p.name}
                          </span>
                        </div>
                      </div>
                    }
                  />
                ))}
              </div>
            ) : (
              <div style={{ border: "2px dashed #e2e8f0", borderRadius: "12px", padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                No active products found in database storage.
              </div>
            )}
          </div>

          <div style={contentBoxWrapperStyle}>
            <h3 style={columnHeadingStyle}>
              <span>📋</span> Recently Added Products
            </h3>
            {recentlyAdded.length > 0 ? (
              <div style={listScrollStyle}>
                {recentlyAdded.map((item) => item && (
                  <Card
                    key={item.id}
                    title={`${item.category} • ${item.sessionStock} Session Units`}
                    value={`₹${Number(item.price).toLocaleString("en-IN")}`}
                    icon={
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <img src={item.image} alt={item.name} style={{ width: "42px", height: "42px", borderRadius: "8px", objectFit: "cover", border: "1px solid #e2e8f0" }} />
                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a" }}>{item.name}</span>
                        </div>
                      </div>
                    }
                  />
                ))}
              </div>
            ) : (
              <div style={{ border: "2px dashed #e2e8f0", borderRadius: "12px", padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                No new products submitted during this active terminal session.
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
