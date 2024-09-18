export const env = {
  PORT: process.env.PORT || "3000",
  DB_HOST: process.env.DB_HOST,

  //Database

  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PORT: process.env.DB_PORT || 3306,

  //Keys
  SECRETKEY: process.env.SECRETKEY,
};

console.log(env.DB_DATABASE);
