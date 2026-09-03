-- Sidrah Fashion Database Schema
-- Migration: Initial Schema
-- Created: 2026-08-31

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- BRANDS TABLE
-- =====================================================
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    tagline TEXT,
    description TEXT,
    logo_url TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_brands_active ON brands(active);

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- CATEGORIES TABLE
-- =====================================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(active);
CREATE INDEX idx_categories_sort_order ON categories(sort_order);

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SUBCOLLECTIONS TABLE
-- =====================================================
CREATE TABLE subcollections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(category_id, slug)
);

CREATE INDEX idx_subcollections_category_id ON subcollections(category_id);
CREATE INDEX idx_subcollections_slug ON subcollections(slug);

CREATE TRIGGER update_subcollections_updated_at BEFORE UPDATE ON subcollections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- AGE RANGES TABLE
-- =====================================================
CREATE TABLE age_ranges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    min_months INTEGER NOT NULL,
    max_months INTEGER NOT NULL,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_age_ranges_slug ON age_ranges(slug);

CREATE TRIGGER update_age_ranges_updated_at BEFORE UPDATE ON age_ranges
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- PRODUCTS TABLE
-- =====================================================
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    sku TEXT NOT NULL UNIQUE,
    description TEXT,
    brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE RESTRICT,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    subcollection_id UUID REFERENCES subcollections(id) ON DELETE SET NULL,
    price DECIMAL(10,2),
    discount DECIMAL(10,2) DEFAULT 0,
    currency TEXT DEFAULT 'INR',
    set_quantity INTEGER DEFAULT 1,
    price_on_request BOOLEAN DEFAULT false,
    fabric TEXT,
    fit TEXT,
    active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    new_arrival BOOLEAN DEFAULT false,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_subcollection_id ON products(subcollection_id);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_new_arrival ON products(new_arrival);

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- PRODUCT IMAGES TABLE
-- =====================================================
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_images_primary ON product_images(product_id, is_primary);

-- =====================================================
-- PRODUCT SIZES TABLE
-- =====================================================
CREATE TABLE product_sizes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size TEXT NOT NULL,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(product_id, size)
);

CREATE INDEX idx_product_sizes_product_id ON product_sizes(product_id);

-- =====================================================
-- PRODUCT COLORS TABLE
-- =====================================================
CREATE TABLE product_colors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    color_name TEXT NOT NULL,
    color_hex TEXT,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(product_id, color_name)
);

CREATE INDEX idx_product_colors_product_id ON product_colors(product_id);

-- =====================================================
-- PRODUCT AGE RANGES (Many-to-Many)
-- =====================================================
CREATE TABLE product_age_ranges (
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    age_range_id UUID NOT NULL REFERENCES age_ranges(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (product_id, age_range_id)
);

CREATE INDEX idx_product_age_ranges_product_id ON product_age_ranges(product_id);
CREATE INDEX idx_product_age_ranges_age_range_id ON product_age_ranges(age_range_id);

-- =====================================================
-- INQUIRIES TABLE
-- =====================================================
CREATE TABLE inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    business_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    country TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_product_id ON inquiries(product_id);

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- RETAILERS TABLE
-- =====================================================
CREATE TABLE retailers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    country TEXT,
    city TEXT,
    address TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'inactive')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_retailers_email ON retailers(email);
CREATE INDEX idx_retailers_status ON retailers(status);

CREATE TRIGGER update_retailers_updated_at BEFORE UPDATE ON retailers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcollections ENABLE ROW LEVEL SECURITY;
ALTER TABLE age_ranges ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_age_ranges ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE retailers ENABLE ROW LEVEL SECURITY;

-- Public read access for active catalog data
CREATE POLICY "Public can view active brands" ON brands
    FOR SELECT USING (active = true);

CREATE POLICY "Public can view active categories" ON categories
    FOR SELECT USING (active = true);

CREATE POLICY "Public can view active subcollections" ON subcollections
    FOR SELECT USING (active = true);

CREATE POLICY "Public can view active age ranges" ON age_ranges
    FOR SELECT USING (active = true);

CREATE POLICY "Public can view active products" ON products
    FOR SELECT USING (active = true);

CREATE POLICY "Public can view product images" ON product_images
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM products 
            WHERE products.id = product_images.product_id 
            AND products.active = true
        )
    );

CREATE POLICY "Public can view product sizes" ON product_sizes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM products 
            WHERE products.id = product_sizes.product_id 
            AND products.active = true
        )
    );

CREATE POLICY "Public can view product colors" ON product_colors
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM products 
            WHERE products.id = product_colors.product_id 
            AND products.active = true
        )
    );

CREATE POLICY "Public can view product age ranges" ON product_age_ranges
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM products 
            WHERE products.id = product_age_ranges.product_id 
            AND products.active = true
        )
    );

-- Anyone can submit inquiries
CREATE POLICY "Anyone can submit inquiries" ON inquiries
    FOR INSERT WITH CHECK (true);

-- Anyone can register as retailer
CREATE POLICY "Anyone can register as retailer" ON retailers
    FOR INSERT WITH CHECK (true);

-- Comments
COMMENT ON TABLE brands IS 'Sidrah Fashion in-house brands';
COMMENT ON TABLE categories IS 'Main product categories';
COMMENT ON TABLE subcollections IS 'Subcategories within main categories';
COMMENT ON TABLE age_ranges IS 'Age range definitions for filtering';
COMMENT ON TABLE products IS 'Main products catalog';
COMMENT ON TABLE product_images IS 'Product images with ordering';
COMMENT ON TABLE product_sizes IS 'Available sizes per product';
COMMENT ON TABLE product_colors IS 'Available colors per product';
COMMENT ON TABLE product_age_ranges IS 'Product to age range mapping';
COMMENT ON TABLE inquiries IS 'Wholesale inquiries from customers';
COMMENT ON TABLE retailers IS 'Registered retailer accounts';
