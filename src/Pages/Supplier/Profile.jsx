import React, { useState, useEffect } from "react";
import PageContainer from "../../components/layout/PageContainer";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useInventory } from "../../Context/Inventorycontext";
import { supplierService } from "../../Services/supplierService";
import { toast } from "react-toastify";
import profileIconImage from "../../Assests/Profileicon Image.jpg"; // Exact navbar image asset

export default function Profile() {
  const { profile, refreshDashboardData } = useInventory();

  const [formData, setFormData] = useState({
    business_name: "",
    business_type: "",
    location: "",
    mobile: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        business_name: profile.business_name || "",
        business_type: profile.business_type || "",
        location: profile.location || "",
        mobile: profile.mobile || "",
      });
    }
  }, [profile]);

  const handleEdit = () => {
    if (profile) {
      setFormData({
        business_name: profile.business_name || "",
        business_type: profile.business_type || "",
        location: profile.location || "",
        mobile: profile.mobile || "",
      });
    }
    setIsOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await supplierService.updateProfileDetails(formData);
      if (response.status || response) {
        toast.success("Profile updates committed to relational database successfully!");
        setIsOpen(false);
        if (refreshDashboardData) {
          await refreshDashboardData();
        }
      }
    } catch (err) {
      console.error("Failed to sync profile changes down to server:", err);
      toast.error("Failed to commit profile updates to server.");
    } finally {
      setIsSaving(false);
    }
  };

  // Restructured Layout & Styling Elements
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

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "32px",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif"
  };

  const leftActionPanelStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    height: "fit-content"
  };

  // Upgraded Dark Theme Box Container 
  const darkCardBoxStyle = {
    backgroundColor: "#111827", // Smooth rich black hue
    padding: "32px 24px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "1px solid #1f2937",
    boxSizing: "border-box",
    width: "100%"
  };

  const profileImageStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    border: "3px solid rgba(255, 255, 255, 0.2)",
    objectFit: "cover",
    marginBottom: "16px",
    backgroundColor: "#1f2937"
  };

  const darkCardTitleStyle = {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: "-0.01em",
    lineHeight: "1.3"
  };

  const darkCardSubtitleStyle = {
    margin: "6px 0 0 0",
    fontSize: "14px",
    color: "#9ca3af",
    fontWeight: "500"
  };

  const detailsContainerStyle = {
    background: "#ffffff",
    padding: "36px",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
    boxSizing: "border-box",
  };

  const titleStyle = {
    margin: "0 0 24px 0",
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: "-0.01em",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  };

  const itemStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    padding: "14px 16px",
    borderRadius: "10px",
    backgroundColor: "#f8fafc",
    marginBottom: "12px",
    border: "1px solid #f1f5f9",
    boxSizing: "border-box",
    textAlign: "left"
  };

  const labelStyle = {
    fontSize: "12px",
    color: "#64748b",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  };

  const valueStyle = {
    fontSize: "15px",
    color: "#0f172a",
    fontWeight: "600"
  };

  return (
    <PageContainer>
      <div style={headerWrapperStyle}>
        <h2 style={mainHeadingStyle}>My Profile</h2>
        <p style={subHeadingStyle}>Manage your supplier profile credentials and business location information.</p>
      </div>

      <div style={gridContainerStyle}>
        
        {/* LEFT COLUMN: REFINED DARK BADGE & ACTION BUTTON */}
        <div style={leftActionPanelStyle}>
          <div style={darkCardBoxStyle}>
            {/* Navbar image mapped onto the central preview panel */}
            <img 
              src={profileIconImage} 
              alt="Supplier Profile" 
              style={profileImageStyle} 
            />
            <h3 style={darkCardTitleStyle}>
              {profile?.business_name || "Loading..."}
            </h3>
            <p style={darkCardSubtitleStyle}>
              ({profile?.user_id || "Checking ID..."})
            </p>
          </div>

          <Button 
            onClick={handleEdit} 
            variant="primary" 
            style={{ 
              width: "100%", 
              height: "46px", 
              fontSize: "14px", 
              fontWeight: "600", 
              borderRadius: "10px", 
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" 
            }}
          >
            Edit Profile Credentials
          </Button>
        </div>

        {/* RIGHT COLUMN: INFORMATION LIST ROWS */}
        <div style={detailsContainerStyle}>
          <h3 style={titleStyle}>
            <span style={{ fontSize: "20px" }}>📋</span> Profile Information
          </h3>
          
          <div style={itemStyle}>
            <span style={labelStyle}>User Access ID</span>
            <span style={valueStyle}>{profile?.user_id || "Verifying Access..."}</span>
          </div>
          
          <div style={itemStyle}>
            <span style={labelStyle}>Mobile Number</span>
            <span style={valueStyle}>{profile?.mobile || "Not Provided"}</span>
          </div>
          
          <div style={itemStyle}>
            <span style={labelStyle}>Registered Business</span>
            <span style={valueStyle}>{profile?.business_name || "Not Provided"}</span>
          </div>
          
          <div style={itemStyle}>
            <span style={labelStyle}>Business Category</span>
            <span style={valueStyle}>{profile?.business_type || "Not Provided"}</span>
          </div>
          
          <div style={itemStyle}>
            <span style={labelStyle}>Operation Location</span>
            <span style={valueStyle}>{profile?.location || "Not Provided"}</span>
          </div>
        </div>
      </div>

      {/* EDIT OVERLAY WRAPPER DIALOG */}
      <Modal isOpen={isOpen} onClose={() => { if(!isSaving) setIsOpen(false); }} title="Edit Profile Details">
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "8px", fontFamily: "'Inter', sans-serif" }}>
          <Input
            label="Business Name"
            name="business_name"
            value={formData.business_name}
            onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
          />

          <Input
            label="Mobile Number"
            name="mobile"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          />

          <Input
            label="Business Type"
            name="business_type"
            value={formData.business_type}
            onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
          />

          <Input
            label="Operation Location"
            name="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          <div style={{ display: "flex", gap: "12px", marginTop: "12px", justifyContent: "flex-end" }}>
            <Button 
              onClick={() => setIsOpen(false)} 
              variant="secondary" 
              style={{ flex: 1, height: "42px", fontWeight: "600" }} 
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              variant="primary" 
              style={{ flex: 1, height: "42px", fontWeight: "600" }} 
              disabled={isSaving}
            >
              {isSaving ? "Saving Changes..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
