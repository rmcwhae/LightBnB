INSERT INTO users (id, name, email, password)
VALUES (1, 'Billy Bob', 'bill@bob.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Sally Jill', 'sall@jill.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'Mister Tom', 'mister@tom.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

ALTER SEQUENCE users_id_seq RESTART WITH 4;

INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, city, street, province, post_code)
VALUES (1, 1, 'Jingle Shell', 'description', 'https://images.pexels.com/photos/1680140/pexels-photo-1680140.jpeg?cs=srgb&dl=aerial-photography-aerial-shot-aerial-view-1680140.jpg&fm=jpg', 'https://images.pexels.com/photos/2468773/pexels-photo-2468773.jpeg?cs=srgb&dl=4k-wallpaper-architecture-beach-2468773.jpg&fm=jpg', 150, 2, 2, 3, 'Canada', 'Tofino', '123 Main Street', 'British Columbia', 'T2X 3F7'),
(2, 1, 'Farmhouse Haven', 'description', 'https://images.pexels.com/photos/158179/lake-constance-sheep-pasture-sheep-blue-158179.jpeg?cs=srgb&dl=agriculture-countryside-cropland-158179.jpg&fm=jpg', 'https://images.pexels.com/photos/158179/lake-constance-sheep-pasture-sheep-blue-158179.jpeg?cs=srgb&dl=agriculture-countryside-cropland-158179.jpg&fm=jpg', 75, 2, 2, 3, 'Canada', 'Prince Alberta', '123 Main Street', 'Saskatchewan', 'T4X 5L7'),
(3, 3, 'Downtown Hideout', 'description', 'https://images.pexels.com/photos/1095901/pexels-photo-1095901.png?cs=srgb&dl=architecture-buildings-cars-1095901.jpg&fm=jpg', 'https://images.pexels.com/photos/1095901/pexels-photo-1095901.png?cs=srgb&dl=architecture-buildings-cars-1095901.jpg&fm=jpg', 300, 2, 2, 3, 'Canada', 'Toronto', '123 Bloor Street', 'Ontario', 'V8X 8G9');

ALTER SEQUENCE properties_id_seq RESTART WITH 4;

INSERT INTO reservations (id, start_date, end_date, property_id, guest_id)
VALUES (1, '2018-09-04', '2018-09-08', 1, 1),
(2, '2016-06-04', '2016-06-08', 1, 2),
(3, '2017-01-05', '2017-01-11', 2, 3),
(4, '2019-03-20', '2019-03-24', 3, 3);

ALTER SEQUENCE reservations_id_seq RESTART WITH 4;

INSERT INTO property_reviews (guest_id, reservation_id, property_id, rating, message)
VALUES (3, 3, 2, 4, 'message'),
(1, 4, 3, 3, 'message'),
(2, 2, 1, 1, 'message');

ALTER SEQUENCE property_reviews_id_seq RESTART WITH 4;