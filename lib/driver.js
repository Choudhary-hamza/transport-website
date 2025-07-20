import sql from "better-sqlite3";
const db = sql("travel.db");
export async function checkUserCredentials(name, password) {
  const stmt = db.prepare(
    "SELECT driver_id FROM Driver WHERE name = ? AND password = ?"
  );
  const row = stmt.get(name, password);
  return row ? row.driver_id : null;
}
export async function findDriver(residency_number) {
  const stmt = db.prepare("SELECT * FROM Driver WHERE residency_number = ?");
  const row = stmt.get(residency_number);

  return row || null;
}
export async function createDriver(
  name,
  nationality,
  mobile_number,
  residency_number,
  card_number,
  car_type,
  car_plate_number,
  password,
  photo
) {
  const stmt = db.prepare(`
    INSERT INTO Driver (
      name,
      nationality,
      mobile_number,
      residency_number,
      card_number,
      car_type,
      car_plate_number,
      password,
      photo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(
    name,
    nationality,
    mobile_number,
    residency_number,
    card_number,
    car_type,
    car_plate_number,
    password,
    photo
  );

  return info.lastInsertRowid;
}
export function getDriverByNameOrCar(search) {
  const stmtByName = db.prepare(`
    SELECT * FROM Driver WHERE name LIKE ?
  `);
  const nameMatches = stmtByName.all(`%${search}%`);

  if (nameMatches.length > 0) {
    return nameMatches;
  }

  const stmtByCar = db.prepare(`
    SELECT * FROM Driver WHERE car_type LIKE ?
  `);
  const carMatches = stmtByCar.all(`%${search}%`);

  if (carMatches.length > 0) {
    return carMatches;
  }

  return null;
}
export function getAllDriver() {
  const stmt = db.prepare("SELECT * FROM Driver");
  const rows = stmt.all();

  if (rows.length > 0) {
    return rows; // Return all driver records
  } else {
    return null; // Return null if no drivers exist
  }
}
export function deleteDriver(id) {
  const flightIdsStmt = db.prepare(
    "SELECT flight_id FROM Flight WHERE driver_id = ?"
  );
  const flights = flightIdsStmt.all(id);

  const deleteGuestsStmt = db.prepare("DELETE FROM Guest WHERE flight_id = ?");
  const deleteFlightStmt = db.prepare("DELETE FROM Flight WHERE flight_id = ?");
  const deleteDriverStmt = db.prepare("DELETE FROM Driver WHERE driver_id = ?");

  // Start a transaction to ensure atomicity
  const deleteTransaction = db.transaction(() => {
    for (const flight of flights) {
      deleteGuestsStmt.run(flight.flight_id); // Step 1: Delete Guests
      deleteFlightStmt.run(flight.flight_id); // Step 2: Delete Flights
    }

    const info = deleteDriverStmt.run(id); // Step 3: Delete Driver
    return info.changes > 0;
  });

  return deleteTransaction();
}
export async function getSingleDriver(id) {
  const stmt = db.prepare("SELECT * FROM Driver WHERE driver_id = ?");
  const driver = stmt.get(id);

  return driver || null;
}
export function updateDriver(
  driver_id,
  name,
  nationality,
  mobile_number,
  residency_number,
  card_number,
  car_type,
  car_plate_number,
  password
) {
  const stmt = db.prepare(`
    UPDATE Driver
    SET name = ?,
        nationality = ?,
        mobile_number = ?,
        residency_number = ?,
        card_number = ?,
        car_type = ?,
        car_plate_number = ?,
        password = ?
    WHERE driver_id = ?
  `);

  const info = stmt.run(
    name,
    nationality,
    mobile_number,
    residency_number,
    card_number,
    car_type,
    car_plate_number,
    password,
    driver_id
  );

  return info.changes > 0;
}
export function updateImage(driver_id, photo) {
  const updateStmt = db.prepare(`
    UPDATE Driver
    SET photo = ?
    WHERE driver_id = ?
  `);

  const result = updateStmt.run(photo, driver_id);

  if (result.changes === 0) {
    return null; // No driver was updated
  }

  const selectStmt = db.prepare(`
    SELECT * FROM Driver WHERE driver_id = ?
  `);

  const updatedDriver = selectStmt.get(driver_id);
  return updatedDriver;
}
