const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8000;

const adminRoutes = require('./routes/adminServer');
const frontEndRoutes = require('./routes/feServer');

app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', frontEndRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
