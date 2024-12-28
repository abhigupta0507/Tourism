const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED EXCEPTION! SHUTTING DOWN APPLICATION');

  process.exit(1);
});
dotenv.config({ path: `./.env` });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((con) => {
  //console.log(con.connection);
  console.log('DB connection successfull!');
});

// const testTour = new Tour({
//   name: 'The a walker',
//   rating: 4.4,
//   price: 417,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR::', err);
//   });

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port} by ${process.env.USER}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! SHUTTING DOWN APPLICATION');
  server.close(() => {
    process.exit(1);
  });
});
