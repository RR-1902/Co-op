-- ENUMS
CREATE TYPE user_role AS ENUM ('CUSTOMER', 'APPLICANT', 'WORKER', 'COOPERATIVE_OFFICER', 'FEDERATION_ADMIN');
CREATE TYPE application_status AS ENUM ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'MORE_INFORMATION_REQUIRED');
CREATE TYPE booking_status AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
CREATE TYPE payment_status AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');
CREATE TYPE worker_status AS ENUM ('AVAILABLE', 'BUSY', 'OFFLINE');

-- TABLES
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE cooperatives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location_id UUID REFERENCES locations(id),
    address TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'CUSTOMER',
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    base_price NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    cooperative_id UUID REFERENCES cooperatives(id) ON DELETE CASCADE,
    status application_status DEFAULT 'PENDING',
    skills JSONB,
    experience JSONB,
    certifications JSONB,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE workers (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    cooperative_id UUID REFERENCES cooperatives(id),
    verification_status TEXT DEFAULT 'UNVERIFIED',
    status worker_status DEFAULT 'OFFLINE',
    rating NUMERIC(3, 2) DEFAULT 0.0,
    total_jobs INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE worker_skills (
    worker_id UUID REFERENCES workers(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    PRIMARY KEY (worker_id, service_id)
);

CREATE TABLE certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    worker_id UUID REFERENCES workers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    document_url TEXT,
    issued_by TEXT,
    valid_until DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE worker_availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    worker_id UUID REFERENCES workers(id) ON DELETE CASCADE,
    day_of_week INTEGER, -- 0 = Sunday, 1 = Monday, etc.
    start_time TIME,
    end_time TIME
);

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES users(id),
    worker_id UUID REFERENCES workers(id),
    service_id UUID REFERENCES services(id),
    location_id UUID REFERENCES locations(id),
    status booking_status DEFAULT 'PENDING',
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    address TEXT NOT NULL,
    total_amount NUMERIC(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    worker_earnings NUMERIC(10, 2),
    cooperative_fee NUMERIC(10, 2),
    welfare_contribution NUMERIC(10, 2),
    status payment_status DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID REFERENCES payments(id) ON DELETE CASCADE,
    invoice_number TEXT UNIQUE NOT NULL,
    document_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    worker_id UUID REFERENCES workers(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER CHECK (score >= 1 AND score <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE welfare_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    worker_id UUID REFERENCES workers(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    description TEXT,
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE demand_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES services(id),
    location_id UUID REFERENCES locations(id),
    historical_demand INTEGER DEFAULT 0,
    date_recorded DATE DEFAULT CURRENT_DATE
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cooperatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE worker_skills ENABLE ROW LEVEL SECURITY;

-- SIMPLE POLICIES (Public read for initial demo ease. Strict policies would be added before production)
CREATE POLICY "Public read access for locations" ON locations FOR SELECT USING (true);
CREATE POLICY "Public read access for cooperatives" ON cooperatives FOR SELECT USING (true);
CREATE POLICY "Public read access for services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access for workers" ON workers FOR SELECT USING (true);
CREATE POLICY "Public read access for worker_skills" ON worker_skills FOR SELECT USING (true);
CREATE POLICY "Public read access for users" ON users FOR SELECT USING (true);

-- SEED DATA
INSERT INTO locations (name, city, state) VALUES 
('Adyar', 'Chennai', 'Tamil Nadu'),
('T Nagar', 'Chennai', 'Tamil Nadu'),
('Anna Nagar', 'Chennai', 'Tamil Nadu');

INSERT INTO cooperatives (name, address, contact_email, contact_phone) VALUES 
('Chennai City Labour Cooperative', '123 Main St, T Nagar', 'contact@chennaicoop.in', '+919876543210'),
('South Chennai Workers Federation', '45 LB Road, Adyar', 'south@chennaicoop.in', '+919876543211');

INSERT INTO services (name, description, base_price) VALUES 
('Electrician', 'Electrical repairs, wiring, and installations', 500.00),
('Plumber', 'Plumbing repairs, pipe fitting, and leak fixing', 500.00),
('Carpenter', 'Furniture repair, wood works', 600.00),
('Cleaner', 'Deep cleaning, regular house cleaning', 400.00),
('Painter', 'Interior and exterior painting services', 800.00);
