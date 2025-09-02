-- Sample data for MPT Application

-- Insert sample bookings
INSERT INTO bookings (name, email, phone, service, message, status) VALUES
('Alice Brown', 'alice@example.com', '555-0101', 'Web Development', 'Need a corporate website for my business', 'PENDING'),
('Bob Davis', 'bob@example.com', '555-0102', 'Mobile App Development', 'Looking for an iOS app for my restaurant', 'CONFIRMED'),
('Carol Evans', 'carol@example.com', '555-0103', 'UI/UX Design', 'Need help redesigning my e-commerce site', 'PENDING'),
('David Foster', 'david@example.com', '555-0104', 'SEO Optimization', 'Want to improve my website ranking', 'IN_PROGRESS'),
('Emma Garcia', 'emma@example.com', '555-0105', 'Content Creation', 'Need blog content for my tech company', 'COMPLETED');

-- Insert additional packages
INSERT INTO packages (name, description, price, duration) VALUES
('Starter Package', 'Perfect for beginners and small businesses', 49.99, '1 week'),
('Professional Package', 'For growing businesses with advanced needs', 399.99, '4-5 weeks'),
('Enterprise Package', 'Full-service solution for large enterprises', 999.99, '8-12 weeks');

-- Insert additional services
INSERT INTO services (name, description, price, category) VALUES
('E-commerce Development', 'Online store development with payment integration', 300.00, 'Development'),
('API Development', 'RESTful API development and integration', 250.00, 'Development'),
('Database Design', 'Database architecture and optimization', 120.00, 'Development'),
('Cloud Migration', 'Migrate applications to cloud platforms', 400.00, 'Infrastructure'),
('Maintenance & Support', 'Ongoing maintenance and technical support', 80.00, 'Support');

-- Insert additional testimonials
INSERT INTO testimonials (customer_name, rating, comment, service_used, is_approved) VALUES
('Lisa Harris', 5, 'Outstanding quality and attention to detail!', 'E-commerce Development', TRUE),
('Tom Jackson', 4, 'Very professional and delivered on time.', 'API Development', TRUE),
('Rachel Kim', 5, 'Exceeded my expectations completely!', 'UI/UX Design', TRUE),
('Alex Martinez', 4, 'Great communication throughout the project.', 'Web Development', TRUE),
('Sophie Turner', 5, 'Highly skilled team with excellent results.', 'Mobile App Development', TRUE);
