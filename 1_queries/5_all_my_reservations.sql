SELECT properties.*, reservations.*, avg(property_reviews.rating) AS average_rating
FROM reservations
JOIN users ON guest_id = users.id
JOIN properties ON property_id = properties.id
JOIN property_reviews ON property_reviews.property_id = properties.id
WHERE reservations.guest_id = 1
AND now()::date > end_date
GROUP BY reservations.id, properties.id
ORDER BY reservations.start_date
LIMIT 10;