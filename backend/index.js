const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000');
});