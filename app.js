const express = require('express')
const fs = require('fs');
const app = express()
const port = process.env.PORT || 7085;
const https = require('https');

app.use(express.static(__dirname + '/build'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
