import sql from "better-sqlite3";
const db = sql("travel.db");

export async function createFlight(
  contact_number,
  coming_from,
  arrival_to,
  day,
  date,
  arrival_time,
  trip_duration,
  flight_numbers,
  price,
  driver_id
) {
  const stmt = db.prepare(`
    INSERT INTO Flight (
      contact_number,
      coming_from,
      arrival_to,
      day,
      date,
      arrival_time,
      trip_duration,
      flight_numbers,
      price,
      driver_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(
    contact_number,
    coming_from,
    arrival_to,
    day,
    date,
    arrival_time,
    trip_duration,
    flight_numbers,
    price,
    driver_id
  );

  return info.lastInsertRowid || null; // returns the new flight_id or null if failed
}

export async function getFlightsForDriver(driver_id) {
  const stmt = db.prepare(`
    SELECT 
      f.flight_id,
      f.flight_numbers,
      d.name AS driver_name,
      f.day AS trip_day,
      f.date AS trip_date,
      d.car_type,
      g.name AS guest_name,
      f.coming_from AS from_location,
      f.arrival_to AS to_location,
      f.price AS flight_price,
      f.contact_number AS guest_phonenumber
    FROM Flight f
    JOIN Driver d ON f.driver_id = d.driver_id
    LEFT JOIN Guest g ON g.flight_id = f.flight_id AND g.isHead = 1
    WHERE f.driver_id = ?
  `);

  const rows = stmt.all(driver_id);
  return rows.length > 0 ? rows : null;
}
export async function getFlightsForAdmin() {
  const stmt = db.prepare(`
    SELECT 
      f.flight_id,
      f.flight_numbers,
      d.name AS driver_name,
      f.day AS trip_day,
      f.date AS trip_date,
      d.car_type,
      g.name AS guest_name,
      f.coming_from AS from_location,
      f.arrival_to AS to_location,
      f.price AS flight_price,
      f.contact_number AS guest_phonenumber
    FROM Flight f
    JOIN Driver d ON f.driver_id = d.driver_id
    LEFT JOIN Guest g ON g.flight_id = f.flight_id AND g.isHead = 1
  `);

  const rows = stmt.all();
  return rows.length > 0 ? rows : null;
}
export async function getFlightById(flight_id) {
  const stmt = db.prepare(`
    SELECT 
      flight_id,
      flight_numbers,
      day AS trip_day,
      date AS trip_date,
      arrival_time,
      trip_duration,
      coming_from,
      arrival_to,
      price,
      contact_number,
      driver_id
    FROM Flight
    WHERE flight_id = ?
  `);

  const flight = stmt.get(flight_id);

  return flight || null;
}
export async function editFlight(
  flight_id,
  contact,
  pickup,
  destination,
  day,
  date,
  arrival_time,
  duration,
  flight_number,
  price
) {
  const stmt = db.prepare(`
    UPDATE Flight
    SET 
      contact_number = ?,
      coming_from = ?,
      arrival_to = ?,
      day = ?,
      date = ?,
      arrival_time = ?,
      trip_duration = ?,
      flight_numbers = ?,
      price = ?
    WHERE flight_id = ?
  `);

  const result = stmt.run(
    contact,
    pickup,
    destination,
    day,
    date,
    arrival_time,
    duration,
    flight_number,
    price,
    flight_id
  );

  return result.changes > 0;
}
