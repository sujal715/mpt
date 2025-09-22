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
    comment TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    service_used VARCHAR(255),
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create team table
CREATE TABLE IF NOT EXISTS team (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    credentials TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample packages
INSERT INTO packages (name, description, price, duration) VALUES
('Basic Package', 'Essential services for small projects', 99.00, '1-2 weeks'),
('Premium Package', 'Advanced services with priority support', 119.00, '2-3 weeks'),
('Deluxe Package', 'Comprehensive services with premium features', 139.00, '3-4 weeks'),
('VIP Package', 'Exclusive services with dedicated support', 159.00, '4-6 weeks');

-- Insert sample services
INSERT INTO services (name, description, price, category) VALUES
('Web Development', 'Custom website development', 150.00, 'Development'),
('Mobile App Development', 'iOS and Android app development', 200.00, 'Development'),
('UI/UX Design', 'User interface and experience design', 100.00, 'Design'),
('SEO Optimization', 'Search engine optimization', 75.00, 'Marketing'),
('Content Creation', 'Professional content writing', 50.00, 'Content');

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, rating, comment) VALUES
('Sarah Mitchell', 5, 'Chloe is an incredible instructor! Her patience and expertise helped me master kitesurfing in just a few sessions. The personalized approach and attention to detail made all the difference.'),
('James Rodriguez', 5, 'The hydrofoil training was outstanding. Chloe''s technical knowledge and teaching methods are top-notch. I felt confident and safe throughout the entire learning process.'),
('Emma Thompson', 5, 'Movement Performance Training exceeded my expectations. Chloe''s passion for the sport is contagious, and her ability to break down complex techniques into manageable steps is remarkable.'),
('David Chen', 4, 'Professional, knowledgeable, and fun! The nutrition coaching sessions were challenging but incredibly rewarding. Chloe''s coaching style is perfect for all skill levels.'),
('Lisa Anderson', 5, 'I''ve tried other instructors before, but Chloe stands out. Her understanding of movement and performance is exceptional. Highly recommend for anyone serious about improving their skills.');

-- Insert gallery images
INSERT INTO gallery (title, url, category, is_featured) VALUES
('MPT Logo', '/images/gallery-1757260718-1.jpeg', 'logos', false),
('Chloe - Team Member', '/images/gallery-1757260718-2.jpg', 'team', false),
('Homepage Hero Image', '/images/gallery-1757260718-3.jpeg', 'locations', false),
('Training Session', '/images/gallery-1757260718-4.jpeg', 'training', false),
('MPT Logo', '/images/gallery-1757260718-5.jpeg', 'logos', false),
('Chloe Headshot', '/images/gallery-1757260718-6.jpg', 'team', false),
('Homepage Background', '/images/gallery-1757260718-7.jpeg', 'locations', false),
('Training Session', '/images/gallery-1757260718-8.jpg', 'training', false),
('Training Session', '/images/gallery-1757260718-9.jpg', 'training', false),
('Training Session', '/images/gallery-1757260718-10.jpg', 'training', false),
('Training Session', '/images/gallery-1757260718-11.jpg', 'training', false),
('Training Session', '/images/gallery-1757260718-12.jpg', 'training', false),
('Training Session', '/images/gallery-1757260718-13.jpg', 'training', false),
('Training Session', '/images/gallery-1757260718-14.jpg', 'training', false),
('Facility Image', '/images/gallery-1757260718-15.jpg', 'facility', false),
('Logo Image', '/images/gallery-1757260718-16.jpeg', 'logos', false),
('Facility Image', '/images/gallery-1757260718-17.jpg', 'facility', false),
('Facility Image', '/images/gallery-1757260718-18.jpg', 'facility', false),
('Training Session', '/images/gallery-1757260718-19.jpeg', 'training', false),
('Team Member', '/images/gallery-1757260718-20.jpg', 'team', false),
('Training Session', '/images/gallery-1757260718-21.jpg', 'training', false),
('Training Session', '/images/gallery-1757260718-22.jpg', 'training', false),
('Training Session', '/images/gallery-1757260718-23.jpg', 'training', false),
('Training Session', '/images/gallery-1757260718-24.jpeg', 'training', false),
('Team Member', '/images/gallery-1757260718-25.jpg', 'team', false),
('Logo Image', '/images/gallery-1757260718-26.jpeg', 'logos', false),
('Location Image', '/images/gallery-1757260718-27.jpeg', 'locations', false),
('Location Image', '/images/gallery-1757260718-28.jpeg', 'locations', false),
('Training Session', '/images/gallery-1757260718-29.jpg', 'training', false),
('Location Image', '/images/gallery-1757260718-30.jpeg', 'locations', false),
('Facility Image', '/images/gallery-1757260718-31.jpg', 'facility', false),
('Training Session', '/images/gallery-1757260718-32.jpg', 'training', false),
('Training Session', '/images/gallery-1757260718-33.jpg', 'training', false),
('Training Session', '/images/gallery-1757260718-34.jpg', 'training', false),
('Training Session', '/images/gallery-1757260718-35.jpg', 'training', false);
