# Sidrah Fashion Database Schema

## Overview

This document describes the database schema for the Sidrah Fashion wholesale platform.

## Database Tables

### 1. **brands**
Stores information about the four in-house brands (Stud, New York, LA, Rock & Ride).

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Brand name (unique) |
| slug | TEXT | URL-friendly identifier (unique) |
| tagline | TEXT | Short brand tagline |
| description | TEXT | Full brand description |
| logo_url | TEXT | Brand logo image URL |
| active | BOOLEAN | Whether brand is publicly visible |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Indexes:** slug, active

---

### 2. **categories**
Main product categories (Shirts, T-Shirts, Denims, etc.).

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Category name |
| slug | TEXT | URL-friendly identifier (unique) |
| description | TEXT | Category description |
| active | BOOLEAN | Whether category is visible |
| sort_order | INTEGER | Display order |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Indexes:** slug, active

---

### 3. **subcollections**
Subcategories within main categories (e.g., Plain, Checks, Stripes for Shirts).

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| category_id | UUID | Foreign key to categories |
| name | TEXT | Subcollection name |
| slug | TEXT | URL-friendly identifier |
| description | TEXT | Subcollection description |
| active | BOOLEAN | Whether visible |
| sort_order | INTEGER | Display order |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Indexes:** category_id, slug
**Unique constraint:** (category_id, slug)

---

### 4. **age_ranges**
Age range definitions (e.g., 6-12 Months, 2-5 Years).

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Age range display name |
| slug | TEXT | URL-friendly identifier (unique) |
| min_months | INTEGER | Minimum age in months |
| max_months | INTEGER | Maximum age in months |
| sort_order | INTEGER | Display order |
| active | BOOLEAN | Whether visible |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Indexes:** slug

---

### 5. **products**
Main products table with all product information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Product name |
| slug | TEXT | URL-friendly identifier (unique) |
| sku | TEXT | Stock keeping unit (unique) |
| description | TEXT | Product description |
| brand_id | UUID | Foreign key to brands |
| category_id | UUID | Foreign key to categories |
| subcollection_id | UUID | Foreign key to subcollections |
| price | DECIMAL(10,2) | Wholesale price |
| discount | DECIMAL(10,2) | Discount amount |
| currency | TEXT | Currency code (default: INR) |
| set_quantity | INTEGER | Pieces per wholesale set |
| price_on_request | BOOLEAN | Whether price is on request |
| fabric | TEXT | Fabric description |
| fit | TEXT | Fit type (Regular, Loose, etc.) |
| active | BOOLEAN | Whether product is visible |
| featured | BOOLEAN | Featured product flag |
| new_arrival | BOOLEAN | New arrival flag |
| meta_title | TEXT | SEO title |
| meta_description | TEXT | SEO description |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Indexes:** slug, sku, brand_id, category_id, active, featured, new_arrival

---

### 6. **product_images**
Product images with ordering and primary image designation.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| product_id | UUID | Foreign key to products |
| image_url | TEXT | Image URL (Supabase Storage or CDN) |
| alt_text | TEXT | Image alt text for accessibility |
| sort_order | INTEGER | Display order |
| is_primary | BOOLEAN | Whether this is the primary image |
| created_at | TIMESTAMPTZ | Creation timestamp |

**Indexes:** product_id, (product_id, is_primary)

---

### 7. **product_sizes**
Available sizes for each product (many-to-many relationship).

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| product_id | UUID | Foreign key to products |
| size | TEXT | Size code (6M, 12M, 2Y, etc.) |
| available | BOOLEAN | Whether size is available |
| created_at | TIMESTAMPTZ | Creation timestamp |

**Indexes:** product_id
**Unique constraint:** (product_id, size)

---

### 8. **product_colors**
Available colors for each product (many-to-many relationship).

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| product_id | UUID | Foreign key to products |
| color_name | TEXT | Color name |
| color_hex | TEXT | Hex color code |
| available | BOOLEAN | Whether color is available |
| created_at | TIMESTAMPTZ | Creation timestamp |

**Indexes:** product_id
**Unique constraint:** (product_id, color_name)

---

### 9. **product_age_ranges**
Links products to applicable age ranges (many-to-many relationship).

| Column | Type | Description |
|--------|------|-------------|
| product_id | UUID | Foreign key to products |
| age_range_id | UUID | Foreign key to age_ranges |
| created_at | TIMESTAMPTZ | Creation timestamp |

**Primary key:** (product_id, age_range_id)
**Indexes:** product_id, age_range_id

---

### 10. **inquiries**
Wholesale inquiries from potential customers.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| product_id | UUID | Foreign key to products (optional) |
| name | TEXT | Contact name |
| business_name | TEXT | Business/company name |
| email | TEXT | Contact email |
| phone | TEXT | Contact phone |
| country | TEXT | Country |
| message | TEXT | Inquiry message |
| status | TEXT | Status: new, contacted, closed |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Indexes:** status, created_at DESC, product_id

---

### 11. **retailers**
Registered retailer/customer accounts.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| business_name | TEXT | Business name |
| contact_name | TEXT | Contact person name |
| email | TEXT | Email (unique) |
| phone | TEXT | Phone number |
| country | TEXT | Country |
| city | TEXT | City |
| address | TEXT | Full address |
| status | TEXT | Status: pending, approved, inactive |
| notes | TEXT | Internal notes |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

**Indexes:** email, status

---

## Relationships

```
brands (1) ──── (many) products
categories (1) ──── (many) products
categories (1) ──── (many) subcollections
subcollections (1) ──── (many) products

products (1) ──── (many) product_images
products (many) ──── (many) product_sizes
products (many) ──── (many) product_colors
products (many) ──── (many) age_ranges (via product_age_ranges)

products (1) ──── (many) inquiries
```

---

## Row Level Security (RLS)

All tables have RLS enabled. Default policies:

- **Catalog data** (brands, categories, products, etc.): Public read access for active items
- **Inquiries**: Anyone can insert (submit), only authenticated users see their own
- **Retailers**: Anyone can insert (register), authenticated users see their own profile

---

## Migrations

The schema is created via Supabase migration:
- File: `supabase/migrations/20260831_initial_schema.sql`
- Run via Supabase CLI or Dashboard

---

## Notes

- All timestamps are in UTC (TIMESTAMPTZ)
- UUIDs are generated via `uuid_generate_v4()`
- Soft deletes not implemented (hard deletes via CASCADE)
- `updated_at` columns automatically updated via trigger
- Currency defaults to INR (Indian Rupees)
- Wholesale-focused: `set_quantity` represents pieces per set
