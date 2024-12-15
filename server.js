const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: `./config.env` });
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
app.listen(port, () => {
  console.log(`App running on port ${port} by ${process.env.USER}`);
});
