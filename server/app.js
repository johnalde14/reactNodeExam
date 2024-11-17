const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
// const helmet = require('helmet');
const PORT = process.env.PORT || '3000';
const employeeRoutes = require('./routes/employee');

// app.use(helmet());
app.use(cors());

// Serve static files from the uploads directory
app.use(express.static('uploads'));

app.use('/api/employee', employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
})