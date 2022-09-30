module.exports = {
    HOST: "localhost",
    USER: "mubassyir",
    PASSWORD: "password",
    DB: "cdp_binar",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };