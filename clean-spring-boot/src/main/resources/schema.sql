-- Database Schema for MPT Application

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    service VARCHAR(255) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'PENDING'
);

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    service_used VARCHAR(255),
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample packages
INSERT INTO packages (name, description, price, duration) VALUES
('Basic Package', 'Essential services for small projects', 99.99, '1-2 weeks'),
('Premium Package', 'Advanced services with priority support', 199.99, '2-3 weeks'),
('Deluxe Package', 'Comprehensive services with premium features', 299.99, '3-4 weeks'),
('VIP Package', 'Exclusive services with dedicated support', 499.99, '4-6 weeks'),
('Corporate Package', 'Enterprise-level services for large organizations', 799.99, '6-8 weeks');

-- Insert sample services
INSERT INTO services (name, description, price, category) VALUES
('Web Development', 'Custom website development', 150.00, 'Development'),
('Mobile App Development', 'iOS and Android app development', 200.00, 'Development'),
('UI/UX Design', 'User interface and experience design', 100.00, 'Design'),
('SEO Optimization', 'Search engine optimization', 75.00, 'Marketing'),
('Content Creation', 'Professional content writing', 50.00, 'Content');

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, rating, comment, service_used, is_approved) VALUES
('John Smith', 5, 'Excellent service and professional team!', 'Web Development', TRUE),
('Sarah Johnson', 5, 'Amazing results, highly recommended!', 'Mobile App Development', TRUE),
('Mike Wilson', 4, 'Great work and timely delivery.', 'UI/UX Design', TRUE);
