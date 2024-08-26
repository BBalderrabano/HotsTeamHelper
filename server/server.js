const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');

//Create a server
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});