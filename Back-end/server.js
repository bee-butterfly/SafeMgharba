const express = require('express');
const cors = require('cors');
const app = express();
const usersRouter = require('./routes/users');
const reportsRouter = require('./routes/reports');

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/reports', reportsRouter);

app.get('/', (req, res) => res.send('Safemgharba backend running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
