exports.localServerKeys = {
   
    host: process.env.local_host,
    port: process.env.local_sqlport,
    username:process.env.local_username,
    password: process.env.local_password,
    database:process.env.local_database,
    dialect: process.env.prod_dialect,
  }; 

  exports.productionServerKeys = {
   
    host: process.env.prod_host,
    port: process.env.prod_sqlport,
    username:process.env.prod_username,
    password: process.env.prod_password,
    database:process.env.prod_database,
    dialect:  process.env.prod_dialect
  }; 
 