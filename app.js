require('dotenv').config();
const express = require('express');
const cors = require('cors');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION , SHUTTING DOWN!');
  process.exit(1);
});

const connectDB = require('./utils/connectDb');

const userRouter = require('./routes/userRoutes');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

// global middlewares
app.use(express.json());
app.use(cors({ origin: 'https://boiling-depths-77572.herokuapp.com/' }));

app.get('/', (req, res) => {
  res.send('HELLO WORLD');
});

// app routes
app.use('/api/user', userRouter);

// catch non existing routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// global error handler
app.use(globalErrorHandler);

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION , SHUTTING DOWN!');
  server.close(() => {
    process.exit(1);
  });
});
