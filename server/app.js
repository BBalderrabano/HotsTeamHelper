const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const getAllPlayers = require('./controllers/playersController');
const playersRouter = require('./routes/playersRoutes');

let app = express();

app.use(cors())
app.use(express.json());

//MIDDLEWARE
const logger = function(req, res, next){
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    app.use(logger);
}

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1', playersRouter);
//let players = JSON.parse(getAllPlayers);

module.exports = app;