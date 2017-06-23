const configureExpress = require('./config/express');
const app = configureExpress();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(3000);


console.log('Server running at http://localhost:3000/');
