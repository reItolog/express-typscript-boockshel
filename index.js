const express = require('express');
const app = express();
const { userRouter, mediaRouter } = require('./routes');

const port = 3001;

app.use(express.json());

app.use('/users', userRouter);
app.use('/media', mediaRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
