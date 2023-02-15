const express = require('express');
// const fs = require('fs');
const app = express();
const cors = require('cors');
const port = 4000;
// const jsonParser = express.json();
// const fileName = 'Tasks.json';

const tasks = require('./routes/tasks');
app.use(cors())

app.use('/api/tasks/', tasks);

app.listen(port);
console.log(`server listening on port ${port}`);    