module.exports = {
  "type": "mysql",
  "host": process.env.CLEARDB_DATABASE_HOST || "localhost",
  "port": 3306,
  "username": process.env.CLEARDB_DATABASE_USERNAME || "root",
  "password": process.env.CLEARDB_DATABASE_PASSWORD || "",
  "database": process.env.CLEARDB_DATABASE_NAME || "cookbook_db",
  "synchronize": true
}
