const db = require('./db');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  let user;
  const queryString = 'SELECT * from users where email = $1';
  const values = email;
  return db.query(queryString, [values])
    .then(res => {
      user = res.rows[0];
      if (user) {
        return user;
      }
      return null;
    })
    .catch(err => console.error('query error', err.stack));
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  let user;
  const queryString = 'SELECT * from users where id = $1';
  const values = id;
  return db.query(queryString, [values])
    .then(res => {
      user = res.rows[0];
      if (user) {
        return user;
      }
      return null;
    })
    .catch(err => console.error('query error', err.stack));
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;';
  return db.query(queryString, [user.name, user.email, user.password])
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack));
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
SELECT properties.*, reservations.*, avg(property_reviews.rating) AS average_rating
FROM reservations
JOIN users ON guest_id = users.id
JOIN properties ON property_id = properties.id
JOIN property_reviews ON property_reviews.property_id = properties.id
WHERE reservations.guest_id = $1
AND now()::date > end_date
GROUP BY reservations.id, properties.id
ORDER BY reservations.start_date
LIMIT $2;
`;
  return db.query(queryString, [guest_id, limit])
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
  // return getAllProperties(null, 2);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];

  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    `;
  let filterQueryWord = 'WHERE';
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += filterQueryWord;
    queryString += ` city LIKE $${queryParams.length} `;
  }
  if (options.owner_id) {
    queryParams.push(Number(options.owner_id));
    const numOfQueryParams = queryParams.length;
    if (numOfQueryParams > 1) {
      filterQueryWord = 'AND';
    }
    queryString += filterQueryWord;
    queryString += ` owner_id = $${queryParams.length} `;
  }
  if (options.minimum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night * 100));
    const numOfQueryParams = queryParams.length;
    if (numOfQueryParams > 1) {
      filterQueryWord = 'AND';
    }
    queryString += filterQueryWord;
    queryString += ` cost_per_night >= $${queryParams.length} `;
  }
  if (options.maximum_price_per_night) {
    queryParams.push(Number(options.maximum_price_per_night * 100));
    const numOfQueryParams = queryParams.length;
    if (numOfQueryParams > 1) {
      filterQueryWord = 'AND';
    }
    queryString += filterQueryWord;
    queryString += ` cost_per_night <= $${queryParams.length} `;
  }
  
  queryString += `GROUP BY properties.id`;
  
  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }
  
  queryParams.push(limit);
  queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  
  // console.log(queryString, queryParams);

  return db.query(queryString, queryParams)
    .then(res => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryString = 'INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, city, street, province, post_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;';
  return db.query(queryString, [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code])
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
};
exports.addProperty = addProperty;
