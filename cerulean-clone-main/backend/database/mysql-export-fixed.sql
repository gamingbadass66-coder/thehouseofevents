-- MySQL Export from SQLite Database
-- Generated on: 2025-09-21T17:12:49.103Z
-- Database: The House of Events

USE house_of_events;

-- Users Data
INSERT INTO users (id, name, email, phone, created_at, updated_at, is_active) VALUES
(1, 'Priya Patel', 'priya.patel@example.com', '+91 98765 43210', '2025-09-21 16:18:12', '2025-09-21 16:18:12', 1),
(2, 'Rahul Sharma', 'rahul.sharma@example.com', '+91 87654 32109', '2025-09-21 16:18:12', '2025-09-21 16:18:12', 1),
(3, 'Sneha Gupta', 'sneha.gupta@example.com', '+91 76543 21098', '2025-09-21 16:18:12', '2025-09-21 16:18:12', 1),
(4, 'Test User', 'test@example.com', '+91 99999 99999', '2025-09-21 16:44:50', '2025-09-21 16:44:50', 1),
(8, 'zulfiqar saherwala', 'gamingbadass66@gmail.com', '09313991578', '2025-09-21 16:55:45', '2025-09-21 16:55:45', 1);

-- Event Categories Data
INSERT INTO event_categories (id, name, description, created_at) VALUES
(1, 'Art & Creativity', 'Painting, drawing, and creative workshops', '2025-09-21 16:18:12'),
(2, 'Music & Performance', 'Concerts, open mics, and musical events', '2025-09-21 16:18:12'),
(3, 'Community & Networking', 'Meetups, discussions, and community building', '2025-09-21 16:18:12'),
(4, 'Workshops & Learning', 'Educational and skill-building sessions', '2025-09-21 16:18:12'),
(5, 'Cultural Events', 'Traditional and cultural celebrations', '2025-09-21 16:18:12'),
(6, 'Art & Creativity', 'Painting, drawing, and creative workshops', '2025-09-21 16:44:59'),
(7, 'Music & Performance', 'Concerts, open mics, and musical events', '2025-09-21 16:44:59'),
(8, 'Community & Networking', 'Meetups, discussions, and community building', '2025-09-21 16:44:59'),
(9, 'Workshops & Learning', 'Educational and skill-building sessions', '2025-09-21 16:44:59'),
(10, 'Cultural Events', 'Traditional and cultural celebrations', '2025-09-21 16:44:59'),
(11, 'Art & Creativity', 'Painting, drawing, and creative workshops', '2025-09-21 16:58:36'),
(12, 'Music & Performance', 'Concerts, open mics, and musical events', '2025-09-21 16:58:36'),
(13, 'Community & Networking', 'Meetups, discussions, and community building', '2025-09-21 16:58:36'),
(14, 'Workshops & Learning', 'Educational and skill-building sessions', '2025-09-21 16:58:36'),
(15, 'Cultural Events', 'Traditional and cultural celebrations', '2025-09-21 16:58:36'),
(16, 'Art & Creativity', 'Painting, drawing, and creative workshops', '2025-09-21 16:59:20'),
(17, 'Music & Performance', 'Concerts, open mics, and musical events', '2025-09-21 16:59:20'),
(18, 'Community & Networking', 'Meetups, discussions, and community building', '2025-09-21 16:59:20'),
(19, 'Workshops & Learning', 'Educational and skill-building sessions', '2025-09-21 16:59:20'),
(20, 'Cultural Events', 'Traditional and cultural celebrations', '2025-09-21 16:59:20'),
(21, 'Art & Creativity', 'Painting, drawing, and creative workshops', '2025-09-21 17:05:00'),
(22, 'Music & Performance', 'Concerts, open mics, and musical events', '2025-09-21 17:05:00'),
(23, 'Community & Networking', 'Meetups, discussions, and community building', '2025-09-21 17:05:00'),
(24, 'Workshops & Learning', 'Educational and skill-building sessions', '2025-09-21 17:05:00'),
(25, 'Cultural Events', 'Traditional and cultural celebrations', '2025-09-21 17:05:00');

-- Events Data
INSERT INTO events (id, title, description, short_description, event_date, start_time, end_time, venue, address, price, max_capacity, current_bookings, category_id, image_url, status, created_at, updated_at) VALUES
(1, 'SIP — Share. Inspire. Paint.', 'Join us for our signature event, "SIP – Share. Inspire. Paint," an evening where creativity flows freely and connections are forged over strokes of colour and heartfelt conversations. Immerse yourself in a relaxing painting session while enjoying stimulating discussions and delightful refreshments. No prior art experience is necessary — just bring your enthusiasm!', 'An evening of painting, conversation, and creative connection.', '2024-09-12', '16:00', '18:30', 'Creative Studio', '', 150, 30, 0, 1, '/assets/sip-event.jpg', 'upcoming', '2025-09-21 16:18:12', '2025-09-21 16:18:12'),
(2, 'Youth Poetry Slam', 'Express yourself through the power of words! Join us for an evening of spoken word poetry where young voices share their stories, dreams, and perspectives. Whether you\'re a seasoned poet or just starting out, this is your platform to be heard.', 'An evening of spoken word poetry and self-expression.', '2024-10-15', '18:00', '20:00', 'Community Center', '', 100, 50, 0, 2, '/assets/gallery-1.jpg', 'upcoming', '2025-09-21 16:18:12', '2025-09-21 16:18:12'),
(3, 'Digital Art Workshop', 'Learn the basics of digital art and design in this hands-on workshop. We\'ll cover tools, techniques, and creative processes used by professional digital artists. Perfect for beginners and those looking to expand their creative skills.', 'Hands-on digital art and design workshop.', '2024-11-20', '14:00', '17:00', 'Tech Hub', '', 200, 25, 0, 4, '/assets/gallery-2.jpg', 'upcoming', '2025-09-21 16:18:12', '2025-09-21 16:18:12'),
(4, 'SIP — Share. Inspire. Paint.', 'Join us for our signature event, "SIP – Share. Inspire. Paint," an evening where creativity flows freely and connections are forged over strokes of colour and heartfelt conversations. Immerse yourself in a relaxing painting session while enjoying stimulating discussions and delightful refreshments. No prior art experience is necessary — just bring your enthusiasm!', 'An evening of painting, conversation, and creative connection.', '2024-09-12', '16:00', '18:30', 'Creative Studio', '', 150, 30, 0, 1, '/assets/sip-event.jpg', 'upcoming', '2025-09-21 16:44:59', '2025-09-21 16:44:59'),
(5, 'Youth Poetry Slam', 'Express yourself through the power of words! Join us for an evening of spoken word poetry where young voices share their stories, dreams, and perspectives. Whether you\'re a seasoned poet or just starting out, this is your platform to be heard.', 'An evening of spoken word poetry and self-expression.', '2024-10-15', '18:00', '20:00', 'Community Center', '', 100, 50, 0, 2, '/assets/gallery-1.jpg', 'upcoming', '2025-09-21 16:44:59', '2025-09-21 16:44:59'),
(6, 'Digital Art Workshop', 'Learn the basics of digital art and design in this hands-on workshop. We\'ll cover tools, techniques, and creative processes used by professional digital artists. Perfect for beginners and those looking to expand their creative skills.', 'Hands-on digital art and design workshop.', '2024-11-20', '14:00', '17:00', 'Tech Hub', '', 200, 25, 0, 4, '/assets/gallery-2.jpg', 'upcoming', '2025-09-21 16:44:59', '2025-09-21 16:44:59'),
(7, 'SIP — Share. Inspire. Paint.', 'Join us for our signature event, "SIP – Share. Inspire. Paint," an evening where creativity flows freely and connections are forged over strokes of colour and heartfelt conversations. Immerse yourself in a relaxing painting session while enjoying stimulating discussions and delightful refreshments. No prior art experience is necessary — just bring your enthusiasm!', 'An evening of painting, conversation, and creative connection.', '2024-09-12', '16:00', '18:30', 'Creative Studio', '', 150, 30, 0, 1, '/assets/sip-event.jpg', 'upcoming', '2025-09-21 16:58:36', '2025-09-21 16:58:36'),
(8, 'Youth Poetry Slam', 'Express yourself through the power of words! Join us for an evening of spoken word poetry where young voices share their stories, dreams, and perspectives. Whether you\'re a seasoned poet or just starting out, this is your platform to be heard.', 'An evening of spoken word poetry and self-expression.', '2024-10-15', '18:00', '20:00', 'Community Center', '', 100, 50, 0, 2, '/assets/gallery-1.jpg', 'upcoming', '2025-09-21 16:58:36', '2025-09-21 16:58:36'),
(9, 'Digital Art Workshop', 'Learn the basics of digital art and design in this hands-on workshop. We\'ll cover tools, techniques, and creative processes used by professional digital artists. Perfect for beginners and those looking to expand their creative skills.', 'Hands-on digital art and design workshop.', '2024-11-20', '14:00', '17:00', 'Tech Hub', '', 200, 25, 0, 4, '/assets/gallery-2.jpg', 'upcoming', '2025-09-21 16:58:36', '2025-09-21 16:58:36'),
(10, 'SIP — Share. Inspire. Paint.', 'Join us for our signature event, "SIP – Share. Inspire. Paint," an evening where creativity flows freely and connections are forged over strokes of colour and heartfelt conversations. Immerse yourself in a relaxing painting session while enjoying stimulating discussions and delightful refreshments. No prior art experience is necessary — just bring your enthusiasm!', 'An evening of painting, conversation, and creative connection.', '2024-09-12', '16:00', '18:30', 'Creative Studio', '', 150, 30, 0, 1, '/assets/sip-event.jpg', 'upcoming', '2025-09-21 16:59:20', '2025-09-21 16:59:20'),
(11, 'Youth Poetry Slam', 'Express yourself through the power of words! Join us for an evening of spoken word poetry where young voices share their stories, dreams, and perspectives. Whether you\'re a seasoned poet or just starting out, this is your platform to be heard.', 'An evening of spoken word poetry and self-expression.', '2024-10-15', '18:00', '20:00', 'Community Center', '', 100, 50, 0, 2, '/assets/gallery-1.jpg', 'upcoming', '2025-09-21 16:59:20', '2025-09-21 16:59:20'),
(12, 'Digital Art Workshop', 'Learn the basics of digital art and design in this hands-on workshop. We\'ll cover tools, techniques, and creative processes used by professional digital artists. Perfect for beginners and those looking to expand their creative skills.', 'Hands-on digital art and design workshop.', '2024-11-20', '14:00', '17:00', 'Tech Hub', '', 200, 25, 0, 4, '/assets/gallery-2.jpg', 'upcoming', '2025-09-21 16:59:20', '2025-09-21 16:59:20'),
(13, 'SIP — Share. Inspire. Paint.', 'Join us for our signature event, "SIP – Share. Inspire. Paint," an evening where creativity flows freely and connections are forged over strokes of colour and heartfelt conversations. Immerse yourself in a relaxing painting session while enjoying stimulating discussions and delightful refreshments. No prior art experience is necessary — just bring your enthusiasm!', 'An evening of painting, conversation, and creative connection.', '2024-09-12', '16:00', '18:30', 'Creative Studio', '', 150, 30, 0, 1, '/assets/sip-event.jpg', 'upcoming', '2025-09-21 17:05:00', '2025-09-21 17:05:00'),
(14, 'Youth Poetry Slam', 'Express yourself through the power of words! Join us for an evening of spoken word poetry where young voices share their stories, dreams, and perspectives. Whether you\'re a seasoned poet or just starting out, this is your platform to be heard.', 'An evening of spoken word poetry and self-expression.', '2024-10-15', '18:00', '20:00', 'Community Center', '', 100, 50, 0, 2, '/assets/gallery-1.jpg', 'upcoming', '2025-09-21 17:05:00', '2025-09-21 17:05:00'),
(15, 'Digital Art Workshop', 'Learn the basics of digital art and design in this hands-on workshop. We\'ll cover tools, techniques, and creative processes used by professional digital artists. Perfect for beginners and those looking to expand their creative skills.', 'Hands-on digital art and design workshop.', '2024-11-20', '14:00', '17:00', 'Tech Hub', '', 200, 25, 0, 4, '/assets/gallery-2.jpg', 'upcoming', '2025-09-21 17:05:00', '2025-09-21 17:05:00');

-- Team Members Data
INSERT INTO team_members (id, name, role, bio, image_url, social_links, is_founder, is_active, created_at) VALUES
(1, 'Anish Saherwala', 'Co-Founder', 'Passionate about creating meaningful experiences for youth in Ahmedabad.', '', NULL, 1, 1, '2025-09-21 16:18:12'),
(2, 'Samya Gandhi', 'Co-Founder', 'Dedicated to fostering creativity and community connections.', '', NULL, 1, 1, '2025-09-21 16:18:12'),
(3, 'Nirmal Moryani', 'Co-Founder', 'Committed to enriching the cultural landscape of Ahmedabad.', '', NULL, 1, 1, '2025-09-21 16:18:12'),
(4, 'Anish Saherwala', 'Co-Founder', 'Passionate about creating meaningful experiences for youth in Ahmedabad.', '', NULL, 1, 1, '2025-09-21 16:44:59'),
(5, 'Samya Gandhi', 'Co-Founder', 'Dedicated to fostering creativity and community connections.', '', NULL, 1, 1, '2025-09-21 16:44:59'),
(6, 'Nirmal Moryani', 'Co-Founder', 'Committed to enriching the cultural landscape of Ahmedabad.', '', NULL, 1, 1, '2025-09-21 16:44:59'),
(7, 'Anish Saherwala', 'Co-Founder', 'Passionate about creating meaningful experiences for youth in Ahmedabad.', '', NULL, 1, 1, '2025-09-21 16:58:36'),
(8, 'Samya Gandhi', 'Co-Founder', 'Dedicated to fostering creativity and community connections.', '', NULL, 1, 1, '2025-09-21 16:58:36'),
(9, 'Nirmal Moryani', 'Co-Founder', 'Committed to enriching the cultural landscape of Ahmedabad.', '', NULL, 1, 1, '2025-09-21 16:58:36'),
(10, 'Anish Saherwala', 'Co-Founder', 'Passionate about creating meaningful experiences for youth in Ahmedabad.', '', NULL, 1, 1, '2025-09-21 16:59:20'),
(11, 'Samya Gandhi', 'Co-Founder', 'Dedicated to fostering creativity and community connections.', '', NULL, 1, 1, '2025-09-21 16:59:20'),
(12, 'Nirmal Moryani', 'Co-Founder', 'Committed to enriching the cultural landscape of Ahmedabad.', '', NULL, 1, 1, '2025-09-21 16:59:20'),
(13, 'Anish Saherwala', 'Co-Founder', 'Passionate about creating meaningful experiences for youth in Ahmedabad.', '', NULL, 1, 1, '2025-09-21 17:05:00'),
(14, 'Samya Gandhi', 'Co-Founder', 'Dedicated to fostering creativity and community connections.', '', NULL, 1, 1, '2025-09-21 17:05:00'),
(15, 'Nirmal Moryani', 'Co-Founder', 'Committed to enriching the cultural landscape of Ahmedabad.', '', NULL, 1, 1, '2025-09-21 17:05:00');

-- Social Media Links Data (empty)

-- Partnership Types Data
INSERT INTO partnership_types (id, name, description, created_at) VALUES
(1, 'Collaborator (Artist/Performer/Educator)', 'Creative professionals and educators', '2025-09-21 16:18:12'),
(2, 'Cultural Sponsor', 'Organizations supporting cultural initiatives', '2025-09-21 16:18:12'),
(3, 'Brand Partnership', 'Commercial brand collaborations', '2025-09-21 16:18:12'),
(4, 'Venue Partner', 'Venue owners and managers', '2025-09-21 16:18:12'),
(5, 'Media Partner', 'Media and marketing partners', '2025-09-21 16:18:12'),
(6, 'Collaborator (Artist/Performer/Educator)', 'Creative professionals and educators', '2025-09-21 16:44:59'),
(7, 'Cultural Sponsor', 'Organizations supporting cultural initiatives', '2025-09-21 16:44:59'),
(8, 'Brand Partnership', 'Commercial brand collaborations', '2025-09-21 16:44:59'),
(9, 'Venue Partner', 'Venue owners and managers', '2025-09-21 16:44:59'),
(10, 'Media Partner', 'Media and marketing partners', '2025-09-21 16:44:59'),
(11, 'Collaborator (Artist/Performer/Educator)', 'Creative professionals and educators', '2025-09-21 16:58:36'),
(12, 'Cultural Sponsor', 'Organizations supporting cultural initiatives', '2025-09-21 16:58:36'),
(13, 'Brand Partnership', 'Commercial brand collaborations', '2025-09-21 16:58:36'),
(14, 'Venue Partner', 'Venue owners and managers', '2025-09-21 16:58:36'),
(15, 'Media Partner', 'Media and marketing partners', '2025-09-21 16:58:36'),
(16, 'Collaborator (Artist/Performer/Educator)', 'Creative professionals and educators', '2025-09-21 16:59:20'),
(17, 'Cultural Sponsor', 'Organizations supporting cultural initiatives', '2025-09-21 16:59:20'),
(18, 'Brand Partnership', 'Commercial brand collaborations', '2025-09-21 16:59:20'),
(19, 'Venue Partner', 'Venue owners and managers', '2025-09-21 16:59:20'),
(20, 'Media Partner', 'Media and marketing partners', '2025-09-21 16:59:20'),
(21, 'Collaborator (Artist/Performer/Educator)', 'Creative professionals and educators', '2025-09-21 17:05:00'),
(22, 'Cultural Sponsor', 'Organizations supporting cultural initiatives', '2025-09-21 17:05:00'),
(23, 'Brand Partnership', 'Commercial brand collaborations', '2025-09-21 17:05:00'),
(24, 'Venue Partner', 'Venue owners and managers', '2025-09-21 17:05:00'),
(25, 'Media Partner', 'Media and marketing partners', '2025-09-21 17:05:00');

