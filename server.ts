import express = require('express')
let app = express(),
    bodyParser = require('body-parser');
let port: String | Number = process.env.PORT || 3000;
app.listen(port);
console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import routes = require('./app/routes/appRoutes');
routes(app);
export default app;