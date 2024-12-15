const express = require('express');
const morgan = require('morgan');

const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//console.log(process.env);
//2.Middlewares
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));
//starting the server

//Getting all tours data
// app.get('/api/v1/tours'
// (req, res) => {
//     res.status(200).json({
//       status: 'success',
//       results: tours.length,
//       data: {
//         tours: tours,
//       },
//     });
//   };);

// app.post('/api/v1/tours', (req, res) => {
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);
//   //res.send(newTour);

//   tours.push(newTour);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       });
//     }
//   );
// });

// app.get('/api/v1/tours/:id', (req, res) => {
//   const id = req.params.id * 1;
//   console.log(id);
//   const tour = tours.find((el) => el.id === id);
//   if (!tour) {
//     res.status(404).json({
//       status: 'fail',
//       message: 'Invalid Id',
//     });
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });
// app.patch('/api/v1/tours/:id', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     data: {
//       data: '<UPDATED TOUR...',
//     },
//   });
// });

// app.delete('/api/v1/tours/:id', (req, res) => {
//   const id = req.params.id * 1;
//   const tour = tours.find((el) => el.id === id);
//   if (!tour) {
//     res.status(404).json({
//       status: 'fail',
//       message: 'Invalid Id',
//     });
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

//3.ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// app.get('/', (req, res) => {
//   res.status(200).send('Hey from the server');
// });

// app.post('/', (req, res) => {
//   res.status(200).send(`You wanna send something to server lil boi!!`);
// });

module.exports = app;
