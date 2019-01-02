module.exports = {
  "type": "mysql",
  "host": process.env.AWS_RDS_DATABASE_URI || "localhost",
  "port": 3306,
  "username": process.env.AWS_RDS_DATABASE_USERNAME || "root",
  "password": process.env.AWS_RDS_DATABASE_PASSWORD || "",
  "database": process.env.AWS_RDS_DATABASE_NAME || "cookbook_db",
  "synchronize": true
}
