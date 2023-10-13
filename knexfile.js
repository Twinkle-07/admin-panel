
// module.exports = {

//   development: {
//     client: 'mysql',  //data which we are using
//     connection: {
//       host: '127.0.0.1',
//       user: 'root',
//       password: '',
//       database: 'tips-g'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       directory: './migrations'
//     }
//   },
  
// };

module.exports = {
  development: {
    client:'mysql',
    connection:{
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'tips-g'
          },
          pool: {
            min: 2,
            max: 10
          },
          migrations: {
            directory: './migrations'
          }
  }
}

