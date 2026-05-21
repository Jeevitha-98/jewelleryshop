from sqlalchemy import Column, Integer, String, Float, ForeignKey
from database import Base

# ==============================================================================
# USER MODEL (With duplicate-registry protection)
# ==============================================================================
if "users" not in Base.metadata.tables:
    class User(Base):
        __tablename__ = "users"
        __table_args__ = {'extend_existing': True}

        id = Column(Integer, primary_key=True, index=True)
        user_id = Column(String(20), unique=True, index=True)
        mobile = Column(String(15), unique=True, index=True, nullable=False)
        location = Column(String(100))
        business_name = Column(String(100))
        business_type = Column(String(100))
        role = Column(String(20), nullable=False)
        password = Column(String(100), nullable=False)
else:
    User = Base.metadata.tables["users"]


# ==============================================================================
# PRODUCT MODEL (With duplicate-registry protection)
# ==============================================================================
if "products" not in Base.metadata.tables:
    class Product(Base):
        __tablename__ = "products"
        __table_args__ = {'extend_existing': True}

        id = Column(Integer, primary_key=True, index=True)
        name = Column(String(100), nullable=False)
        category = Column(String(100), default="General")
        price = Column(Float, default=0.0)
        stock = Column(Integer, default=0)
        quantity = Column(Integer, default=0)
        supplier_id = Column(String(20), ForeignKey("users.user_id"), nullable=False)
        image = Column(String(255), nullable=True)
else:
    Product = Base.metadata.tables["products"]


# ==============================================================================
# VENDOR REQUEST MODEL (With duplicate-registry protection)
# ==================# Open models.py and make the bottom look exactly like this flat class structure:

class VendorRequest(Base):
    __tablename__ = "vendor_requests"
    __table_args__ = {'extend_existing': True}  # Safely handles table overlaps

    id = Column(Integer, primary_key=True, index=True)
    vendor_id = Column(String(20), nullable=False)
    quantity = Column(Integer, nullable=False)
    status = Column(String(20), default="Pending")
    supplier_id = Column(String(20), nullable=False)
