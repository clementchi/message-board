const express = require('express')
const app = express()

app.use(express.static(__dirname + '/build'));
app.listen(8080, () => console.log('Example app listening on port 8080!'))