const express = require('express');
const app = express();
const port = 7000;

app.use(express.json());

require('./app/routes')(app, {});
app.listen(port, () => {
    
})