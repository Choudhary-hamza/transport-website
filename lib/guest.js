import sql from "better-sqlite3";
const db = sql("travel.db");

export async function createGuest(
  name,
  nationality,
  id_number,
  isHead,
  flight_id
) {
  const stmt = db.prepare(`
      INSERT INTO Guest (
        name,
        nationality,
        id_number,
        isHead,
        flight_id
      ) VALUES (?, ?, ?, ?, ?)
    `);

  const info = stmt.run(
    name,
    nationality,
    id_number,
    isHead ? 1 : 0,
    flight_id
  );

  return info.lastInsertRowid || null; // Return the new guest_id, or null if failed
}
export async function getGuestsByFlightId(flight_id) {
  const stmt = db.prepare(`
    SELECT * FROM Guest
    WHERE flight_id = ?
  `);

  const guests = stmt.all(flight_id);

  if (!guests || guests.length === 0) {
    return null;
  }

  // Find and move the head guest to the first position
  const headIndex = guests.findIndex((g) => g.isHead === 1);
  if (headIndex > 0) {
    const [headGuest] = guests.splice(headIndex, 1);
    guests.unshift(headGuest);
  }

  return guests;
}
export async function updateGuest(name, nationality, id_number, guestId) {
  const stmt = db.prepare(`
    UPDATE Guest
    SET name = ?, nationality = ?, id_number = ?
    WHERE guest_id = ?
  `);

  const result = stmt.run(name, nationality, id_number, guestId);

  return result.changes > 0; // true if update was successful
}
