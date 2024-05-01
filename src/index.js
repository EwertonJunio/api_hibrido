const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authenticateMiddleware = require('./middlewares/authenticate');
const app = express();

app.use(express.json());

app.use('/auth', userRoutes);

app.listen(3333, ()=>{
    console.log('Server is running');
});