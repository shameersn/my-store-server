/* eslint-disable no-undef */
module.exports = {
  PORT: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || "mystore",
    username: process.env.DB_USER_NAME || "mystore",
    password: process.env.DB_PASSWORD || "mystore123",
    options: {
      dialect: process.env.DIALECT || "sqlite",
      host: process.env.HOST || "localhost",
      storage: "./mystore.sqlite"
    }
  },
  jwt_secret: process.env.JWT_SECRET || "jwt_secret"
};
