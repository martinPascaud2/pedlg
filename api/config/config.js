{
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "logging": false,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "logging": false,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "logging": false,
    "dialect": "mysql"
  }
}
