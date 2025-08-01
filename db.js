const sql = require("better-sqlite3");
const db = sql("travel.db");

db.pragma("foreign_keys = ON");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS Driver (
    driver_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    nationality TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    residency_number TEXT NOT NULL,
    card_number TEXT NOT NULL,
    car_type TEXT NOT NULL,
    car_plate_number TEXT NOT NULL,
    password TEXT NOT NULL,
    photo TEXT NOT NULL
  )
`
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS Flight (
    flight_id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact_number TEXT NOT NULL,
    coming_from TEXT NOT NULL,
    arrival_to TEXT NOT NULL,
    day TEXT NOT NULL,
    date TEXT NOT NULL,
    arrival_time TEXT NOT NULL,
    trip_duration INTEGER,
    flight_numbers INTEGER,
    price INTEGER,
    driver_id INTEGER NOT NULL,
    FOREIGN KEY (driver_id) REFERENCES Driver(driver_id)
  )
`
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS Admin (
    admin_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    password TEXT NOT NULL
    qr TEXT
  )
`
).run();

console.log("Admin table created!");


db.prepare(
  `
  CREATE TABLE IF NOT EXISTS Guest (
    guest_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    nationality TEXT NOT NULL,
    id_number TEXT NOT NULL,
    isHead BOOLEAN DEFAULT 0,
    flight_id INTEGER NOT NULL,
    FOREIGN KEY (flight_id) REFERENCES Flight(flight_id)
  )
`
).run();
