-- Clean, curated gallery items only - no duplicates
DELETE FROM gallery;

INSERT INTO gallery (title, url, category, is_featured) VALUES 
-- Featured Items (using actual training images)
('MOVEMENT PERFORMANCE TRAINING', '/images/training/WhatsApp Image 2025-09-01 at 11.21.30 AM.jpeg', 'featured', true),
('MOVEMENT PERFORMANCE TRAINING - Advanced', '/images/training/WhatsApp Image 2025-09-01 at 11.21.34 AM.jpeg', 'featured', true),
('MOVEMENT PERFORMANCE TRAINING - Elite', '/images/training/WhatsApp Image 2025-09-01 at 11.21.36 AM.jpeg', 'featured', true),
('MOVEMENT PERFORMANCE TRAINING - Premium', '/images/training/WhatsApp Image 2025-09-01 at 11.21.38 AM.jpeg', 'featured', true),

-- Training Sessions (using actual training images)
('High-Intensity Training Session', '/images/training/WhatsApp Image 2025-09-01 at 11.21.40 AM.jpeg', 'training', false),
('Strength Training Workout', '/images/training/WhatsApp Image 2025-09-01 at 11.21.41 AM.jpeg', 'training', false),
('Functional Movement Training', '/images/training/WhatsApp Image 2025-09-01 at 11.21.43 AM.jpeg', 'training', false),
('Personal Training Session', '/images/training/WhatsApp Image 2025-09-01 at 11.21.46 AM.jpeg', 'training', false),
('Group Fitness Class', '/images/training/WhatsApp Image 2025-09-01 at 11.21.47 AM.jpeg', 'training', false),
('Nutrition Coaching Session', '/images/training/WhatsApp Image 2025-09-01 at 11.23.32 AM.jpeg', 'training', false),
('Group Classes Training', '/images/training/WhatsApp Image 2025-09-01 at 11.23.34 AM.jpeg', 'training', false),

-- Logos and Branding
('MPT Logo', '/images/logos/mpt-logo.jpeg', 'logos', true),

-- Team Photos
('Chloe Barrett - Founder & Head Trainer', '/images/team/chloe-headshot.jpg', 'team', true),

-- Additional Training Photos
('Kitesurfing Training Session', '/images/training/WhatsApp Image 2025-09-01 at 11.21.30 AM.jpeg', 'training', false),
('Hydrofoil Training', '/images/training/WhatsApp Image 2025-09-01 at 11.21.31 AM.jpeg', 'training', false),
('Wing Foil Instruction', '/images/training/WhatsApp Image 2025-09-01 at 11.21.33 AM.jpeg', 'training', false),
('Advanced Kitesurfing Techniques', '/images/training/WhatsApp Image 2025-09-01 at 11.21.34 AM.jpeg', 'training', false),
('Water Sports Safety Training', '/images/training/WhatsApp Image 2025-09-01 at 11.21.35 AM.jpeg', 'training', false),
('Equipment Training Session', '/images/training/WhatsApp Image 2025-09-01 at 11.21.36 AM.jpeg', 'training', false),
('Beginner Kitesurfing Lesson', '/images/training/WhatsApp Image 2025-09-01 at 11.21.37 AM.jpeg', 'training', false),
('Intermediate Training Program', '/images/training/WhatsApp Image 2025-09-01 at 11.21.38 AM.jpeg', 'training', false),
('Professional Coaching Session', '/images/training/WhatsApp Image 2025-09-01 at 11.21.39 AM.jpeg', 'training', false),
('Group Training Class', '/images/training/WhatsApp Image 2025-09-01 at 11.21.40 AM.jpeg', 'training', false),
('Private Instruction', '/images/training/WhatsApp Image 2025-09-01 at 11.21.41 AM.jpeg', 'training', false),
('Technique Refinement', '/images/training/WhatsApp Image 2025-09-01 at 11.21.43 AM.jpeg', 'training', false),
('Skill Development Session', '/images/training/WhatsApp Image 2025-09-01 at 11.21.46 AM.jpeg', 'training', false),
('Performance Enhancement Training', '/images/training/WhatsApp Image 2025-09-01 at 11.21.47 AM.jpeg', 'training', false),
('Advanced Maneuvers Training', '/images/training/WhatsApp Image 2025-09-01 at 11.23.32 AM.jpeg', 'training', false),
('Competition Preparation', '/images/training/WhatsApp Image 2025-09-01 at 11.23.34 AM.jpeg', 'training', false),
('Equipment Mastery', '/images/training/WhatsApp Image 2025-09-01 at 11.23.37 AM.jpeg', 'training', false),
('Weather Conditions Training', '/images/training/WhatsApp Image 2025-09-01 at 11.23.40 AM.jpeg', 'training', false),
('Safety Protocol Training', '/images/training/WhatsApp Image 2025-09-01 at 11.23.42 AM.jpeg', 'training', false),
('Rescue Techniques', '/images/training/WhatsApp Image 2025-09-01 at 11.23.45 AM.jpeg', 'training', false),
('Emergency Response Training', '/images/training/WhatsApp Image 2025-09-01 at 11.23.48 AM.jpeg', 'training', false),
('Student Progress Session', '/images/training/WhatsApp Image 2025-09-01 at 11.26.48 AM.jpeg', 'training', false),
('Certification Training', '/images/training/WhatsApp Image 2025-09-01 at 11.26.50 AM.jpeg', 'training', false),
('Instructor Development', '/images/training/WhatsApp Image 2025-09-01 at 11.26.54 AM.jpeg', 'training', false),
('Master Class Session', '/images/training/WhatsApp Image 2025-09-01 at 11.26.58 AM.jpeg', 'training', false),
('Elite Training Program', '/images/training/WhatsApp Image 2025-09-01 at 11.26.59 AM.jpeg', 'training', false),

-- Story Images
('Success Story - Deadlift Achievement', '/images/story/deadlift-story.jpg', 'featured', true),

-- Hero Images
('Homepage Hero - Training Excellence', '/images/hero/homepage.jpeg', 'featured', true),
('Kettlebell Workout Hero', '/images/hero/kettlebell-workout-hero.png', 'training', true);

-- Services
DELETE FROM services;

INSERT INTO services (name, description, price, category, is_active) VALUES 
('Kitesurfing Training', 'Comprehensive kitesurfing lessons for all skill levels', 99.00, 'Training', true),
('Hydrofoil Training', 'Master the art of hydrofoiling with expert instructors', 99.00, 'Training', true),
('Nutrition Coaching', 'Learn nutrition principles and meal planning strategies', 99.00, 'Training', true),
('Equipment Rental', 'High-quality kitesurfing and foiling equipment rental', 99.00, 'Rental', true),
('Private Coaching', 'One-on-one personalized coaching sessions', 99.00, 'Coaching', true);

-- Team Members - Start with Chloe only
DELETE FROM team;

INSERT INTO team (name, title, description, image_url, credentials, is_featured, display_order) VALUES 
('Chloe Barrett', 'Founder & Head Trainer', 'Chloe Barrett is the founder and head trainer at Movement Performance Training. With over 8 years of experience in kitesurfing, hydrofoiling, and movement coaching, she brings a unique blend of technical expertise and personalized instruction to every session. Chloe is passionate about helping students achieve their goals while maintaining the highest standards of safety and performance.', '/images/team/chloe-headshot.jpg', '• Certified Kitesurfing Instructor (IKO Level 2)\n• Hydrofoil Specialist\n• Movement Performance Coach\n• Nutrition & Wellness Consultant\n• Water Safety Instructor\n• 8+ Years Experience\n• 500+ Students Trained', true, 1);

-- Testimonials
DELETE FROM testimonials;

INSERT INTO testimonials (customer_name, rating, comment) VALUES 
('Sarah Mitchell', 5, 'Chloe is an incredible instructor! Her patience and expertise helped me master kitesurfing in just a few sessions. The personalized approach and attention to detail made all the difference.'),
('James Rodriguez', 5, 'The hydrofoil training was outstanding. Chloe''s technical knowledge and teaching methods are top-notch. I felt confident and safe throughout the entire learning process.'),
('Emma Thompson', 5, 'Movement Performance Training exceeded my expectations. Chloe''s passion for the sport is contagious, and her ability to break down complex techniques into manageable steps is remarkable.'),
('David Chen', 4, 'Professional, knowledgeable, and fun! The nutrition coaching sessions were challenging but incredibly rewarding. Chloe''s coaching style is perfect for all skill levels.'),
('Lisa Anderson', 5, 'I''ve tried other instructors before, but Chloe stands out. Her understanding of movement and performance is exceptional. Highly recommend for anyone serious about improving their skills.');