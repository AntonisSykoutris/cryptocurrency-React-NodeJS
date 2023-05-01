const express = require('express');
const cors = require('cors');
const coinsRoutes = require('./routes/coinsRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/coins', coinsRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
