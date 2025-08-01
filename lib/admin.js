import sql from "better-sqlite3";
const db = sql("travel.db");
export function checkPassword(password) {
  // Query the admin table for the admin_id and password
  const stmt = db.prepare(
    "SELECT admin_id, password FROM admin WHERE name = ?"
  );
  const row = stmt.get("admin"); // Assuming the admin's name is 'admin'

  // Check if the password exists and matches the one in the database
  if (row && row.password === password) {
    return row.admin_id; // Return the admin_id if password is correct
  } else {
    return null; // Return null if the password is incorrect
  }
}
export async function checkPasswords(password) {
  const stmt = db.prepare("SELECT password FROM Admin WHERE name = 'admin'");
  const row = stmt.get();

  if (!row) {
    return false; // Admin not found
  }

  if (row.password === password) {
    return true; // Password matches
  } else {
    return false; // Password does not match
  }
}
export async function updatePassword(password) {
  const stmt = db.prepare(`
    UPDATE Admin
    SET password = ?
    WHERE name = 'admin'
  `);

  const result = stmt.run(password);

  return result.changes > 0; // returns true if password was updated
}
export async function getCompanyQr() {
  const stmt = db.prepare("SELECT qr FROM Admin WHERE name = 'admin'");
  const row = stmt.get();

  if (row && row.qr) {
    return row.qr; // Return the QR code if it exists
  } else {
    return null; // Return null if no QR code is found
  }
}
export async function updateQR(qr) {
  const stmt = db.prepare(`
    UPDATE Admin
    SET qr = ?
    WHERE name = 'admin'
  `);

  const result = stmt.run(qr);

  return result.changes > 0; // returns true if QR was updated
}
